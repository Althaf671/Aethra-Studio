'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  serviceId: number;
  quantity: number;
  service: {
    title: string;
    price: number;
    image: string;
  };
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = 1;

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart?userId=${userId}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (Array.isArray(data.cartItems)) {
          setCartItems(data.cartItems);
        } else {
          console.error('Unexpected API response:', data);
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleRemove = async (itemId: number) => {
    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      alert('Failed to remove item.');
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.service.price * item.quantity, 0)
    : 0;

  if (loading) return <p className="mt-20 text-center">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{item.service.title}</h2>
                <p>Rp{(item.service.price * item.quantity).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rp{totalPrice.toLocaleString()}</span>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-end"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}