import React, { useState, useRef } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { useStripePayment } from "../../hooks/payment.hook";

// --- DONNÉES DE CLUBS DE FOOT À BORDEAUX ---
const markersData = [
  {
    id: 1,
    title: "Tournoi FC Libourne",
    description: "Club historique en Libournais",
    latitude: 44.9189,
    longitude: -0.2372,
    color: "rouge",
  },
  {
    id: 2,
    title: "Tournoi FC Bassin d'Arcachon",
    description: "Club du Sud-Ouest Gironde",
    latitude: 44.647,
    longitude: -1.163,
    color: "orange",
  },
  {
    id: 3,
    title: "Tournoi SA Mérignac",
    description: "Section Football du Sport Athlétique Mérignacais",
    latitude: 44.8385,
    longitude: -0.6558,
    color: "vert",
  },
  {
    id: 4,
    title: "Tournoi SAG Cestas",
    description: "Club de la banlieue sud-ouest de Bordeaux",
    latitude: 44.7551,
    longitude: -0.6385,
    color: "jaune",
  },
  {
    id: 5,
    title: "Tournoi FC Saint-Médard-en-Jalles",
    description: "Club de l'Ouest de la métropole",
    latitude: 44.891,
    longitude: -0.7397,
    color: "bleu_marine",
  },
  {
    id: 6,
    title: "Tournoi US Lège Cap Ferret",
    description: "Club de la presqu'île",
    latitude: 44.767,
    longitude: -1.2465,
    color: "marine",
  },
  {
    id: 7,
    title: "Tournoi Jeunesse Villenavaise",
    description: "Club de Villenave-d'Ornon",
    latitude: 44.782,
    longitude: -0.548,
    color: "cyan",
  },
  {
    id: 8,
    title: "Tournoi Coqs Rouges de Bordeaux",
    description: "Club omnisports de Bordeaux (Bastide)",
    latitude: 44.838,
    longitude: -0.551,
    color: "grenat",
  },
  {
    id: 9,
    title: "Tournoi FC Portes Entre 2 Mers",
    description: "Club de l'Entre-deux-Mers",
    latitude: 44.757,
    longitude: -0.329,
    color: "bordeaux",
  },
  {
    id: 10,
    title: "Tournoi ES Bruges Football",
    description: "Club de l'agglomération bordelaise",
    latitude: 44.896,
    longitude: -0.613,
    color: "blanc",
  },
];

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 44.837789,
    longitude: -0.57918,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });
  const { loading: paymentLoading, openPaymentSheet } = useStripePayment(
    1000,
    "eur"
  );

  const mapRef = useRef(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
    // Centrer la carte sur le marker sélectionné
    mapRef.current.animateToRegion(
      {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      500
    );
  };

  const zoomIn = () => {
    mapRef.current.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      },
      300
    );
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    mapRef.current.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      },
      300
    );
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  const handlePayment = () => {
    return openPaymentSheet();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={region}
        zoomEnabled={true} // ⬅️ zoom via pinches
        scrollEnabled={true} // ⬅️ permet de bouger la carte
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {markersData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.color}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {/* --- BOUTONS DE ZOOM --- */}
      <View style={styles.zoomButtons}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* --- MODALE --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMarker && (
              <>
                <Text style={styles.modalTitle}>{selectedMarker.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedMarker.description}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#CC6E31" }]}
                    onPress={() => handlePayment()}
                  >
                    <Text style={styles.buttonText}>Participer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#fff",
                        borderColor: "#CC6E31",
                        borderWidth: 2,
                      },
                    ]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text
                      style={[
                        {
                          color: "#CC6E31",
                          fontSize: 18,
                          fontWeight: "600",
                          paddingHorizontal: 16,
                        },
                      ]}
                    >
                      Fermer
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  zoomButtons: {
    position: "absolute",
    right: 10,
    bottom: 50,
    justifyContent: "space-between",
    height: 100,
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CC6E31",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  zoomButtonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDescription: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
});

export default Map;