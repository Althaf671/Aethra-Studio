'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout/', {
      method: 'POST',
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; 
    } else {
      alert('Failed to create checkout session');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">Click below to proceed with payment</p>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white ${
          loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'
        }`}
      >
        {loading ? 'Redirecting...' : 'Pay with Stripe'}
      </button>
    </div>
  );
}