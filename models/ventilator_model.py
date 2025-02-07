import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import time

# Dataset
data = pd.DataFrame({
    'Tidal_Volume': [450, 500, 480, 600, 550, 650, 955, 700, 300, 800],
    'Respiratory_Rate': [16, 18, 14, 20, 19, 10, 17, 30, 5, 35],
    'Peak_Pressure': [25, 28, 22, 30, 27, 10, 16, 50, 15, 45],
    'FiO2': [50, 45, 40, 55, 52, 15, 51, 70, 10, 80],
    'Temperature': [34, 36, 35, 37, 33, 10, 36, 45, 10, 50],
    'Humidity': [50, 45, 48, 55, 60, 10, 50, 120, 5, 150],
    'Time': [0, 0, 0, 0, 0, 3, 7, 2, 10, 6]
})

# Normalizing the features (excluding 'Time' column)
scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data.drop(columns='Time'))

# Function to create sequences for LSTM model
def create_sequences(data, seq_length=3):
    sequences = []
    labels = []
    for i in range(len(data) - seq_length):
        sequences.append(data[i:i+seq_length])
        labels.append(data[i+seq_length])  # Predict the next step
    return np.array(sequences), np.array(labels)

# Prepare sequences
X, y = create_sequences(data_scaled)

# Build the LSTM model
model = Sequential()
model.add(LSTM(64, activation='relu', input_shape=(X.shape[1], X.shape[2])))
model.add(Dense(32, activation='relu'))
model.add(Dense(X.shape[2]))  # Output should match the number of features (parameters)

model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit(X, y, epochs=10, batch_size=1, verbose=1)

# Normal range for each parameter (example ranges for alert generation)
normal_ranges = {
    'Tidal_Volume': (400, 700),
    'Respiratory_Rate': (12, 20),
    'Peak_Pressure': (20, 30),
    'FiO2': (40, 60),
    'Temperature': (35, 40),
    'Humidity': (30, 70)
}

# Real-time monitoring function with LSTM alert generation
def real_time_monitor_with_lstm_alerts(data, model, normal_ranges, seq_length=3):
    data_index = seq_length  # Start after the sequence length
    
    while data_index < len(data):
        # Create the sequence for prediction
        sequence = data.iloc[data_index-seq_length:data_index].drop(columns='Time').values
        sequence_scaled = scaler.transform(sequence)  # Scale the sequence

        # Predict the next parameter values using the LSTM model
        predicted_values = model.predict(sequence_scaled.reshape(1, seq_length, -1))

        # Inverse scale the predicted values
        predicted_values = scaler.inverse_transform(predicted_values)

        # Check normality and alerts
        parameter_values = predicted_values[0]
        out_of_range_parameters = []
        
        for i, param in enumerate(data.columns[:-1]):  # Exclude 'Time' column
            min_val, max_val = normal_ranges[param]
            value = parameter_values[i]
            is_out_of_range = not (min_val <= value <= max_val)
            
            # Debugging: Print parameter value and range
            print(f"Predicted {param}: Value = {value}, Range = {min_val}-{max_val}, Out of range: {is_out_of_range}")

            if is_out_of_range:
                out_of_range_parameters.append(param)

        # Handle the output based on the conditions
        if out_of_range_parameters:
            status = 'Malfunction'
            print(f"Malfunction detected for the following parameters: {', '.join(out_of_range_parameters)}")
            if data.iloc[data_index]['Time'] <= 5:
                print(f"Malfunction due to parameters: {', '.join(out_of_range_parameters)} (Time <= 5)")
            else:
                print(f"ALERT! Malfunction persisted for more than 5 seconds for parameters: {', '.join(out_of_range_parameters)}")
        else:
            if data.iloc[data_index]['Time'] < 5:
                print("Normal working.")
            else:
                print("Normal working.")

        data_index += 1
        time.sleep(1)  # Simulate real-time monitoring with a delay

    print("No more data to show.")

# Start real-time monitoring with LSTM-based alerts
real_time_monitor_with_lstm_alerts(data, model, normal_ranges)

#------------------------------------------------# 22/11/24---------------------------------------

# cell 1 start

# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

# import numpy as np # linear algebra
# import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# # Input data files are available in the read-only "../input/" directory
# # For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

# import os
# for dirname, _, filenames in os.walk('/kaggle/input'):
#     for filename in filenames:
#         print(os.path.join(dirname, filename))

# # You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All" 
# # You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session

# #cell 1 end

# # cell 2 start

# import pandas as pd

# # Load the dataset
# data = pd.read_csv('/kaggle/input/hundred-values/ventilator_training_dataset.csv')  # Adjust the filename if needed
# print(data.head())  # Display the first few rows of the dataset

#cell 2 end

# # cell 3 start (Algo)

# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler, LabelEncoder
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Dropout, Input
# from sklearn.metrics import confusion_matrix, classification_report

# # 1. Load the dataset
# # data = pd.read_csv('/kaggle/input/ventilatot-data/ventilator_training_dataset.csv')  # Adjust the filename if needed
# print(data.head())  # Display the first few rows of the dataset

# # 2. Data Preprocessing
# # Separate features and labels
# X = data.drop('Label', axis=1).values  # Features (adjust column name if needed)
# y = data['Label'].values  # Labels

# # Encode the labels
# label_encoder = LabelEncoder()
# y = label_encoder.fit_transform(y)

# # Split the dataset into training and test sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Standardize the features
# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.transform(X_test)

# # 3. Build the Neural Network model
# model = Sequential()
# model.add(Input(shape=(X_train.shape[1],)))  # Use Input layer
# model.add(Dense(64, activation='relu'))
# model.add(Dropout(0.5))  # Adding dropout layer for regularization
# model.add(Dense(32, activation='relu'))
# model.add(Dropout(0.5))  # Adding another dropout layer for regularization
# model.add(Dense(1, activation='sigmoid'))  # Output layer for binary classification

# # Compile the model
# model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# # 4. Train the model
# history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.1)

# # 5. Evaluate the model
# loss, accuracy = model.evaluate(X_test, y_test)
# print(f'Model Loss: {loss}, Model Accuracy: {accuracy}')

# # 6. Make predictions
# predictions = (model.predict(X_test) > 0.5).astype("int32")

# # 7. Display the results as "Normal" or "Malfunction"
# num_samples_to_display = min(5, len(predictions))  # Get the minimum of 5 or the number of predictions
# for i in range(num_samples_to_display):
#     result = label_encoder.inverse_transform(predictions.flatten())[i]
#     actual = label_encoder.inverse_transform(y_test)[i]
#     print(f'Test Sample {i}: Predicted: {result}, Actual: {actual}')

# # 8. Confusion Matrix and Classification Report
# cm = confusion_matrix(y_test, predictions)
# cr = classification_report(y_test, predictions)
# print("Confusion Matrix:\n", cm)
# print("Classification Report:\n", cr)

# # 9. Alert Generation based on prolonged parameter changes
# def generate_alerts(data):
#     # Simulating a scenario where data is a DataFrame with parameter values and their corresponding labels
#     # We assume that data is sorted by time (or some sequential index)
#     # Create a list to keep track of the alert statuses
#     alerts = []

#     for index in range(1, len(data)):
#         current_reading = data.iloc[index]
#         previous_reading = data.iloc[index - 1]

#         # Check for malfunction condition
#         if current_reading['Label'] == 'Malfunction':
#             # Check if the previous 5 readings (which could represent time) are also Malfunction
#             if index >= 5 and all(data['Label'].iloc[index-5:index] == 'Malfunction'):
#                 alert_message = (f"Alert! Malfunction detected at sample {index} "
#                                  f"with parameters: {current_reading[:-1].to_dict()}")
#                 alerts.append(alert_message)

#     return alerts

# # Generate alerts based on the dataset
# alerts = generate_alerts(data)

# # Print alerts if any
# for alert in alerts:
#     print(alert)

# # cell 3 end (Algo)

# #cell 3 start (algo)

# import pandas as pd
# from sklearn.preprocessing import StandardScaler
# import time

# # Load the dataset
# # data = pd.read_csv('/kaggle/input/five-five-values/ventilator_data.csv')  # Adjust the filename if needed
# print(data.head())  # Display the first few rows of the dataset

# # Preprocess the dataset
# X = data.drop(columns='Time').values  # Features (excluding Time)
# time_values = data['Time'].values  # Time values

# # Standardize the features
# scaler = StandardScaler()
# X = scaler.fit_transform(X)

# # Normal ranges for parameters
# normal_ranges = {
#     'Tidal_Volume': (400, 600),  # Normal range for Tidal Volume (mL)
#     'Respiratory_Rate': (12, 20),  # Normal range for Respiratory Rate (breaths/min)
#     'Peak_Pressure': (15, 30),  # Normal range for Peak Pressure (cm H₂O)
#     'FiO2': (21, 55),  # Normal range for FiO2 (%)
#     'Temperature': (20, 37),  # Normal range for Temperature (°C)
#     'Humidity': (20, 100)  # Normal range for Humidity (%)
# }

# # Real-time monitoring function with alert system
# def real_time_monitor_with_alerts(data, scaler, normal_ranges):
#     data_index = 0

#     while data_index < len(data):
#         new_data_point = data.iloc[data_index]
#         features = new_data_point.drop('Time').values.reshape(1, -1)  # Exclude Time from features
#         parameter_values = new_data_point.drop('Time').to_dict()

#         # Check normality and alerts
#         out_of_range_parameters = []
#         for param, value in parameter_values.items():
#             if param in normal_ranges:
#                 min_val, max_val = normal_ranges[param]
#                 is_out_of_range = not (min_val <= value <= max_val)

#                 # Debugging: Print parameter value and range
#                 print(f"Checking {param}: Value = {value}, Range = {min_val}-{max_val}, Out of range: {is_out_of_range}")

#                 if is_out_of_range:
#                     out_of_range_parameters.append(param)

#         # Handle the output based on the conditions
#         if out_of_range_parameters:
#             status = 'Malfunction'
#             print(f"Malfunction detected for the following parameters: {', '.join(out_of_range_parameters)}")

#             if new_data_point['Time'] <= 5:
#                 print(f"Malfunction due to parameters: {', '.join(out_of_range_parameters)} (Time <= 5)")
#             else:
#                 print(f"ALERT! Malfunction persisted for more than 5 seconds for parameters: {', '.join(out_of_range_parameters)}")
#         else:
#             if new_data_point['Time'] < 5:
#                 print("Normal working.")
#             else:
#                 print("Normal working.")

#         data_index += 1
#         time.sleep(1)  # Simulate real-time monitoring with a delay

#     print("No more data to show.")

# # Start real-time monitoring with alerts
# real_time_monitor_with_alerts(data, scaler, normal_ranges)

# #cell 3 end (algo)
