// CartPage.tsx

import React, { useState } from 'react';
import MainNavBar from '@/components/NavBar/MainNavBar';
import './CartPageStyles.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/redux/actions/cartAction';
import { RootState } from '@/redux/reducers/rootReducer';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [email, setEmail] = useState('example@example.com');
  const [name, setName] = useState('John Doe');
  const [country, setCountry] = useState('USA');

  console.log('Cart Items:', items); // Debugging line

  const handleContinue = () => {
    navigate('/waiting-for-approval');
  };

  const total = items.reduce((total: number, item) => total + item.price * item.quantity, 0);

  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    dispatch(updateQuantity(id, quantity));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="page-container">
      <MainNavBar />
      <div className="content-container">
        <h1 className="page-title">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card personal-details">
            <h2 className="card-title">Your Personal Details</h2>
            <div className="detail">
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="detail">
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="detail">
              <strong>Country:</strong>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="select-field"
              >
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>

          <div className="card order-details">
            <h2 className="card-title">My Order</h2>
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} className="order-item">
                  <strong>{item.name}</strong>
                  <div className="flex justify-between">
                    <span>Price: ${item.price.toFixed(2)}</span>
                    <span>
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
                        style={{ width: '50px', marginLeft: '10px' }}
                      />
                    </span>
                    <button className="close-icon" onClick={() => handleRemoveItem(item.id)}>✖</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No items in cart</div>
            )}
            <div className="shipment"><strong>Shipment:</strong> <span>Free (no extra charge)</span></div>
            <div className="total"><strong>Total: ${total.toFixed(2)}</strong></div>
            <input type="text" placeholder="Coupon Code" className="input-field" />
            <button className="apply-button">Apply</button>
          </div>
        </div>

        <div className="payment-section mt-6">
          <h2 className="section-title">Payment Method</h2>
          <div className="payment-option"><label><input type="radio" name="payment" /> Visa/Master</label></div>
          <div className="payment-option"><label><input type="radio" name="payment" /> Bank Transfer</label></div>
          <div className="payment-option"><label><input type="radio" name="payment" /> Crypto</label></div>
          <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;