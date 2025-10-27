import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* ✅ Utilisation des tuiles OpenStreetMap */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {/* Exemple de marqueur */}
        <Marker
          coordinate={{ latitude: 48.8566, longitude: 2.3522 }}
          title="Paris"
          description="Capitale de la France"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
