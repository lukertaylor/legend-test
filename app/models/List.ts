import ListItem from './ListItem';
import uuid from 'react-native-uuid';

type ListProps = {
  title: string;
  listItems: ListItem[];
};

class List {
  id: string;
  title: string;
  listItems: ListItem[];

  constructor({ title, listItems }: ListProps) {
    this.id = uuid.v4() as string;
    this.listItems = listItems;
    this.title = title;
  }
}

export default List;
