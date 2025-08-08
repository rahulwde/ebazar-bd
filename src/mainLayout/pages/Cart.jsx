import React from 'react';
import { useCart } from '../../Context/CartContext';
 
const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            {item.itemName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
