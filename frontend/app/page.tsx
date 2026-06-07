'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  const countries = [
    { code: '🇳🇱', name: 'Nederland', slug: 'netherlands' },
    { code: '🇬🇧', name: 'Engeland', slug: 'england' },
    { code: '🇩🇪', name: 'Duitsland', slug: 'germany' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-400 via-yellow-100 to-yellow-200">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 rounded-3xl p-20 text-center shadow-2xl border-4 border-orange-600 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-9xl opacity-10">🏖️</div>
          <div className="relative z-10">
            <div className="text-7xl mb-6 inline-block animate-bounce">☀️ 🌴 🏝️ 🍹 🌊</div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">ONTDEK DE WERELD</h1>
            <p className="text-xl text-gray-800 mb-8 font-bold">
              Vakantiegevoel in elk glas. Proef bier van ELKE bestemming! 🌍🍺
            </p>
            <div className="flex gap-3 justify-center">
              <input
                type="text"
                placeholder="Zoeken op land..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-6 py-3 rounded-lg text-lg font-bold border-4 border-orange-600 w-full max-w-md"
              />
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-black text-lg">
                🔍 ZOEK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Country Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="bg-white border-4 border-yellow-500 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className="text-7xl mb-4">{country.code}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{country.name.toUpperCase()}</h3>
              <p className="text-orange-600 font-bold">Bieren & verhalen ✨🍺</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
