import uuid from 'react-native-uuid';
import Item from './Item';

type ListItemProps = {
  item: Item;
  quantity?: number;
  marked?: boolean;
};

class ListItem {
  id: string;
  item: Item;
  quantity: number;
  marked: boolean;

  constructor({ item, quantity = 1, marked = false }: ListItemProps) {
    this.id = uuid.v4() as string;
    this.item = item;
    this.quantity = quantity;
    this.marked = marked;
  }
}

export default ListItem;
