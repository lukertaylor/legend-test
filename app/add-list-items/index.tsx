import { observer } from '@legendapp/state/react';
import { useLocalSearchParams } from 'expo-router';
import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable
} from 'react-native';
import { store$ } from '../_layout';
import { StatusBar } from 'expo-status-bar';
import ListItem from '../models/ListItem';
import Item from '../models/Item';

type ParamsType = {
  listId: string;
};

type renderItemProps = {
  item: ListItem;
};

const AddListItemsScreen = observer(() => {
  const { listId } = useLocalSearchParams<ParamsType>();
  const listItems = store$.lists
    .find((list) => list.get().id === listId)!
    .listItems.get();

  function addListItems() {
    const item1 = new Item({ title: 'Greek yogurt' });
    const newListItem1 = new ListItem({ item: item1, quantity: 2 });
    const item2 = new Item({ title: 'Baked beans' });
    const newListItem2 = new ListItem({ item: item2 });
    store$.lists
      .find((list) => list.get().id === listId)!
      .listItems.set((prevListItems) => [
        ...prevListItems,
        newListItem1,
        newListItem2
      ]);
  }

  function deleteListItem(listItemId: string) {
    const updatedListItems = listItems.filter(
      (listItem) => listItem.id != listItemId
    );
    store$.lists
      .find((list) => list.get().id === listId)!
      .listItems.set(updatedListItems);
  }

  function renderItem({ item }: renderItemProps) {
    return (
      <Pressable onPress={() => deleteListItem(item.id)}>
        <Text>{item.item.title}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={addListItems} title="Add ListItems" />
      <Text>Lists:</Text>
      <FlatList data={listItems} renderItem={renderItem} />
      <StatusBar style="auto" />
    </View>
  );
});

export default AddListItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
