import React from 'react';
import '../scss/Object.scss';
import ElementSkeleton from './ElementSkeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addElem, removeElem } from '../redux/likesSlice';
import { addElemCart } from '../redux/cartSlice';
import { ItemFromAPI } from '@types';
import { RootState } from 'redux/store';

export default function Object() {
  const likes = useSelector((state: RootState) => state.likesSlice.items);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState(0);
  const [item, setItem] = React.useState<ItemFromAPI>();
  const [loaded, setLoaded] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoaded(false);
    axios
      .get(
        'https://64c3e3f967cfdca3b6606bff.mockapi.io/items' +
          location.pathname.replace('/likes', ''),
      )
      .then((res) => {
        setLoaded(true);
        setItem(res.data);
      })
      .catch((err) => navigate('/'));
  }, [location, navigate]);

  return (
    <>
      {loaded && item ? (
        <div className="object">
          <div className="object__info">
            <div className="object__title">
              <span>{item.brand}</span> {item.title}
            </div>
            <div className="object__content">{item.description}</div>
            <div className="object__block">
              <div className="object__text">Select size</div>
              <div className="object__sizes">
                {item.sizes.map((el, i) => {
                  return (
                    <div
                      key={i}
                      className={selectedSize === i ? 'object__size--active' : 'object__size'}
                      onClick={() => setSelectedSize(i)}
                    >
                      {el}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="object__block">
              <div className="object__text">Price</div>
              <div className="object__text">{item.price} $</div>
            </div>
            <div className="object__btns">
              <button
                className="object__btn"
                onClick={() =>
                  dispatch(
                    addElemCart({
                      id: Number(item.id),
                      image: item.images[0],
                      title: item.brand + ' ' + item.title,
                      price: item.price,
                      size: item.sizes[selectedSize],
                    }),
                  )
                }
              >
                add to cart
              </button>
              <button
                className={likes.includes(Number(item.id)) ? 'object__btn--active' : 'object__btn'}
                onClick={
                  likes.includes(Number(item.id))
                    ? () => dispatch(removeElem(Number(item.id)))
                    : () => dispatch(addElem(Number(item.id)))
                }
              >
                {likes.includes(Number(item.id)) ? 'remove from' : 'add to'} likes
              </button>
            </div>
          </div>
          {item.images.map((el, i) => {
            return (
              <figure key={i} className="object__figure">
                <img className="object__img" src={el} alt="sneakers" />
              </figure>
            );
          })}
        </div>
      ) : (
        <>
          <ElementSkeleton />
          <ElementSkeleton />
          <ElementSkeleton />
          <ElementSkeleton />
          <ElementSkeleton />
        </>
      )}
    </>
  );
}
