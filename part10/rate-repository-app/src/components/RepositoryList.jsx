import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;



const RepositoryList = () => {
  // const { repositories } = useRepositories();

  let repositoryNodes = []
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });

  repositoryNodes = data
  ? data.repositories.edges.map(edge => edge.node)
  : [];


  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <RepositoryItem item={item} index={index} />
      )}
    />
  )







};

export default RepositoryList