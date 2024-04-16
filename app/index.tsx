import { StatusBar } from 'expo-status-bar';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import List from './models/List';
import { observer } from '@legendapp/state/react';
import { store$ } from './_layout';
import { router } from 'expo-router';

type renderItemProps = {
  item: List;
};

const HomeScreen = observer(() => {
  const lists = store$.lists.get();

  function createList() {
    const newList = new List({ title: 'Test shopping list', listItems: [] });
    store$.lists.set((currentLists) => [...currentLists, newList]);
  }

  function deleteAllLists() {
    store$.lists.set([]);
  }

  function renderItem({ item }: renderItemProps) {
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/add-list-items',
            params: { listId: item.id }
          })
        }
      >
        <Text>{item.title}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={createList} title="Create List" />
      <Button onPress={deleteAllLists} title="Delete all Lists" />
      <Text>Lists:</Text>
      <FlatList data={lists} renderItem={renderItem} />
      <StatusBar style="auto" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

export default HomeScreen;
