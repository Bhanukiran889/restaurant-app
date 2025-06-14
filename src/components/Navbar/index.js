import {useContext} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = () => {
  const {cartList} = useContext(CartContext)
  const history = useHistory()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const cartCount = cartList.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1 className="logo">UNI Resto Cafe</h1>
      </Link>
      <div className="cart-container">
        <Link to="/cart" className="cart-link">
          <p>My Orders</p>
          <div>
            <FaShoppingCart className="cart-icon" />
            <span data-testid="cart" className="cart-count">
              {cartCount}
            </span>
          </div>
        </Link>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
