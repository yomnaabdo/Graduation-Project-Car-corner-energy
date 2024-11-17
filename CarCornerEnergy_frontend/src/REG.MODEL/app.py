from flask import Flask, render_template, request
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = joblib.load('C:\Users\YOMNA\Documents\projects\CarCornerEnergy_frontend\src\REG.MODEL\Model.pkl')

# Load the dataset and get dummy variables for categorical columns
df = pd.read_csv(r"C:\Users\YOMNA\Documents\projects\CarCornerEnergy_frontend\src\REG.MODEL\training_data.csv")
df_encoded = pd.get_dummies(df, columns=['drive_type', 'Make', 'Model'], drop_first=True)

# Define X_train (training data) based on the encoded DataFrame
X_train = df_encoded.drop(columns=['energy_consumption'])

@app.route('/')
def home():
    return render_template('C:\Users\YOMNA\Documents\projects\CarCornerEnergy_frontend\src\REG.MODEL\EnergyConsumptionPrediction.js')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Extract user inputs from the form
        make = request.form['make']
        model_name = request.form['model']
        distance = float(request.form['distance'])  # Convert to float
        
        # Check if distance is 0
        if distance == 0:
            return render_template('C:\Users\YOMNA\Documents\projects\CarCornerEnergy_frontend\src\REG.MODEL\Result.js', energy_consumption=0)
        
        # Lookup data for the provided make and model
        user_input_data = df[(df['Make'] == make) & (df['Model'] == model_name)].iloc[0]
        
        # Extract features from the dataset
        drive_type = user_input_data['drive_type']
        perm_gross_weight = user_input_data['perm_gross_weight']
        power = user_input_data['power']
        battery_cap = user_input_data['battery_cap']

        # Create user input DataFrame
        user_input = pd.DataFrame({
            'distance': [distance],
            'drive_type': [drive_type],
            'perm_gross_weight': [perm_gross_weight],
            'power': [power],
            'battery_cap': [battery_cap]
        })

        # Encode user input
        user_input_encoded = pd.get_dummies(user_input, columns=['drive_type'], drop_first=True)

        # Ensure all columns in training are present in user input
        missing_cols = set(X_train.columns) - set(user_input_encoded.columns)
        for col in missing_cols:
            user_input_encoded[col] = 0

        # Reorder columns to match the training data
        user_input_encoded = user_input_encoded[X_train.columns]

        # Make prediction
        energy_consumption = model.predict(user_input_encoded)[0]

        # Round to two decimal places
        energy_consumption = round(energy_consumption, 2)

        return render_template('C:\Users\YOMNA\Documents\projects\CarCornerEnergy_frontend\src\REG.MODEL\Result.js', energy_consumption=energy_consumption)

if __name__ == '__main__':
    app.run(debug=True)
