import { useEffect, useState } from 'react';
import axios from 'axios';

interface GroceryItem {
  id: number;
  name: string;
}

export default function Home() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios
      .get('http://localhost:5104/Grocery')
      .then((res) => setItems(res.data))
      .catch(() => alert('Failed to fetch grocery items'));
  }, []);

  const addToCart = async (item: GroceryItem) => {
  if (!username) {
    alert('Please log in to add items to cart');
    return;
  }

  try {
    await axios.post(`http://localhost:5104/Auth/cart/${username}/add`, {
      id: item.id,
      name: item.name,
    });
    localStorage.setItem('cartUpdated', 'true'); // ✅ set flag
    alert(`${item.name} added to cart`);
  } catch {
    alert('Failed to add item to cart');
  }
};
  const handleAddItem = async () => {
    if (!newItem.trim()) {
      alert('Item name is required');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5104/Grocery/add',
        { name: newItem },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setItems([...items, response.data]);
      setNewItem('');
    } catch {
      alert('Failed to add item');
    }
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h2>Grocery Items</h2>
        {items.map((item) => (
          <div className="item" key={item.id}>
            <span>{item.name}</span>
            <button className="form-button" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}

        <h3>Add New Item</h3>
        <input
          className="form-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button className="form-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
    </div>
  );
}
