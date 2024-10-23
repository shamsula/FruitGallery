// src/hooks/useFruits.ts
import { useEffect, useState } from 'react';
import { fetchMockFruits } from '../api/mockFruitData';

const useFruits = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFruits = async () => {
      try {
        const data = await fetchMockFruits();
        setFruits(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch fruits');
      } finally {
        setLoading(false);
      }
    };

    getFruits();
  }, []);

  return { fruits, loading, error };
};

export default useFruits;

export interface Fruit {
    name: string;
    id: number;
    family: string;
    order: string;
    genus: string;
    nutritions: {
      calories: number;
      fat: number;
      sugar: number;
      carbohydrates: number;
      protein: number;
    };
  }