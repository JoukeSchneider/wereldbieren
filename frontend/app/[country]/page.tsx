'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

interface Product {
  _id: string;
  name: string;
  country: string;
  type: string;
  price: number;
  abv: number;
  rating: number;
  reviews: number;
}

export default function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState('');

  const countryMap: { [key: string]: string } = {
    netherlands: '🇳🇱 NEDERLAND',
    england: '🇬🇧 ENGELAND',
    germany: '🇩🇪 DUITSLAND',
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const resolvedParams = await params;
        setCountryName(countryMap[resolvedParams.country] || 'Bieren');
        const { data } = await getProducts();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [params]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 to-yellow-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-8">{countryName} BIEREN 🍺</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg font-bold">Bieren laden...</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="bg-white border-4 border-yellow-500 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-full h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg mb-3 flex items-center justify-center text-5xl">
                  🍺
                </div>
                <h3 className="font-black text-sm mb-1">{product.name}</h3>
                <p className="text-orange-600 font-bold text-sm mb-1">€{product.price}</p>
                <p className="text-yellow-600 font-black text-xs">
                  ⭐ {product.rating || 0} ({product.reviews || 0})
                </p>
                <button className="mt-3 w-full bg-orange-600 text-white px-3 py-1 rounded font-bold text-xs">
                  🛒 BESTEL
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
