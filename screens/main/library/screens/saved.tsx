import Button from '@shared/components/Button';
import {http} from '@shared/http';
import {Paginated} from '@shared/types/server_response';
import {Story} from '@shared/types/story';
import {CheckBox, Spinner, Text} from '@ui-kitten/components';
import {Box, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {COVER} from '../../../dummy.data';

const data = new Array(10).fill(0).map((_, i) => i.toString());

export default function Saved() {
  const [mode, setMode] = useState<'editing' | null>();

  const [selected, setSelected] = useState(new Set<string>());

  const query = useQuery(['saved_stories'], async () => {
    const res = await http.get<Paginated<{stories: Story[]}>>('/story/saved');
    return res.data;
  });

  const removeStories = useMutation<any, any, string[]>(
    async ids => {
      const res = await http.put('/story/unsave', {storyId: ids});
      return res.data;
    },
    {
      onSuccess() {
        setSelected(new Set());
      },
    },
  );

  console.log(query.data);

  return (
    <VStack flex={1} space={4} justifyContent="space-between">
      <FlatList
        data={data}
        contentContainerStyle={{padding: 24}}
        ListHeaderComponent={() => {
          return (
            <HStack
              space={4}
              alignItems="center"
              justifyContent="space-between">
              {mode === 'editing' ? (
                <CheckBox
                  checked={selected.size >= data.length}
                  onChange={checked => {
                    setSelected(new Set(checked ? data : []));
                  }}>
                  Select all
                </CheckBox>
              ) : (
                <Text category="h2">Last read</Text>
              )}

              <Button
                status="basic"
                appearance="ghost"
                onPress={() => {
                  setSelected(new Set([]));
                  setMode(mode === 'editing' ? null : 'editing');
                }}>
                {mode === 'editing' ? 'Cancel' : 'Manage list'}
              </Button>
            </HStack>
          );
        }}
        renderItem={({index}) => {
          const id = index.toString();

          return (
            <HStack key={id} py={4} space={4}>
              {mode === 'editing' && (
                <CheckBox
                  checked={selected.has(id)}
                  onChange={checked => {
                    if (checked) {
                      selected.add(id);
                    } else {
                      selected.delete(id);
                    }

                    setSelected(selected);
                  }}
                />
              )}

              <Image source={COVER} style={styles.cover} />

              <VStack space={4} flex={1}>
                <VStack space={1}>
                  <Text category="p1">A plan too late</Text>
                  <Text category="c2">Reynolds Andrews</Text>
                </VStack>

                <Text numberOfLines={2} style={{color: '#6B6B6B'}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Feugiat et duis diam lectus posuere aliquam...
                </Text>

                {/* <Progress size="xs" bg="#EFFBF9" value={30} /> */}
              </VStack>
            </HStack>
          );
        }}
      />

      {mode === 'editing' && (
        <Box p={4}>
          <Button
            appearance="outline"
            {...(removeStories.isLoading && {
              accessoryLeft: () => <Spinner size="small" />,
            })}
            onPress={() => {
              removeStories.mutate([...selected]);
            }}>
            Remove
          </Button>
        </Box>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: 80,
    height: '100%',
    minHeight: 100,
    borderRadius: 8,
  },
});
