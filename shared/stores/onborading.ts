import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';

type Value = {onboarded: boolean};

type Actions = {
  set: (value: Value) => void;
};

export const ONBOARDING = 'verne/onboarding';

const store = create<Value & Actions>(set => ({
  onboarded: false,
  set: value => set(value),
}));

export const selector = ({onboarded}: Value) => onboarded;

export const set = (onboarded: Value['onboarded']) => {
  store.getState().set({onboarded});
};

export const save = () => {
  const state = store.getState().onboarded;
  return AsyncStorage.setItem(ONBOARDING, JSON.stringify(state));
};

export const hydrate = async () => {
  const json = await AsyncStorage.getItem(ONBOARDING);
  if (json) set(JSON.parse(json));
};

export default store;
