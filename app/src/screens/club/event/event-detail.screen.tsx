import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventService from "../../../services/event.service";
import { Event } from "../../../types/event.type";
import dateFormat from "../../../utils/date-format.util";

const EventDetailScreen = () => {
  const [data, setData] = useState<Event | null>(null); // Initialisé à null
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  
  const route = useRoute();
  // Utilisation sécurisée de l'ID, assumant qu'il est toujours présent
  const { id } = route.params as { id: string };

  const eventService = new EventService();

  const getData = async (eventId: string) => {
    try {
      setIsLoading(true);
      const response = await eventService.findById(eventId);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  // --- RENDU DE CHARGEMENT ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Chargement des détails...</Text>
      </View>
    );
  }

  // --- RENDU SI AUCUNE DONNÉE ---
  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Désolé, événement introuvable.</Text>
      </View>
    );
  }

  // --- RENDU PRINCIPAL ---
  return (
    <View style={styles.container}>
      {/* 1. SECTION TITRE / NOM */}
      <View style={styles.headerContainer}>
        <Text style={styles.eventName}>{data.name}</Text>
      </View>

      {/* 2. CARTE D'INFORMATIONS */}
      <View style={styles.infoCard}>
        
        {/* Date */}
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#606060" />
          <Text style={styles.infoText}>
            {dateFormat(data.date as Date)}
          </Text>
        </View>

        {/* Adresse */}
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#606060" />
          <Text style={styles.infoText}>{data.club.address}</Text>
        </View>

        {/* Participants */}
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={20} color="#606060" />
          <Text style={styles.infoText}>
            Participants : {data.tickets.length} / {data.team_size}
          </Text>
        </View>
        
      </View>
      
      {/* Ajoutez ici d'autres sections (Description, Bouton Inscription, etc.) */}

    </View>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Fond légèrement gris
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Ombre Android
    shadowColor: '#000', // Ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  eventName: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default EventDetailScreen;