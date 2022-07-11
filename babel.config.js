module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.{js|ts|tsx}',
          '.android.{js|ts|tsx}',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@shared': ['./shared/'],
          '@assets': ['./assets/'],
          '@screens': ['./screens/'],
          '@theme': ['./theme/'],
        },
      },
    ],
  ],
};
