'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
    const [search, setSearch] = useState('');

  const allCountries = [
    { code: '🇳🇱', name: 'Nederland', slug: 'netherlands' },
    { code: '🇬🇧', name: 'Engeland', slug: 'england' },
    { code: '🇩🇪', name: 'Duitsland', slug: 'germany' },
    { code: '🇧🇪', name: 'België', slug: 'belgium' },
    { code: '🇫🇷', name: 'Frankrijk', slug: 'france' },
    { code: '🇨🇿', name: 'Tsjechië', slug: 'czechia' },
      ];

  const filteredCountries = allCountries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
                                                  );

  return (
        <main className="min-h-screen bg-gradient-to-b from-sky-400 via-yellow-100 to-yellow-200">
          {/* Navbar */}
              <nav className="bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 px-4 py-4 sticky top-0 z-50">
                      <div className="max-w-6xl mx-auto flex justify-between items-center">
                                <Link href="/" className="text-white font-black text-2xl">
                                            🌴 WERELDBIEREN 🍺
                                </Link>Link>
                                <div className="flex gap-2">
                                            <Link href="/" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">🏠 Home</Link>Link>
                                            <a href="#blogs" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">📖 Verhalen</a>a>
                                            <a href="#admin" className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-orange-700">🔐 Beheer</a>a>
                                </div>div>
                      </div>div>
              </nav>nav>
        
          {/* Hero Section */}
              <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
                      <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 rounded-3xl p-20 text-center shadow-2xl border-4 border-orange-600 relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-9xl opacity-10">🏖️</div>div>
                                <div className="relative z-10">
                                            <div className="text-7xl mb-6 inline-block animate-bounce">☀️ 🌴 🏝️ 🍹 🌊</div>div>
                                            <h1 className="text-5xl font-black text-gray-900 mb-4">ONTDEK DE WERELD</h1>h1>
                                            <p className="text-xl text-gray-800 mb-8 font-bold">
                                                          Vakantiegevoel in elk glas. Proef bier van ELKE bestemming! 🌍🍺
                                            </p>p>
                                            <div className="flex gap-3 justify-center">
                                                          <input
                                                                            type="text"
                                                                            placeholder="Zoeken op land..."
                                                                            value={search}
                                                                            onChange={(e) => setSearch(e.target.value)}
                                                                            className="px-6 py-3 rounded-lg text-lg font-bold border-4 border-orange-600 w-full max-w-md text-gray-900"
                                                                          />
                                                          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-black text-lg hover:bg-orange-700">
                                                                          🔍 ZOEK
                                                          </button>button>
                                            </div>div>
                                </div>div>
                      </div>div>
              </div>div>
        
          {/* Country Cards */}
              <div className="max-w-6xl mx-auto px-4 pb-20">
                      <div className="grid grid-cols-3 gap-6">
                        {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                                      <Link
                                                        key={country.slug}
                                                        href={`/${country.slug}`}
                                                        className="bg-white border-4 border-yellow-500 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                                                      >
                                                      <div className="text-7xl mb-4">{country.code}</div>div>
                                                      <h3 className="text-2xl font-black text-gray-900 mb-2">{country.name.toUpperCase()}</h3>h3>
                                                      <p className="text-orange-600 font-bold">Bieren & verhalen ✨🍺</p>p>
                                      </Link>Link>
                                    ))
                    ) : (
                      <div className="col-span-3 text-center py-12">
                                    <p className="text-lg font-bold text-gray-900">Geen landen gevonden</p>p>
                      </div>div>
                                )}
                      </div>div>
              </div>div>
        </main>main>
      );
}</main>
