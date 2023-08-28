import React, { useEffect } from 'react';
import Item from './Item';
import ItemSkeleton from './ItemSkeleton';
import axios from 'axios';
import { ItemFromAPI } from '@types';

export default function Catalog() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState<ItemFromAPI[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('https://64c3e3f967cfdca3b6606bff.mockapi.io/items').then((res) => {
      setItems(res.data);
      setIsLoaded(true);
    });
  }, []);
  return (
    <div className="catalog">
      {isLoaded
        ? items.map((el, i) => {
            return <Item key={i} {...el} />;
          })
        : [...new Array(6)].map((el, i) => <ItemSkeleton key={i} />)}
    </div>
  );
}
