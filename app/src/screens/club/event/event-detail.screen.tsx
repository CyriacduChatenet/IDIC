import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventService from "../../../services/event.service";
import { Event } from "../../../types/event.type";
import dateFormat from "../../../utils/date-format.util";

const EventDetailScreen = () => {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const route = useRoute();
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Désolé, événement introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.eventName}>{data.name}</Text>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#6F6F6F" />
            <Text style={styles.infoText}>{dateFormat(data.date as Date)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#6F6F6F" />
            <Text style={styles.infoText}>{data.club.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color="#6F6F6F" />
            <Text style={styles.infoText}>
              Participants : {data.tickets.length} / {data.team_size}
            </Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{data.description || "Pas de description disponible."}</Text>
        </View>

      </View>
    </ScrollView>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#F2F2F7",
  },
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6F6F6F",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
  },
  headerContainer: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#111",
    flexShrink: 1,
  },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111",
  },
  descriptionText: {
    fontSize: 16,
    color: "#3C3C43",
    lineHeight: 22,
  },
});
