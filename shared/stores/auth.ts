import AsyncStorage from '@react-native-async-storage/async-storage';
import create, {StateCreator, GetState, SetState, StoreApi} from 'zustand';

type Value = {readonly auth: boolean};

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

        const {auth, ...rest} = get();

        console.log(rest);

        if (auth) {
          // TODO: save auth state
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

export const login = () => {
  set({auth: true});
};

export const logout = () => {
  set({auth: false});
};

export default store;
