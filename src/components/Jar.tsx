import React, { useState } from 'react';
import * as d3 from 'd3';
import { Fruit } from '../hooks/useFruits';
import FruitPieChart from './FruitPieChart';
import '../styles/Jar.scss';

interface JarProps {
  fruits: Fruit[];
  onRemoveFruit: (index: number) => void;
  onClearJar: () => void;
}

const Jar: React.FC<JarProps> = ({ fruits, onRemoveFruit, onClearJar }) => {
  const [showChart, setShowChart] = useState<boolean>(false);
  const [hoveredFruit, setHoveredFruit] = useState<string | null>(null);

  const totalCalories = fruits.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <div className="jar">
      <h2>Fruit Jar</h2>
      <p>Total Fruits: {fruits.length}</p>
      <p>Total Calories: {totalCalories}</p>
      <button onClick={onClearJar} disabled={fruits.length === 0}>
        Clear Jar
      </button>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide Pie Chart' : 'Show Pie Chart'}
      </button>
      <ul>
        {fruits.map((fruit, index) => (
          <li
            key={index}
            className={hoveredFruit === fruit.name ? 'highlighted' : ''}
          >
            {showChart && (
              <div
                className="color-square"
                style={{ backgroundColor: colorScale(fruit.name) }}
              />
            )}
            {fruit.name} ({fruit.nutritions.calories} calories)
            <button
              className="remove-button"
              onClick={() => onRemoveFruit(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {showChart && (
        <FruitPieChart
          fruits={fruits}
          colorScale={colorScale}
          onHoverFruit={setHoveredFruit}
        />
      )}
    </div>
  );
};

export default Jar;
