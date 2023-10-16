import React, { useEffect } from 'react';
import Item from './Item';
import ItemSkeleton from './ItemSkeleton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ItemFromAPI } from '@types';
import { RootState } from 'redux/store';

export default function Likes() {
  const likes = useSelector((state: RootState) => state.likesSlice.items);
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
            if (likes.includes(Number(el.id))) {
              return <Item key={i} {...el} />;
            }
            return '';
          })
        : [...new Array(6)].map((el, i) => <ItemSkeleton key={i} />)}
    </div>
  );
}
