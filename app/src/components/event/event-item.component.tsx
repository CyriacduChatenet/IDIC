import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 💡 Ajout des icônes
import dateFormat from "../../utils/date-format.util";

interface EventItemProps {
  name: string;
  date: Date;
  address: string;
  navigation: any;
  id: string;
}

const EventItem = ({ name, date, address, id, navigation }: EventItemProps) => {
  const formattedDate = dateFormat(date);

  return (
    <TouchableOpacity
      style={styles.cardContainer} // Applique le style de carte ici
      onPress={() => navigation.navigate("EventDetail", { id: id })}
      activeOpacity={0.7} // Réduction de l'opacité au toucher
    >
      <View style={styles.cardContent}>
        {/* 1. NOM DE L'ÉVÉNEMENT (Titre principal) */}
        <Text style={styles.eventName}>{name}</Text>
        
        {/* 2. CONTENEUR DES INFOS (Date & Adresse) */}
        <View style={styles.infoContainer}>
            
          {/* 2a. Date */}
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#007AFF" />
            <Text style={styles.detailText}>{formattedDate}</Text>
          </View>
            
          {/* 2b. Adresse */}
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#333" />
            <Text style={styles.detailText}>{address}</Text>
          </View>
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  cardContainer: {
    // 💡 Style de la carte : fond, marges et ombres
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 8,
    // Ombre légère pour effet de profondeur (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Élévation pour Android
    elevation: 3, 
  },
  cardContent: {
    padding: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espacement entre date et adresse
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0', // Séparateur subtil
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default EventItem;