import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart, addToCart, removeFromCart } from '../redux/cartSlice';
import ShippingAddressForm from '../components/ShippingAddressForm';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleQtyChange = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    } else {
      dispatch(removeFromCart(item.productId));
    }
  };

  const handlePayment = async (addressData) => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment(addressData);
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const keyRes = await fetch('/api/payment/key');
      const keyData = await keyRes.json();

      const options = {
        key: keyData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Triveni Sangam Dialogues',
        description: 'Order Payment',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address: addressData,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: addressData.fullName,
          email: user?.email,
          contact: addressData.phone
        },
        theme: {
          color: '#C8793A'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async (addressData) => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address: addressData,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    } else {
      alert('Order saving failed');
    }
  };

  const handleShippingSubmit = (formData) => {
    if (!user) {
      alert("Please login first to place an order");
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate('/shop');
      return;
    }
    handlePayment(formData);
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', background: '#FDFCF8' }}>
      <h2 style={{ fontSize: '2.5rem', color: '#2c1a0e', margin: '0 0 30px', fontWeight: '800' }}>Checkout</h2>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Left Column: Shipping Form */}
        <div style={{ flex: '1 1 600px' }}>
          <ShippingAddressForm onSubmit={handleShippingSubmit} />
        </div>
        
        {/* Right Column: Order Summary */}
        <div style={{ flex: '1 1 350px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1.5px solid #f0dcc8', boxShadow: '0 8px 24px rgba(180, 100, 40, 0.08)' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#5a2d0c', margin: '0 0 20px', borderBottom: '1px solid #f0dcc8', paddingBottom: '10px' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
            {cartItems.map((item) => (
              <div key={item.productId} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e8d0b0' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px', fontWeight: '600', color: '#3d1f0a', fontSize: '0.9rem' }}>{item.name}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8d0b0', borderRadius: '6px', overflow: 'hidden' }}>
                      <button 
                        type="button" 
                        onClick={() => handleQtyChange(item, item.qty - 1)}
                        style={{ padding: '2px 8px', background: '#faf6f1', border: 'none', cursor: 'pointer', color: '#5a2d0c', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '2px 10px', fontSize: '0.85rem', color: '#9a6a44', background: '#fff' }}>
                        {item.qty}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => handleQtyChange(item, item.qty + 1)}
                        style={{ padding: '2px 8px', background: '#faf6f1', border: 'none', cursor: 'pointer', color: '#5a2d0c', fontWeight: 'bold', borderLeft: '1px solid #e8d0b0' }}
                      >
                        +
                      </button>
                    </div>
                    
                    <span style={{ color: '#9a6a44', fontSize: '0.9rem', fontWeight: '600' }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>
              </div>
            ))}
            {cartItems.length === 0 && (
              <p style={{ color: '#9a6a44', textAlign: 'center', margin: '20px 0' }}>Your cart is empty.</p>
            )}
          </div>

          <div style={{ borderTop: '1.5px solid #f0dcc8', paddingTop: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: '700', color: '#2c1a0e' }}>
              <span>Total to Pay</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <p style={{ color: '#C8793A', fontSize: '0.9rem', marginTop: '15px', textAlign: 'center', background: '#fffaf5', padding: '10px', borderRadius: '8px', border: '1px dashed #C8793A' }}>
              ℹ️ Fill your shipping address and click <strong>Save Address</strong> to initiate secure payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
