import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
      style={styles.card}
      onPress={() => navigation.navigate("EventDetail", { id })}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>

        {/* Titre de l'événement */}
        <Text style={styles.eventName}>{name}</Text>

        {/* Infos */}
        <View style={styles.infoSection}>

          {/* Date */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#6F6F6F" />
            <Text style={styles.infoText}>{formattedDate}</Text>
          </View>

          {/* Adresse */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#6F6F6F" />
            <Text style={styles.infoText}>{address}</Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;

/* ---------------- APPLE STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,

    // Ombre douce façon Apple
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardContent: {
    padding: 18,
  },

  eventName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginBottom: 10,
  },

  infoSection: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 12,
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },
});
