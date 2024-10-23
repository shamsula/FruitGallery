import React, { useState } from 'react';
import useFruits, { Fruit } from './hooks/useFruits';
import FruitList from './components/FruitList';
import Jar from './components/Jar';

const App: React.FC = () => {
  const { fruits, loading, error } = useFruits();
  const [jar, setJar] = useState<Fruit[]>([]);

  const addFruitToJar = (fruit: Fruit) => {
    setJar((prevJar) => [...prevJar, fruit]);
  };

  const addGroupToJar = (group: Fruit[]) => {
    setJar((prevJar) => [...prevJar, ...group]);
  };

  return (
    <div className="App" style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <FruitList
            fruits={fruits}
            onAddFruit={addFruitToJar}
            onAddGroup={addGroupToJar}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <Jar fruits={jar} />
      </div>
    </div>
  );
};

export default App;
