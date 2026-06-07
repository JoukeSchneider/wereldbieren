'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getProductById, getReviews, postReview } from '../../services/api';

interface Product {
    _id: string;
    name: string;
    country: string;
    type: string;
    price: number;
    abv: number;
    description: string;
}

interface Review {
    _id: string;
    authorName: string;
    text: string;
    rating: number;
    isApproved: boolean;
}

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
          authorName: '',
          text: '',
          rating: 5,
    });

  useEffect(() => {
        const loadData = async () => {
                try {
                          const resolvedParams = await params;
                          const { data: productData } = await getProductById(resolvedParams.id);
                          setProduct(productData);

                  const { data: reviewsData } = await getReviews(resolvedParams.id);
                          setReviews(reviewsData.data || []);
                } catch (error) {
                          console.error('Error loading data:', error);
                } finally {
                          setLoading(false);
                }
        };

                loadData();
  }, [params]);

  const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        try {
                await postReview({
                          beerId: product._id,
                          authorName: formData.authorName,
                          text: formData.text,
                          rating: formData.rating,
                          language: 'nl',
                });
                setFormData({ authorName: '', text: '', rating: 5 });
                alert('Review geplaatst! Het wacht op goedkeuring.');
        } catch (error) {
                console.error('Error posting review:', error);
        }
  };

  if (loading) {
        return <div className="text-center py-12 text-gray-900 font-bold">Laden...</div>div>;
  }
  
    if (!product) {
          return <div className="text-center py-12 text-gray-900 font-bold">Product niet gevonden</div>div>;
    }
  
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
                        <div className="grid grid-cols-2 gap-8">
                          {/* Product Info */}
                                  <div>
                                              <div className="w-full h-80 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl mb-6 flex items-center justify-center text-9xl shadow-lg">
                                                            🍺
                                              </div>div>
                                              <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>h1>
                                              <p className="text-gray-800 mb-6 text-base font-bold">{product.description}</p>p>
                                              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg mb-6 border-4 border-orange-600">
                                                            <p className="font-bold text-gray-900 mb-2">
                                                                            <strong>Land:</strong>strong> {product.country} 🌍
                                                            </p>p>
                                                            <p className="font-bold text-gray-900 mb-2">
                                                                            <strong>Type:</strong>strong> {product.type}
                                                            </p>p>
                                                            <p className="font-bold text-gray-900">
                                                                            <strong>Alcohol:</strong>strong> {product.abv}%
                                                            </p>p>
                                              </div>div>
                                              <p className="text-4xl font-black text-orange-700 mb-6">€{product.price}</p>p>
                                              <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-black text-lg hover:bg-orange-700">
                                                            🛒 BESTEL NU OP AFFILIATE
                                              </button>button>
                                  </div>div>
                        
                          {/* Reviews */}
                                  <div>
                                              <h2 className="text-3xl font-black text-gray-900 mb-6">⭐ REVIEWS</h2>h2>
                                  
                                    {/* Existing Reviews */}
                                              <div className="space-y-3 mb-8">
                                                {reviews.filter((r) => r.isApproved).map((review) => (
                            <div key={review._id} className="border-l-4 border-orange-600 bg-white p-4 rounded shadow">
                                              <div className="flex justify-between mb-2">
                                                                  <strong className="text-base text-gray-900">{review.authorName}</strong>strong>
                                                                  <span className="text-yellow-600 font-black">
                                                                    {'⭐'.repeat(review.rating)}
                                                                  </span>span>
                                              </div>div>
                                              <p className="text-base text-gray-800">{review.text}</p>p>
                            </div>div>
                          ))}
                                              </div>div>
                                  
                                    {/* Review Form */}
                                              <form
                                                              onSubmit={handleSubmitReview}
                                                              className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg border-4 border-orange-600"
                                                            >
                                                            <h3 className="font-black text-gray-900 mb-3">✍️ PLAATS EEN REVIEW</h3>h3>
                                                            <input
                                                                              type="text"
                                                                              placeholder="Je naam..."
                                                                              value={formData.authorName}
                                                                              onChange={(e) =>
                                                                                                  setFormData({ ...formData, authorName: e.target.value })
                                                                              }
                                                                              className="w-full p-2 mb-3 border-2 border-orange-600 rounded font-bold text-gray-900"
                                                                              required
                                                                            />
                                                            <select
                                                                              value={formData.rating}
                                                                              onChange={(e) =>
                                                                                                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                                                                              }
                                                                              className="w-full p-2 mb-3 border-2 border-orange-600 rounded font-bold text-gray-900"
                                                                            >
                                                                            <option value="5">⭐⭐⭐⭐⭐ Geweldig!</option>option>
                                                                            <option value="4">⭐⭐⭐⭐ Goed</option>option>
                                                                            <option value="3">⭐⭐⭐ Prima</option>option>
                                                                            <option value="2">⭐⭐ Matig</option>option>
                                                                            <option value="1">⭐ Slecht</option>option>
                                                            </select>select>
                                                            <textarea
                                                                              placeholder="Je review..."
                                                                              value={formData.text}
                                                                              onChange={(e) =>
                                                                                                  setFormData({ ...formData, text: e.target.value })
                                                                              }
                                                                              className="w-full p-2 mb-3 h-24 border-2 border-orange-600 rounded font-bold text-gray-900"
                                                                              required
                                                                            />
                                                            <button
                                                                              type="submit"
                                                                              className="w-full bg-orange-600 text-white p-2 rounded font-black hover:bg-orange-700"
                                                                            >
                                                                            PLAATS REVIEW
                                                            </button>button>
                                              </form>form>
                                  </div>div>
                        </div>div>
                </div>div>
          </main>main>
        );
}</div>
