import React from 'react';
import '../scss/Catalog.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addElem, removeElem } from '../redux/likesSlice';
import { Link } from 'react-router-dom';
import { ItemFromAPI } from '@types';
import { RootState } from 'redux/store';

export default function Item(props: ItemFromAPI) {
  const likes = useSelector((state: RootState) => state.likesSlice.items);
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    likes.includes(Number(props.id)) ? setLiked(true) : setLiked(false);
  }, [likes, props.id]);

  function onClickLike(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (liked) {
      setLiked(false);
      dispatch(removeElem(Number(props.id)));
    } else {
      setLiked(true);
      dispatch(addElem(Number(props.id)));
    }
  }
  const dispatch = useDispatch();
  return (
    <Link to={'/' + props.id}>
      <div className="item">
        <button className={liked ? 'item__like--active' : 'item__like'} onClick={onClickLike}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <figure className="item__figure">
          <img src={props.images[0]} alt="sneakers" className="item__img" />
        </figure>
        <div className="item__title">
          <span>{props.brand}</span> {props.title}
        </div>
        <div className="item__price">{props.price} $</div>
      </div>
    </Link>
  );
}
