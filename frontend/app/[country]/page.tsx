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
          {/* Navbar */}
              <nav className="bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 px-4 py-4 mb-8">
                      <div className="max-w-6xl mx-auto flex justify-between items-center">
                                <Link href="/" className="text-white font-black text-xl">
                                            🌴 WERELDBIEREN
                                </Link>Link>
                                <div className="flex gap-2">
                                            <Link href="/" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">🏠 Home</Link>Link>
                                            <a href="#" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">📖 Verhalen</a>a>
                                            <a href="#" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">🔐 Beheer</a>a>
                                </div>div>
                      </div>div>
              </nav>nav>
        
              <div className="max-w-6xl mx-auto px-4">
                      <h1 className="text-4xl font-black text-gray-900 mb-8">{countryName} BIEREN 🍺</h1>h1>
              
                {loading ? (
                    <div className="text-center py-12">
                                <p className="text-lg font-bold text-gray-900">Bieren laden...</p>p>
                    </div>div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {products.map((product) => (
                                    <Link
                                                      key={product._id}
                                                      href={`/product/${product._id}`}
                                                      className="bg-white border-4 border-yellow-600 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all"
                                                    >
                                                    <div className="w-full h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg mb-3 flex items-center justify-center text-5xl">
                                                                      🍺
                                                    </div>div>
                                                    <h3 className="font-black text-base text-gray-900 mb-1">{product.name}</h3>h3>
                                                    <p className="text-orange-700 font-black text-sm mb-1">€{product.price}</p>p>
                                                    <p className="text-yellow-700 font-black text-sm">
                                                                      ⭐ {product.rating || 0} ({product.reviews || 0})
                                                    </p>p>
                                                    <button className="mt-3 w-full bg-orange-600 text-white px-3 py-2 rounded font-bold text-sm hover:bg-orange-700">
                                                                      🛒 BESTEL
                                                    </button>button>
                                    </Link>Link>
                                  ))}
                    </div>div>
                      )}
              </div>div>
        </main>main>
      );
}</main>
