'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [word, setWord] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word.trim()) {
      router.push(`/meaning/${word.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-light)] p-4">
      <h1 className="text-7xl font-extrabold text-[var(--color-primary)] mb-6 drop-shadow-lg animate-fade-in">WordWise AI</h1>
      <p className="text-2xl text-[var(--color-text-dark)] mb-12 text-center max-w-3xl leading-relaxed opacity-0 animate-fade-in-delay">
        Your intelligent dictionary web app. Instantly generate meanings, synonyms, and example sentences for any word or phrase using cutting-edge AI.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-[var(--color-surface)] rounded-3xl shadow-2xl p-10 space-y-7 border border-[var(--color-border)] transform transition-all duration-500 hover:scale-102 hover:shadow-3xl">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word or phrase..."
          className="w-full px-6 py-4 border border-[var(--color-border)] rounded-xl text-xl focus:ring-4 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition duration-300 text-[var(--color-text-dark)] bg-[var(--color-background-light)] shadow-inner hover:shadow-md"
        />
        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-text-light)] font-bold py-4 px-6 rounded-xl text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Get Meaning
        </button>
      </form>
    </div>
  );
}
