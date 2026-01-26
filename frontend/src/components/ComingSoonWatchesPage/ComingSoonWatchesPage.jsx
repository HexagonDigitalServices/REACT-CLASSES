// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

import React from 'react';

const watches = [
  {
    id: 1,
    name: 'Norqain Independence',
    price: 619000,
    imgUrl: 'https://cdn1.ethoswatches.com/media/catalog/product/cache/f0b79ae043f96db23a7b71063265844a/n/o/norqain-independence-n3000-07q25-b29-r01.jpg',
  },
  {
    id: 2,
    name: 'Zenith Chronomaster',
    price: 1069200,
    imgUrl: 'https://cdn1.ethoswatches.com/media/catalog/product/cache/f0b79ae043f96db23a7b71063265844a/z/e/zenith-chronomaster-03-3200-3600-52-c910.jpg',
  },
  {
    id: 3,
    name: 'Jacob & Co. Epic X ',
    price: 3100000,
    imgUrl: 'https://cdn1.ethoswatches.com/media/catalog/product/cache/f0b79ae043f96db23a7b71063265844a/j/a/jacob-c0-epic-x-ex110-20-aa-at-abrua.jpg',
  },
  {
    id: 4,
    name: 'Bvlgari Octo',
    price: 2450000,
    imgUrl: 'https://cdn1.ethoswatches.com/media/catalog/product/cache/f0b79ae043f96db23a7b71063265844a/h/-/h-moser-cie-pioneer-3811-1203.jpg',
  },
  {
    id: 5,
    name: 'Louis Erard Excellence',
    price: 3300000,
    imgUrl: 'https://cdn1.ethoswatches.com/media/catalog/product/cache/f0b79ae043f96db23a7b71063265844a/l/o/louis-erard-excellence-85237aa90-bga087.jpg',
  },
];

const formatINR = (n) => `₹ ${n.toLocaleString('en-IN')}`;

export default function ComingSoonWatchesPage() {
  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl tracking-wide uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              New Arrivals
            </h2>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">Coming Soon</p>
          </div>
          <a
            className="text-sm text-gray-600 hover:text-gray-900 uppercase tracking-wide"
            href="/watches"
          >
            View All ›
          </a>
        </div>

        {/* watches row */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-8 items-start min-w-[1100px] lg:min-w-full justify-between">
            {watches.map((w) => (
              <figure key={w.id} className="flex-1 max-w-xs flex flex-col items-center">
                {/* image - no card, no border, using image URL */}
                <div className="w-full flex justify-center">
                  <img
                    src={w.imgUrl}
                    alt={w.name}
                    className="object-contain h-56 md:h-64 lg:h-72 xl:h-80 transition-transform transform"
                    loading="lazy"
                    onError={(e) => {
                      // fallback: show a small transparent placeholder if URL is missing
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22240%22></svg>';
                    }}
                  />
                </div>

                {/* name */}
                <figcaption className="mt-6 text-center">
                  <div className="text-xs md:text-sm uppercase tracking-widest text-gray-700 font-semibold">
                    {w.name}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">{formatINR(w.price)}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
