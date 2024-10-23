// src/components/Jar.tsx
import React from 'react';
import { Fruit } from '../hooks/useFruits';

interface JarProps {
  fruits: Fruit[];
}

const Jar: React.FC<JarProps> = ({ fruits }) => {
  const totalCalories = fruits.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);

  return (
    <div>
      <h2>Fruit Jar</h2>
      <p>Total Fruits: {fruits.length}</p>
      <p>Total Calories: {totalCalories}</p>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {fruit.name} ({fruit.nutritions.calories} calories)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jar;
