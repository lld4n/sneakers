import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function FooterTop() {
  const location = useLocation();
  const state = useSelector((state: RootState) => state);
  const cart = useSelector((state: RootState) => state.cartSlice.cart);
  const likes = useSelector((state: RootState) => state.likesSlice.items);
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(state.cartSlice));
    }
    if (!localStorage.getItem('likes')) {
      localStorage.setItem('likes', JSON.stringify(state.likesSlice));
    }
  }, [state]);

  return (
    <div className="footer__top">
      <form
        className="footer__top-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/search/' + searchValue);
        }}
      >
        <input
          placeholder="Nike Air Max Pulse..."
          className="footer__top-input"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button className="footer__top-submit" type="submit">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
      <div className="footer__top-right">
        <Link to={location.pathname === '/cart' ? '' : 'cart'}>
          <button
            className={
              location.pathname === '/cart' ? 'footer__top-btn--active' : 'footer__top-btn'
            }
          >
            cart
          </button>
          <div style={{ display: cart.length ? 'flex' : 'none' }} className="footer__top-count">
            {cart.length}
          </div>
        </Link>
        <Link to={location.pathname === '/likes' ? '' : 'likes'}>
          <button
            className={
              location.pathname === '/likes' ? 'footer__top-btn--active' : 'footer__top-btn'
            }
          >
            likes
          </button>
          <div style={{ display: likes.length ? 'flex' : 'none' }} className="footer__top-count">
            {likes.length}
          </div>
        </Link>
      </div>
    </div>
  );
}
