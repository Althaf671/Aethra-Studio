// src/app/services/page.tsx

import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="services-page">
      <h1 className="text-2xl font-bold text-center my-8">Our Services</h1>
      <p className="text-center text-lg mb-8">
        We offer a variety of services to help you achieve your goals.
      </p>
      <div className="services-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="service-item bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Web Development</h2>
          <p>We build high-quality, responsive websites tailored to your needs.</p>
        </div>
        <div className="service-item bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Mobile App Development</h2>
          <p>We create smooth, intuitive mobile applications for Android and iOS.</p>
        </div>
        <div className="service-item bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Digital Marketing</h2>
          <p>Our digital marketing services help you reach your audience effectively.</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}