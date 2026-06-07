'use client';

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
    return <div className="text-center py-12">Laden...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product niet gevonden</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 to-yellow-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Product Info */}
          <div>
            <div className="w-full h-80 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl mb-6 flex items-center justify-center text-9xl">
              🍺
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg mb-6 border-2 border-yellow-400">
              <p className="font-bold mb-2">
                <strong>Land:</strong> {product.country} 🌍
              </p>
              <p className="font-bold mb-2">
                <strong>Type:</strong> {product.type}
              </p>
              <p className="font-bold">
                <strong>Alcohol:</strong> {product.abv}%
              </p>
            </div>
            <p className="text-3xl font-black text-orange-600 mb-6">€{product.price}</p>
            <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-black text-lg hover:bg-orange-700">
              🛒 BESTEL NU OP AFFILIATE
            </button>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">⭐ REVIEWS</h2>

            {/* Existing Reviews */}
            <div className="space-y-3 mb-8">
              {reviews.filter((r) => r.isApproved).map((review) => (
                <div key={review._id} className="border-l-4 border-yellow-500 bg-white p-3 rounded">
                  <div className="flex justify-between mb-1">
                    <strong className="text-sm">{review.authorName}</strong>
                    <span className="text-yellow-600 font-black">
                      {'⭐'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <form
              onSubmit={handleSubmitReview}
              className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-400"
            >
              <h3 className="font-black mb-3">✍️ PLAATS EEN REVIEW</h3>
              <input
                type="text"
                placeholder="Je naam..."
                value={formData.authorName}
                onChange={(e) =>
                  setFormData({ ...formData, authorName: e.target.value })
                }
                className="w-full p-2 mb-3 border-2 border-yellow-500 rounded font-bold"
                required
              />
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
                className="w-full p-2 mb-3 border-2 border-yellow-500 rounded font-bold"
              >
                <option value="5">⭐⭐⭐⭐⭐ Geweldig!</option>
                <option value="4">⭐⭐⭐⭐ Goed</option>
                <option value="3">⭐⭐⭐ Prima</option>
                <option value="2">⭐⭐ Matig</option>
                <option value="1">⭐ Slecht</option>
              </select>
              <textarea
                placeholder="Je review..."
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="w-full p-2 mb-3 h-24 border-2 border-yellow-500 rounded font-bold"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-white p-2 rounded font-black hover:bg-orange-700"
              >
                PLAATS REVIEW
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
