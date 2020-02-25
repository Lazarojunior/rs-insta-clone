// import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar, NativeModules } from 'react-native';

import Routes from './src/routes'

export default function App() {

  // if (__DEV__) {
  //   NativeModules.DevSettings.setIsDebuggingRemotely(true)
  // }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Routes/>
    </>
  );
}

//<>
//  <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
//</>

// registerRootComponent(App);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
