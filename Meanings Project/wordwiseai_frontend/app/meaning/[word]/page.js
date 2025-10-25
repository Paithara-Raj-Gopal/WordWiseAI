'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MeaningPage() {
  const { word } = useParams();
  const [meaningData, setMeaningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (word) {
      const fetchMeaning = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8000/api/meaning/${word}/`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const cleanedData = data.replace(/^```json\n|```$/g, ''); // Remove ```json\n and ```
          setMeaningData(JSON.parse(cleanedData));
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchMeaning();
    }
  }, [word]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-[var(--color-text-dark)]">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-xl text-[var(--color-danger)]">Error: {error.message}</div>;
  if (!meaningData) return <div className="min-h-screen flex items-center justify-center text-xl text-[var(--color-text-dark)]">No meaning found for "{word}".</div>;

  return (
    <div className="min-h-screen bg-[var(--color-background-light)] text-[var(--color-text-dark)] p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto bg-[var(--color-surface)] shadow-2xl rounded-3xl p-10 border border-[var(--color-border)] transform transition-all duration-300 hover:scale-102 hover:shadow-3xl">
        <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-8 text-center drop-shadow-lg">{word}</h1>
        
        <div className="mb-10 p-6 bg-[var(--color-background-light)] rounded-xl border border-[var(--color-border)] shadow-inner">
          <h2 className="text-3xl font-semibold text-[var(--color-text-dark)] mb-4 border-b-2 border-[var(--color-border)] pb-3">Meaning:</h2>
          <p className="text-xl leading-relaxed text-[var(--color-text-dark)]">{meaningData.meaning}</p>
        </div>

        {meaningData.synonyms && meaningData.synonyms.length > 0 && (
          <div className="mb-10 p-6 bg-[var(--color-background-light)] rounded-xl border border-[var(--color-border)] shadow-inner">
            <h2 className="text-3xl font-semibold text-[var(--color-text-dark)] mb-4 border-b-2 border-[var(--color-border)] pb-3">Synonyms:</h2>
            <p className="text-xl leading-relaxed text-[var(--color-secondary)]">{meaningData.synonyms.join(', ')}</p>
          </div>
        )}

        {meaningData.example_sentences && meaningData.example_sentences.length > 0 && (
          <div className="p-6 bg-[var(--color-background-light)] rounded-xl border border-[var(--color-border)] shadow-inner">
            <h2 className="text-3xl font-semibold text-[var(--color-text-dark)] mb-4 border-b-2 border-[var(--color-border)] pb-3">Example Sentences:</h2>
            <ul className="list-disc list-inside text-xl space-y-3 pl-5">
              {meaningData.example_sentences.map((sentence, index) => (
                <li key={index} className="text-[var(--color-text-dark)]">{sentence}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
