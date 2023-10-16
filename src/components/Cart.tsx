import React from 'react';
import '../scss/Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeElemCart, editFullName, editPhone } from '../redux/cartSlice';
import { addElem, removeElem } from '../redux/likesSlice';
import { RootState } from 'redux/store';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const cartSlice = useSelector((state: RootState) => state.cartSlice);
  const likes = useSelector((state: RootState) => state.likesSlice.items);
  const navigate = useNavigate();
  const [selectedTip, setSelectedTip] = React.useState(2);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(0);
  const [selectedDelivery, setSelectedDelivery] = React.useState(0);
  const [deliveryClicked, setDeliveryClicked] = React.useState(false);
  const tips = ['1%', '2%', 2, 3, 5, 10];
  const paymentMethods = [
    'Card',
    'Affirm',
    'Klarna',
    'Apple Pay',
    'Google Pay',
    'PayPal',
    'UnionPay',
  ];
  const delivery = [
    '820 Morris Road Elmont, NY 11003',
    '392 Williams Court Brooklyn, NY 11238',
    '7 Iroquois Road New York, NY 10025',
    '91 Fairground Dr. Yonkers, NY 10701',
    '6 Fifth Dr. New York, NY 10029',
    '669 Grant Street Brooklyn, NY 11213',
  ];

  function onClickEdit(id: number, index: number) {
    dispatch(removeElemCart(index));
    navigate('/' + id);
  }

  function getTipString() {
    if (selectedTip === 0) {
      return '(1 % of subtotal) ' + Math.ceil(cartSlice.subtotal * 0.01);
    } else if (selectedTip === 1) {
      return '(2 % of subtotal) ' + Math.ceil(cartSlice.subtotal * 0.02);
    } else {
      return tips[selectedTip];
    }
  }

  function getTip() {
    if (selectedTip === 0) {
      return Math.ceil(cartSlice.subtotal * 0.01);
    } else if (selectedTip === 1) {
      return Math.ceil(cartSlice.subtotal * 0.02);
    } else {
      return tips[selectedTip];
    }
  }

  if (cartSlice.cart.length === 0) {
    return <div className="cart__empty">Cart is empty</div>;
  }

  return (
    <div className="cart">
      <div className="cart__left">
        {cartSlice.cart.map((el, i) => {
          return (
            <div key={i} className="cart__item">
              <div className="cart__item-left">
                <figure className="cart__figure">
                  <img src={el.image} alt="sneakers" className="cart__img" />
                </figure>
                <div className="cart__content">
                  <div className="cart__title">{el.title}</div>
                  <div className="cart__price">{el.price} $</div>
                  <div className="cart__size">size - {el.size}</div>
                </div>
              </div>
              <div className="cart__item-right">
                <button className="cart__btn" onClick={() => onClickEdit(el.id, i)}>
                  edit size
                </button>
                <button
                  className="cart__btn"
                  onClick={
                    likes.includes(el.id)
                      ? () => dispatch(removeElem(el.id))
                      : () => dispatch(addElem(el.id))
                  }
                >
                  {likes.includes(el.id) ? 'remove from' : 'add to'} likes
                </button>
                <button
                  className="cart__btn cart__btn-remove"
                  onClick={() => dispatch(removeElemCart(i))}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
        {deliveryClicked ? (
          <div className="cart__block" onClick={() => setDeliveryClicked(!deliveryClicked)}>
            <div className="cart__block-text">Delivery</div>
            {delivery.map((el, i) => (
              <button key={i} className="cart__block-btn" onClick={() => setSelectedDelivery(i)}>
                {el}
              </button>
            ))}
            <div className="cart__white cart__block-text ">Click to choose</div>
          </div>
        ) : (
          <div className="cart__block" onClick={() => setDeliveryClicked(!deliveryClicked)}>
            <div className="cart__block-text">Delivery</div>
            <div className="cart__block-text">{delivery[selectedDelivery]}</div>
            <div className="cart__white cart__block-text ">Click to edit</div>
          </div>
        )}

        <div
          className="cart__block"
          onClick={() =>
            selectedPaymentMethod === paymentMethods.length - 1
              ? setSelectedPaymentMethod(0)
              : setSelectedPaymentMethod(selectedPaymentMethod + 1)
          }
        >
          <div className="cart__block-text">Payment</div>
          <div className="cart__block-text">{paymentMethods[selectedPaymentMethod]}</div>
          <div className="cart__white cart__block-text">Click to choose</div>
        </div>
        <div className="cart__block" style={{ cursor: 'default' }}>
          <div className="cart__block-text">Information</div>
          <input
            className="cart__block-input"
            placeholder="Name Surname"
            value={cartSlice.fullname}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(editFullName(event.target.value))
            }
          />
          <input
            className="cart__block-input"
            placeholder="Phone"
            value={cartSlice.phone}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(editPhone(event.target.value))
            }
          />
          <div className="cart__white cart__block-text ">Click to inputs</div>
        </div>
      </div>
      <div className="cart__right">
        <div className="cart__right-top">
          {cartSlice.cart.map((el, i) => {
            return (
              <div key={i} className="cart__element">
                <div className="cart__element-left">
                  {el.title} - {el.size}
                </div>
                <div className="cart__element-left">{el.price} $</div>
              </div>
            );
          })}
          <div
            className="cart__element"
            style={{ display: cartSlice.cart.length ? 'flex' : 'none' }}
          >
            <div className="cart__element-left">Subtotal</div>
            <div className="cart__element-left">{cartSlice.subtotal} $</div>
          </div>
        </div>
        <div className="cart__right-bottom">
          <div className="cart__right-element">
            <div className="cart__element-left">Tax 5%</div>
            <div className="cart__element-left">{Math.ceil(cartSlice.subtotal * 0.05)} $</div>
          </div>
          <div
            className="cart__right-element cart__element-btn"
            onClick={() => setSelectedTip(selectedTip === tips.length - 1 ? 0 : selectedTip + 1)}
          >
            <div className="cart__element-left">Tip</div>
            <div className="cart__gray cart__element-left">Click to edit</div>
            <div className="cart__element-left">{getTipString()} $</div>
          </div>
          <div className="cart__right-element cart__element-btn">
            <div className="cart__element-left">Total</div>
            <div className="cart__element-left">Click to pay</div>
            <div className="cart__element-left">
              {Math.ceil(cartSlice.subtotal * 1.05) + Number(getTip())} $
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
