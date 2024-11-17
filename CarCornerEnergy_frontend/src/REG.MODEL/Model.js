import React, { useState } from 'react';
import EnergyConsumptionPrediction from './EnergyConsumptionPrediction';
import Result from './Result';

function Model() {
  const [energyConsumption, setEnergyConsumption] = useState(null);

  // Function to handle form submission and prediction
  const handlePrediction = async (formData) => {
    // Make POST request to /predict endpoint with form data
    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setEnergyConsumption(data.energy_consumption);
  };

  return (
    <div>
      <EnergyConsumptionPrediction onSubmit={handlePrediction} />
      {energyConsumption && <Result energyConsumption={energyConsumption} />}
    </div>
  );
}

export default Model;
