import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function HomeScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRoute = async () => {
    if (!origin || !destination) {
      Alert.alert('Error', 'Please enter both origin and destination');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.10.90.159:3000/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });

      const data = await response.json();

      if (response.ok) {
        setDistance(data.distance);    // meters
        setDuration(data.duration);    // seconds
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch route');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Bot</Text>

      <TextInput
        style={styles.input}
        placeholder="Origin city"
        value={origin}
        onChangeText={setOrigin}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination city"
        value={destination}
        onChangeText={setDestination}
      />

      <Button title={loading ? 'Loading...' : 'Get Route'} onPress={getRoute} disabled={loading} />

      {distance !== null && duration !== null && (
        <View style={styles.result}>
          <Text>Distance: {(distance / 1000).toFixed(2)} km</Text>
          <Text>Duration: {(duration / 60).toFixed(2)} minutes</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  result: { marginTop: 20, alignItems: 'center' },
});
