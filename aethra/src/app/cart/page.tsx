// pages/cart.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data);
      setTotal(data.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0));
    }

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    // Implement payment gateway redirection
    const response = await fetch('/api/payment/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, total }),
    });

    const paymentData = await response.json();
    if (paymentData.url) {
      router.push(paymentData.url); // Redirect to payment gateway URL
    } else {
      alert('Payment failed!');
    }
  };

  const handleRemoveFromCart = async (id: number) => {
    const response = await fetch(`/api/cart/remove/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCartItems(cartItems.filter((item: any) => item.id !== id));
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">Total: ${total}</div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}