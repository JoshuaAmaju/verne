import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export enum StoreType {
  story = 'story',
  community = 'community',
}

export type Comment = {
  id: string;
  by: string;
  likes: number;
  content: string;
  createdAt: string;
  replyingTo?: string;
};

export type CommentsStoreType =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
