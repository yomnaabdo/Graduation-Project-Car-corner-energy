import React from 'react';

function EnergyConsumptionPrediction() {
    return (
        <div style={{marginTop:"100px", marginBottom:"100px"}}>
            <div className="container mt-5">
                <h1 className="mb-4">Energy Consumption Prediction</h1>
                <form action="/predict" method="post">
                    <div className="form-group">
                        <label htmlFor="make">Make:</label>
                        <input type="text" className="form-control" id="make" name="make" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model:</label>
                        <input type="text" className="form-control" id="model" name="model" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="distance">Distance:</label>
                        <input type="number" className="form-control" id="distance" name="distance" step="0.01" required />
                    </div>
                    <button type="submit" className="btn btn-dark">Predict</button>
                </form>
            </div>
        </div>
    );
}

export default EnergyConsumptionPrediction;


