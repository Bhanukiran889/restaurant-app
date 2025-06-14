import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onClickRemoveAll = () => {
    removeAllCartItems()
  }

  const renderEmptyCart = () => (
    <div className="empty-cart">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-img"
      />
      <h1>Your Cart is Empty</h1>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-items-container" data-testid="cart">
      <div className="cart-header">
        <h1>My Cart</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={onClickRemoveAll}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list">
        {cartList.map(item => (
          <li key={item.dish_id} className="cart-item">
            <img
              src={item.dish_image}
              alt="dishImage"
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h2>dishName</h2>
              <p>
                Price: {item.dish_currency}{' '}
                {(item.dish_price * item.quantity).toFixed(2)}
              </p>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => decrementCartItemQuantity(item.dish_id)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  type="button"
                  onClick={() => incrementCartItemQuantity(item.dish_id)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeCartItem(item.dish_id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="cart-page">
      <Navbar />
      {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
    </div>
  )
}

export default Cart
