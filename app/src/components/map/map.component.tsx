import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import { StyleSheet, View } from "react-native";

// --- DONNÉES DE TEST ---
const markersData = [
  {
    id: 1,
    title: "Tour Eiffel",
    description: "Point d'intérêt principal",
    latitude: 48.8584,
    longitude: 2.2945,
    color: "red", // 🔴 Premier marqueur en rouge
  },
  {
    id: 2,
    title: "Musée du Louvre",
    description: "Musée d'art célèbre",
    latitude: 48.8606,
    longitude: 2.3376,
    color: "blue", // 🔵 Deuxième marqueur en bleu
  },
  {
    id: 3,
    title: "Cathédrale Notre-Dame",
    description: "Île de la Cité",
    latitude: 48.8530,
    longitude: 2.3499,
    color: "green", // 🟢 Troisième marqueur en vert
  },
];
// -----------------------

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1, // Zoom initial
          longitudeDelta: 0.1, // Zoom initial
        }}
      >
        {/* ✅ Utilisation des tuiles OpenStreetMap */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {/* 💡 Rendu dynamique des marqueurs avec des couleurs */}
        {markersData.map((marker) => (
          <Marker
            key={marker.id} // Obligatoire lors du mapping
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            // 💡 C'est cette propriété qui définit la couleur du pin
            pinColor={marker.color} 
          />
        ))}
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