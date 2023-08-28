import React, { useEffect } from 'react';
import Item from './Item';
import ItemSkeleton from './ItemSkeleton';
import axios from 'axios';
import { ItemFromAPI } from '@types';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState<ItemFromAPI[]>([]);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        'https://64c3e3f967cfdca3b6606bff.mockapi.io/items?search=' +
          location.pathname.replace('/search/', ''),
      )
      .then((res) => {
        setItems(res.data);
        setIsLoaded(true);
      });
  }, [location]);
  return (
    <div className="catalog">
      {isLoaded
        ? items.map((el, i) => {
            return <Item key={i} {...el} />;
          })
        : [...new Array(3)].map((el, i) => <ItemSkeleton key={i} />)}
    </div>
  );
}
