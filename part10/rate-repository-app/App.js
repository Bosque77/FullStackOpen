import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { NativeBaseProvider } from 'native-base';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';


const apolloClient = createApolloClient();

const App = () => {
  return (
    <>
    <ApolloProvider client={apolloClient}>
      <NativeBaseProvider>
        <NativeRouter>
          <Main />
        </NativeRouter>
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </ApolloProvider>

    </>
  )
};

export default App;