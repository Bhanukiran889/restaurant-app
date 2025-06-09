import './index.css'
import {FaShoppingCart} from 'react-icons/fa'

const Navbar = ({cartCount}) => (
  <nav className="navbar">
    <h1 className="logo">UNI Resto Cafe</h1>
    <div className="cart-container">
      <p>My Orders</p>
      <div>
        <FaShoppingCart className="cart-icon" />
        {cartCount >= 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </div>
  </nav>
)

export default Navbar
