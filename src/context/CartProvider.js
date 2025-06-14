// src/context/CartProvider.js
import {useState} from 'react'
import CartContext from './CartContext'

const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    const itemExists = cartList.find(item => item.dish_id === dish.dish_id)
    if (itemExists) {
      setCartList(prev =>
        prev.map(item =>
          item.dish_id === dish.dish_id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    } else {
      setCartList(prev => [...prev, {...dish, quantity: 1}])
    }
  }

  const removeCartItem = dishId => {
    setCartList(prev => prev.filter(item => item.dish_id !== dishId))
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prev =>
      prev.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prev =>
      prev
        .map(item =>
          item.dish_id === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
