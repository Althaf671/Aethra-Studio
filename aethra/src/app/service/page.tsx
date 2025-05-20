'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  deadline: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const userId = 1;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/admin/crud-service/read');
      const data = await res.json();
      setServices(data);
    }
    fetchData();
  }, []);

  const handleAddToCart = async (serviceId: number) => {
    if (addedToCart.includes(serviceId)) return;

    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, userId, quantity: 1 }),
    });

    if (response.ok) {
      alert('Service added to cart!');
      setAddedToCart((prev) => [...prev, serviceId]);
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to add service to cart.');
    }
  };

  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  const handleGoToDetail = (id: number) => {
    router.push(`/service/${id}`);
  };

  const handleWhatsapp = (service: Service) => {
    const text = encodeURIComponent(`Halo, saya tertarik dengan jasa ${service.title} seharga Rp${service.price.toLocaleString()}. Bisa dibantu?`);
    const whatsappLink = `https://wa.me/6281234567890?text=${text}`; // ganti dengan nomor WA kamu
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="mt-20 pt-10 px-5 pb-10">
      {services.length > 0 ? (
        <Swiper
          spaceBetween={-40}
          slidesPerView={1.6}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {services.map((service, index) => (
            <SwiperSlide key={service.id}>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  index === activeIndex
                    ? 'scale-100 blur-0 opacity-100 z-10'
                    : 'scale-[0.85] blur-[1px] opacity-100 z-0'
                } bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleGoToDetail(service.id)}
                >
                  <h1 className="text-lg font-semibold mb-1">{service.title}</h1>

                  {service.image && (
                    <Image
                      src={service.image}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="rounded-xl object-cover w-full h-[250px]"
                    />
                  )}

                  <div className="flex justify-between mt-3">
                    <p className="text-blue-700 font-medium">
                      Rp{service.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">{service.description}</p>
                </div>

               {/* Action Buttons */}
              <div className="mt-4 ">
                
                <button
                  onClick={() => handleAddToCart(service.id)}
                  disabled={addedToCart.includes(service.id)}
                  className={`w-full block py-2 px-4 rounded-xl text-sm font-medium transition ${
                    addedToCart.includes(service.id)
                      ? 'bg-gray-300 text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {addedToCart.includes(service.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>

                

               
                <div
                  onClick={() => handleWhatsapp(service)}
                  className="w-full flex flex-col py-2 px-4 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600  items-center justify-center  mt-2"
                >
                  <Image
                    src="/images/misc/wa-white.svg"
                    width={18}
                    height={18}
                    alt="WhatsApp"
                    className="object-contain"
                  />
                </div>
              </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 mt-4">No services found.</p>
      )}
    </div>
  );
}