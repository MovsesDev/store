export type Item = {
  id: string;
  name: string;
  price: number;
  imgUrl: {
    url: string;
  };
};

export type ItemList = {
  [x: string]: any;
  stores: Item[];
};

export type Author = {
  createAuthor: {
    id: string;
    email: string;
  }
};

export type Author2 = {
  authores: {
    items: String[] | null
  }[]
}
