import AsyncStorage from '@react-native-async-storage/async-storage';
import create, {StateCreator, GetState, SetState, StoreApi} from 'zustand';

export enum Strategy {
  google,
  facebook,
  local,
}

export enum Role {
  reader = 'reader',
  writer = 'publisher',
  both = 'both',
}

export type Info = {
  _id: string;
  role: Role[];
  token: string;
  email: string;
  about: string;
  gender: string;
  username: string;
  fullname: string;
  followers: number;
  following: number;
  categories: string[];
  emailVerified: boolean;
};

type Value = {
  readonly auth: boolean;
  readonly data?: Info | null;
  readonly strategy?: Strategy;
};

type Actions = {
  set: (value: Partial<Value>) => void;
};

type Auth = Value & Actions;

export const AUTH = 'verne/auth';

const persist =
  <T extends Auth>(config: StateCreator<T>) =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => {
    return config(
      args => {
        set(args);

        const state = get();

        if (state.auth) {
          AsyncStorage.setItem(AUTH, JSON.stringify(state));
        }
      },
      get,
      api,
    );
  };

const store = create<Value & Actions>(
  persist(set => ({
    auth: false,
    set: value => set(value as Value),
  })),
);

export const selector = ({auth}: Value) => auth;

export const set: Actions['set'] = auth => {
  store.getState().set(auth);
};

export const save = () => {
  const state = store.getState();
  return AsyncStorage.setItem(AUTH, JSON.stringify(state));
};

export const hydrate = async () => {
  const json = await AsyncStorage.getItem(AUTH);
  if (json) set(JSON.parse(json));
};

export const login = (data: Info) => {
  set({auth: true, data});
};

export const setData = (data: Info) => {
  const state = store.getState().data ?? {};
  set({data: {...state, ...data}});
};

export const logout = () => {
  set({auth: false, data: null});
};

export default store;
