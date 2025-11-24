import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import React from "react";

interface PlayerProfileScreenProps {
  navigation: any;
}

// Données mockées
const MOCK_PLAYER_DATA = {
  id: "player123",
  firstName: "Maxime",
  lastName: "Durand",
  username: "Maximus_Prime",
  rank: "Diamant III",
  mainClub: "Club des Champions du Samedi",
  bio: "Joueur passionné et compétitif. Toujours prêt pour un défi. Spécialiste des fins de match sous pression.",
  matchPlayed: 87,
  winRate: 68,
};

const BASE_CARD_STYLE = {
  backgroundColor: "#fff",
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
  elevation: 2,
  marginBottom: 20,
};

const PlayerProfileScreen = ({ navigation }: PlayerProfileScreenProps) => {
  const player = MOCK_PLAYER_DATA;
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#CC6E31" style={styles.profileIcon} />
          <Text style={styles.playerName}>{player.firstName} {player.lastName}</Text>
          <Text style={styles.username}>@{player.username}</Text>
          <View style={styles.rankBadge}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.rankText}>{player.rank}</Text>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{player.matchPlayed}</Text>
            <Text style={styles.statLabel}>Matchs Joués</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{player.winRate}%</Text>
            <Text style={styles.statLabel}>Taux de Victoire</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bio & Infos</Text>
          <Text style={styles.bioText}>{player.bio}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="shield-outline" size={18} color="#CC6E31" />
            <Text style={styles.infoLabel}>Club Principal : </Text>
            <Text style={styles.infoValue}>{player.mainClub}</Text>
          </View>
        </View>

        {/* Historique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des Performances</Text>
          <Text style={styles.placeholderText}>Historique des matchs à venir...</Text>
        </View>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PlayerProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    padding: 20,
  },

  // Header
  headerContainer: {
    ...BASE_CARD_STYLE,
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 15,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  rankBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CC6E3115",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#CC6E31",
    marginLeft: 5,
  },

  // Statistiques
  statsContainer: {
    ...BASE_CARD_STYLE,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FF3B30",
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

  // Bio
  card: {
    ...BASE_CARD_STYLE,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 15,
    color: "#555",
    fontWeight: "400",
  },

  // Historique
  section: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  // Déconnexion
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
