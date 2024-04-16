import { Stack } from 'expo-router';
import { observable } from '@legendapp/state';
import {
  configureObservablePersistence,
  persistObservable
} from '@legendapp/state/persist';
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import List from './models/List';
import AsyncStorage from '@react-native-async-storage/async-storage';

configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage
    }
  }
});

const initialLists: List[] = [];

export const store$ = observable({
  lists: initialLists,
  settings: { dragListsDialogShown: false }
});

// Persist this observable
persistObservable(store$, {
  local: 'shoppingLists'
});

function HomeLayout() {
  return (
    <Stack
      screenOptions={
        {
          // header: (props) => <CustomNavigationBar {...props} />,
          // headerBackTitleVisible: false
        }
      }
    />
  );
}

export default HomeLayout;
