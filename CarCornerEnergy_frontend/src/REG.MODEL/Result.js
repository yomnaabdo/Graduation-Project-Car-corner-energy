import React from 'react';

function Result({ energyConsumption }) {
  return (
    <div>
      <h2>Predicted Energy Consumption:</h2>
      <p>{energyConsumption} KWH</p>
    </div>
  );
}

export default Result;
