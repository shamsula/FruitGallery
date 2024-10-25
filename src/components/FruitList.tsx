import React, { useState } from 'react';
import { Fruit } from '../hooks/useFruits';
import '../styles/FruitList.scss';


interface FruitListProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  onAddGroup: (group: Fruit[]) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, onAddFruit, onAddGroup }) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [groupBy, setGroupBy] = useState<'none' | 'family' | 'order' | 'genus'>('none');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ '': true });

  const handleGroupByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupBy = e.target.value as 'none' | 'family' | 'order' | 'genus';
    setGroupBy(newGroupBy);

    if (newGroupBy === 'none') {
      setExpandedGroups({ '': true });
    } else {
      setExpandedGroups({});
    }
  };

  const groupedFruits = groupBy === 'none' ? { '': fruits } : fruits.reduce((acc, fruit) => {
    const key = fruit[groupBy];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fruit);
    return acc;
  }, {} as Record<string, Fruit[]>);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="fruit-list">
      <h2>Fruits</h2>
      <div>
        <label htmlFor="groupBy">Group by: </label>
        <select id="groupBy" value={groupBy} onChange={handleGroupByChange}>
          <option value="none">None</option>
          <option value="family">Family</option>
          <option value="order">Order</option>
          <option value="genus">Genus</option>
        </select>
        <div className="view-buttons">
          <button onClick={() => setView('list')}>List View</button>
          <button onClick={() => setView('table')}>Table View</button>
        </div>
      </div>

      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <div key={group}>
          {group && (
            <h3>
              {group}
              <button onClick={() => toggleGroup(group)}>
                {expandedGroups[group] ? 'Collapse' : 'Expand'}
              </button>
              <button onClick={() => onAddGroup(fruits)} style={{ marginLeft: '10px' }}>
                Add All
              </button>
            </h3>
          )}
          {expandedGroups[group] && (
            view === 'list' ? (
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
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default FruitList;
