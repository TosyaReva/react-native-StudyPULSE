import { LogBox } from 'react-native';

const ignoredWarnings = [
  'InteractionManager has been deprecated',
  '`createAnimatedPropAdapter` is no longer necessary in Reanimated 4',
];

LogBox.ignoreLogs(ignoredWarnings);

if (global.__DEV__) {
  const originalWarn = console.warn;

  console.warn = (...args) => {
    const message = args.map(String).join(' ');

    if (ignoredWarnings.some(warning => message.includes(warning))) {
      return;
    }

    originalWarn(...args);
  };
}
