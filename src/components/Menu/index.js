import {Component} from 'react'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Menu extends Component {
  state = {
    categories: [],
    activeTab: 0,
    counts: {},
    restaurantName: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchMenuData()
  }

  fetchMenuData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      if (response.ok) {
        const data = await response.json()
        const restaurant = data[0]
        const categories = restaurant.table_menu_list
        const saladsIndex = categories.findIndex(
          cat => cat.menu_category === 'Salads and Soup',
        )

        this.setState({
          categories,
          restaurantName: restaurant.restaurant_name,
          activeTab: saladsIndex !== -1 ? saladsIndex : 0,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleIncrement = id => {
    this.setState(prevState => {
      const updatedCounts = {
        ...prevState.counts,
        [id]: (prevState.counts[id] || 0) + 1,
      }
      return {counts: updatedCounts}
    })
  }

  handleDecrement = id => {
    this.setState(prevState => {
      const updatedCounts = {
        ...prevState.counts,
        [id]: Math.max((prevState.counts[id] || 0) - 1, 0),
      }
      return {counts: updatedCounts}
    })
  }

  renderDishList = () => {
    const {categories, activeTab, counts} = this.state
    const activeCategory = categories[activeTab]
    const dishes = activeCategory?.category_dishes || []

    return (
      <CartContext.Consumer>
        {({addCartItem}) => (
          <ul className="dish-list">
            {dishes.map(dish => {
              const quantity = counts[dish.dish_id] || 0
              const isAvailable = dish.dish_Availability

              const onAddToCart = () => {
                const cartDish = {
                  dish_id: dish.dish_id,
                  dish_name: dish.dish_name,
                  dish_image: dish.dish_image,
                  dish_currency: dish.dish_currency,
                  dish_price: dish.dish_price,
                  dish_calories: dish.dish_calories,
                  quantity,
                }
                addCartItem(cartDish)
              }

              return (
                <li key={dish.dish_id} className="dish-card">
                  <div className="dish-info">
                    <span
                      className={`veg-nonveg ${
                        dish.dish_Type === 2 ? 'nonveg' : 'veg'
                      }`}
                      aria-label={dish.dish_Type === 2 ? 'Non-Veg' : 'Veg'}
                    />
                    <h1>{dish.dish_name}</h1>
                    <p>{`${dish.dish_currency} ${dish.dish_price}`}</p>
                    <p>{dish.dish_description}</p>
                    <p>{`${dish.dish_calories} calories`}</p>

                    {isAvailable ? (
                      <div className="count-controller">
                        <button
                          type="button"
                          onClick={() => this.handleDecrement(dish.dish_id)}
                        >
                          -
                        </button>
                        <p>{quantity}</p>
                        <button
                          type="button"
                          onClick={() => this.handleIncrement(dish.dish_id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <p className="not-available">Not available</p>
                    )}

                    {isAvailable && quantity > 0 && (
                      <button
                        type="button"
                        className="add-cart-btn"
                        onClick={onAddToCart}
                      >
                        ADD TO CART
                      </button>
                    )}

                    {dish.addonCat?.length > 0 && (
                      <p className="custom">Customizations available</p>
                    )}
                  </div>
                  <img
                    src={dish.dish_image}
                    alt={dish.dish_name}
                    className="dish-img"
                  />
                </li>
              )
            })}
          </ul>
        )}
      </CartContext.Consumer>
    )
  }

  render() {
    const {categories, activeTab, apiStatus} = this.state

    if (apiStatus === apiStatusConstants.inProgress) {
      return <p>Loading...</p>
    }

    if (apiStatus === apiStatusConstants.failure) {
      return <p>Something went wrong. Please try again.</p>
    }

    return (
      <div className="menu-container">
        <Navbar />

        <ul className="tabs" role="tablist">
          {categories.map((cat, idx) => (
            <li key={cat.menu_category}>
              <button
                type="button"
                aria-controls={`panel-${idx}`}
                id={`tab-${idx}`}
                className={`tab ${idx === activeTab ? 'active' : ''}`}
                onClick={() => this.setState({activeTab: idx})}
              >
                {cat.menu_category}
              </button>
            </li>
          ))}
        </ul>
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {this.renderDishList()}
        </div>
      </div>
    )
  }
}

export default Menu
