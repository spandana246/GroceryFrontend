import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:5000/Auth/cart/${username}`)
      .then((res) => setCartItems(res.data))
      .catch(() => alert('Failed to fetch cart items'));
  }, [username]);

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
