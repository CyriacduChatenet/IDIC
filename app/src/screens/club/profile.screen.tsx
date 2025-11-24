import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import AuthService from "../../services/auth.service";

interface ClubProfileScreenProps {
  navigation: any;
}

const BASE_CARD_STYLE = {
  backgroundColor: "#fff",
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
  elevation: 2,
};

const MOCK_CLUB_DATA = {
  name: "Club des Champions du Samedi",
  address: "123 Rue de la Victoire, 75001 Paris",
  description: "Le club de référence pour les tournois hebdomadaires et les événements communautaires.",
  memberCount: 45,
  foundedYear: 2018,
};

const ClubProfileScreen = ({ navigation }: ClubProfileScreenProps) => {
  const club = MOCK_CLUB_DATA;
  const { logout, user } = useAuth();
  const authService = new AuthService();

  const handleLogout = () => {
    authService.logout(user?.email as string);
    logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="shield-half-outline" size={80} color="#CC6E31" style={styles.profileIcon} />
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.address}>{club.address}</Text>
        </View>

        {/* Carte Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>À Propos du Club</Text>
          <Text style={styles.descriptionText}>{club.description}</Text>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{club.memberCount}</Text>
            <Text style={styles.statLabel}>Membres</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{new Date().getFullYear() - club.foundedYear}</Text>
            <Text style={styles.statLabel}>Ans d'existence</Text>
          </View>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ClubProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 10,
  },
  clubName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginVertical: 5,
  },
  address: {
    fontSize: 14,
    color: "#888",
  },
  card: {
    ...BASE_CARD_STYLE,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  statsContainer: {
    ...BASE_CARD_STYLE,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#CC6E31",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  separator: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
