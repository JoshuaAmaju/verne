import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import {ONBOARDING} from '../constants';

type Value = {onboarded: boolean};

type Actions = {
  set: (value: Value) => void;
};

const store = create<Value & Actions>(set => ({
  onboarded: false,
  set: value => set(value),
}));

export const selector = ({onboarded}: Value) => onboarded;

export const set = (onboarded: Value['onboarded']) => {
  store.getState().set({onboarded});
};

AsyncStorage.getItem(ONBOARDING).then(json => {
  if (json) set(JSON.parse(json));
});

export default store;
