import {useEffect} from 'react';
import {BackHandler as RNBackHandler} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';

export default function BackHandler({
  children,
  onBackPress,
}: {
  children?: JSX.Element;
  onBackPress?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const subscription = RNBackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBackPress?.() ?? navigate('..');
        return location.pathname === '/' ? false : true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [location.pathname, navigate, onBackPress]);

  return children ?? null;
}
