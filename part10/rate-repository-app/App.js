import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  return (
    <>
      <NativeBaseProvider>
        <NativeRouter>
          <Main />
        </NativeRouter>
        <StatusBar style="auto" />
      </NativeBaseProvider>

    </>
  )
};

export default App;