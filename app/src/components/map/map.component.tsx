import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
      const [region, setRegion] = useState({
    latitude: 48.8566,         // Exemple : Paris
    longitude: 2.3522,
    latitudeDelta: 0.0922,     // Zoom vertical
    longitudeDelta: 0.0421,    // Zoom horizontal
  });

  // Quelques marqueurs
  const markers = [
    {
      key: '1',
      title: 'Point 1',
      description: 'Ceci est le premier point',
      coordinate: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
    },
    {
      key: '2',
      title: 'Point 2',
      description: 'Un autre endroit',
      coordinate: {
        latitude: 48.8606,
        longitude: 2.3376,
      },
    },
  ];

    return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}  // Utiliser Google Maps (optionnel)
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => {
          setRegion(newRegion);
        }}
      >
        {markers.map((m) => (
          <Marker
            key={m.key}
            coordinate={m.coordinate}
            title={m.title}
            description={m.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map