import React from 'react';
import { Fruit } from '../hooks/useFruits';

interface JarProps {
  fruits: Fruit[];
  onRemoveFruit: (index: number) => void;
  onClearJar: () => void;
}

const Jar: React.FC<JarProps> = ({ fruits, onRemoveFruit, onClearJar }) => {
  const totalCalories = fruits.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);

  return (
    <div>
      <h2>Fruit Jar</h2>
      <p>Total Fruits: {fruits.length}</p>
      <p>Total Calories: {totalCalories}</p>
      <button onClick={onClearJar} disabled={fruits.length === 0}>
        Clear Jar
      </button>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {fruit.name} ({fruit.nutritions.calories} calories)
            <button onClick={() => onRemoveFruit(index)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jar;
