import uuid from 'react-native-uuid';

type ItemProps = {
  title: string;
};

class Item {
  id: string;
  title: string;

  constructor({ title }: ItemProps) {
    this.id = uuid.v4() as string;
    this.title = title;
  }
}

export default Item;
