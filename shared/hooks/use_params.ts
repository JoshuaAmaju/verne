import {useRoute} from '@react-navigation/native';

type Params = Record<string, unknown>;

export function useParams<T extends Params>(): T | undefined {
  const {params} = useRoute();
  return params as T | undefined;
}

export function useParam<T extends Params>(
  key: keyof T,
): T[typeof key] | undefined {
  return useParams<T>()?.[key];
}
