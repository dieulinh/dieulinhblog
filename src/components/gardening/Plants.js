import React from 'react';

function Plants() {
  const plants = [
    { id: 1, name: 'Rose' },
    { id: 2, name: 'Tulip' },
    { id: 3, name: 'Sunflower' },
    // Add more plants here
  ];

  return (
    <div>
      <h1>Plants</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>{plant.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Plants;