import {useEffect} from 'react';
import {BackHandler as RNBackHandler} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';

export default function BackHandler({children}: {children?: JSX.Element}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const subscription = RNBackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigate('..');
        return location.pathname === '/' ? false : true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [location.pathname, navigate]);

  return children ?? null;
}
