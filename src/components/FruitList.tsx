import React, { useState } from 'react';
import { Fruit } from '../hooks/useFruits';

interface FruitListProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  onAddGroup: (group: Fruit[]) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, onAddFruit, onAddGroup }) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [groupBy, setGroupBy] = useState<'none' | 'family' | 'order' | 'genus'>('none');

  const handleGroupByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(e.target.value as 'none' | 'family' | 'order' | 'genus');
  };

  const groupedFruits = groupBy === 'none' ? { '': fruits } : fruits.reduce((acc, fruit) => {
    const key = fruit[groupBy];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fruit);
    return acc;
  }, {} as Record<string, Fruit[]>);

  return (
    <div>
      <h2>Fruits</h2>
      <div>
        <label htmlFor="groupBy">Group by: </label>
        <select id="groupBy" value={groupBy} onChange={handleGroupByChange}>
          <option value="none">None</option>
          <option value="family">Family</option>
          <option value="order">Order</option>
          <option value="genus">Genus</option>
        </select>
        <button onClick={() => setView('list')}>List View</button>
        <button onClick={() => setView('table')}>Table View</button>
      </div>

      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <div key={group}>
          {group && <h3>{group} <button onClick={() => onAddGroup(fruits)}>Add All</button></h3>}
          {view === 'list' ? (
            <ul>
              {fruits.map((fruit) => (
                <li key={fruit.id}>
                  {fruit.name} ({fruit.nutritions.calories} calories)
                  <button onClick={() => onAddFruit(fruit)} style={{ marginLeft: '10px' }}>Add</button>
                </li>
              ))}
            </ul>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Family</th>
                  <th>Order</th>
                  <th>Genus</th>
                  <th>Calories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fruits.map((fruit) => (
                  <tr key={fruit.id}>
                    <td>{fruit.name}</td>
                    <td>{fruit.family}</td>
                    <td>{fruit.order}</td>
                    <td>{fruit.genus}</td>
                    <td>{fruit.nutritions.calories}</td>
                    <td>
                      <button onClick={() => onAddFruit(fruit)}>Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default FruitList;
