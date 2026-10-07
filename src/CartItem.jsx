import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onHome, onPlants, onCart, cartCount }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Convert the cost string (e.g. "$15") into a number for calculations
  const getPrice = (cost) => parseFloat(cost.replace("$", ""));

  const totalAmount = cartItems.reduce(
    (total, item) => total + getPrice(item.cost) * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout is Coming Soon!");
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <h2>Paradise Nursery</h2>

        <div className="nav-links">
          <button onClick={onHome}>Home</button>

          <button onClick={onPlants}>Plants</button>

          <button onClick={onCart}>
            Cart 🛒
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      <main className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <h2>Your cart is empty.</h2>

            <button
              className="continue-btn"
              onClick={onPlants}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const itemPrice = getPrice(item.cost);
              const itemTotal = itemPrice * item.quantity;

              return (
                <article
                  className="cart-item"
                  key={item.name}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      Unit Price: {item.cost}
                    </p>

                    <p>
                      Total: ${itemTotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            name: item.name,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            name: item.name,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      dispatch(removeItem(item.name))
                    }
                  >
                    Delete
                  </button>
                </article>
              );
            })}
            </div>

            <section className="cart-summary">
              <h2>
                Total Cart Amount: ${totalAmount.toFixed(2)}
              </h2>

              <div className="cart-actions">
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

                <button
                  className="continue-btn"
                  onClick={onPlants}
                >
                  Continue Shopping
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItem;
