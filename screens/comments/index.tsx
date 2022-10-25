import {useNavigation} from '@react-navigation/native';
import {useParams} from '@shared/hooks/use_params';
import {Input, Layout} from '@ui-kitten/components';
import {Box, Select} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import Xmark from '../../assets/icons/xmark.svg';

import {Comment as IComment, CommentsStoreType} from './types';

import authStore from '@shared/stores/auth';

import firestore from '@react-native-firebase/firestore';

import {useQuery, useQueryClient} from 'react-query';
import {Reply} from './Reply';
import {StoreType} from './types';

import {Add, Provider as CommentsProvider} from './provider';

// type FireStoreType =
//   FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

// // const Ctx = React.createContext<{
// //   store?: FireStoreType;
// //   comments?: IComment[];
// // }>({});

// const Ctx = React.createContext<IComment[]>([]);

// type AddComment = Pick<IComment, 'content' | 'replyingTo'>;

// const CommentsProvider = ({
//   // id,
//   // type,
//   comments,
//   children,
// }: {
//   // id: string;
//   // type: StoreType;
//   comments: IComment[];
//   children: React.ReactNode;
//   onAddComment(_: AddComment): void;
//   onUpdateComment(_: Pick<IComment, 'id' | 'likes'>): void;
// }) => {
//   // const collectionStoreRef = useRef<FireStoreType>();

//   // if (!collectionStoreRef.current) {
//   //   collectionStoreRef.current = firestore()
//   //     .collection('comments')
//   //     .doc(type)
//   //     .collection(id);
//   // }

//   // const comments = useQuery(['comments', type, id], async () => {
//   //   const res = await collectionStoreRef.current?.get();
//   //   return res?.docs.map(doc => ({...doc.data(), id: doc.id} as IComment));
//   // });

//   return <Ctx.Provider value={comments}>{children}</Ctx.Provider>;
// };

export default function Comments() {
  const nav = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState('0');

  const {id, type} = useParams<{id: string; type: StoreType}>()!;

  const userId = authStore(e => e.data?._id);

  const collectionStoreRef = useRef<CommentsStoreType>();

  if (!collectionStoreRef.current) {
    collectionStoreRef.current = firestore()
      .collection('comments')
      .doc(type)
      .collection(id);
  }

  const queryClient = useQueryClient();

  const comments = useQuery(['comments', type, id], async () => {
    const res = await collectionStoreRef.current?.get();
    return res?.docs.map(doc => ({...doc.data(), id: doc.id} as IComment));
  });

  // console.log(comments.data);

  const addComment = useCallback<(arg: Add) => void>(
    comment => {
      collectionStoreRef.current?.add({
        ...comment,
        likes: 0,
        by: userId,
        createdAt: new Date().toJSON(),
      });
    },
    [userId],
  );

  useEffect(() => {
    const store = collectionStoreRef.current;

    const unsubscribe = store?.onSnapshot(snapshot => {
      const key = ['comments', type, id];

      // console.log(snapshot.docs);

      if (snapshot.size > 0) {
        queryClient.cancelQueries(key).then(() => {
          queryClient.setQueryData<IComment[]>(
            key,
            snapshot.docs.map(doc => ({...doc.data(), id: doc.id} as IComment)),
          );
        });
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [id, type, collectionStoreRef, queryClient]);

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <IconButton
          size={15}
          onPress={() => nav.goBack()}
          icon={({size, color}) => (
            <Xmark width={size} height={size} color={color} />
          )}
        />
      ),
    });
  }, [nav]);

  if (comments.data) {
    return (
      <Layout style={styles.expand}>
        <CommentsProvider
          comments={comments.data}
          onAddComment={comment => addComment(comment)}
          onUpdateComment={({id: cId, ...comment}) => {
            collectionStoreRef.current?.doc(cId).update(comment);
          }}>
          <FlatList
            data={comments.data}
            ItemSeparatorComponent={() => <Box h={5} />}
            ListHeaderComponentStyle={{marginBottom: 30}}
            renderItem={({item}) => <Reply reply={item} />}
            contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 40}}
            ListHeaderComponent={
              <View style={{maxWidth: '40%'}}>
                <Select
                  selectedValue={selectedIndex}
                  onValueChange={index => setSelectedIndex(index)}>
                  <Select.Item value="0" label="All comments" />
                  <Select.Item value="1" label="Top rated" />
                  <Select.Item value="2" label="Most viewed" />
                </Select>
              </View>
            }
          />
        </CommentsProvider>

        <Box px={4} pt={2} pb={16}>
          <Input
            style={styles.messageBox}
            placeholder="Write a comment"
            textStyle={{paddingVertical: 5}}
            onSubmitEditing={e => {
              addComment({content: e.nativeEvent.text});
            }}
          />
        </Box>
      </Layout>
    );
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator />
    </Box>
  );
}

const styles = StyleSheet.create({
  expand: {
    flex: 1,
  },
  messageBox: {
    borderRadius: 100,
    backgroundColor: '#EBEBEB',
  },
});
