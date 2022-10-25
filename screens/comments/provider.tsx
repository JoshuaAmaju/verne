import React, {ReactNode, useCallback, useContext} from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {Comment} from './types';

export type FireStoreType =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

export type Add = Pick<Comment, 'content' | 'replyingTo'>;

export type Update = Pick<Comment, 'id' | 'likes'>;

type AddFn = (arg: Add) => void;

type UpdateFn = (arg: Update) => void;

const noop = () => {};

export const Ctx = React.createContext<{
  addComment: AddFn;
  comments: Comment[];
  updateComment: UpdateFn;
}>({
  comments: [],
  addComment: noop,
  updateComment: noop,
});

export function Provider({
  comments,
  children,
  onAddComment,
  onUpdateComment,
}: {
  children: ReactNode;
  comments: Comment[];
  onAddComment(add: Add): void;
  onUpdateComment(update: Update): void;
}) {
  const addComment = useCallback<AddFn>(
    comment => onAddComment(comment),
    [onAddComment],
  );

  const updateComment = useCallback<UpdateFn>(
    comment => onUpdateComment(comment),
    [onUpdateComment],
  );

  return (
    <Ctx.Provider value={{comments, addComment, updateComment}}>
      {children}
    </Ctx.Provider>
  );
}

export function useProvider() {
  return useContext(Ctx);
}
