import { useEffect, useState } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const username = localStorage.getItem('username');

  const fetchCartItems = async () => {
    if (!username) return;

    try {
      const res = await axios.get(`http://localhost:5104/Auth/cart/${username}`);
      setCartItems(res.data);
    } catch {
      alert('Failed to fetch cart items');
    }
  };

  useEffect(() => {
    fetchCartItems();

    // ✅ If cart was updated in Home, refresh and clear flag
    if (localStorage.getItem('cartUpdated') === 'true') {
      fetchCartItems();
      localStorage.removeItem('cartUpdated');
    }
  }, [username]);

  const handleCheckout = async () => {
    if (!username) return;

    try {
      await axios.post(`http://localhost:5104/Auth/cart/${username}/checkout`);
      alert('Checkout successful!');
      setCartItems([]);
    } catch {
      alert('Checkout failed');
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong> × {item.quantity > 0 ? item.quantity : 1}
                </li>
              ))}
            </ul>

            <p><strong>Total Items:</strong> {totalItems}</p>
            <button className="form-button" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
