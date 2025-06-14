import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Menu from './components/Menu'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContextProvider from './context/CartProvider'

const App = () => (
  <CartContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Menu} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </CartContextProvider>
)

export default App
