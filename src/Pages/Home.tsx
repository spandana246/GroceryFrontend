import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get('http://localhost:5000/Grocery').then((res) => setItems(res.data));
  }, []);

  const addToCart = async (item: string) => {
    await axios.post(`http://localhost:5000/Auth/cart/${username}/add`, { name: item });
    alert('Item added to cart');
  };

  const handleAddItem = async () => {
    await axios.post('http://localhost:5000/Grocery/add', { name: newItem }, { headers: { 'Content-Type': 'application/json' } });
    setItems([...items, newItem]);
    setNewItem('');
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h2>Grocery Items</h2>
        {items.map((item) => (
          <div className="item" key={item}>
            {item}
            <button className="form-button" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
        <h3>Add New Item</h3>
        <input
          className="form-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button className="form-button" onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}
