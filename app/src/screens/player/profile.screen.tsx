import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pour les icônes
import { useAuth } from "../../context/authContext";

interface PlayerProfileScreenProps {
  navigation: any;
}

// 💡 Données mockées du joueur (à remplacer par les données réelles)
const MOCK_PLAYER_DATA = {
  id: "player123",
  firstName: "Maxime",
  lastName: "Durand",
  username: "Maximus_Prime",
  rank: "Diamant III",
  mainClub: "Club des Champions du Samedi",
  bio: "Joueur passionné et compétitif. Toujours prêt pour un défi. Spécialiste des fins de match sous pression.",
  matchPlayed: 87,
  winRate: 68, // Pourcentage
};

const PlayerProfileScreen = ({ navigation }: PlayerProfileScreenProps) => {
  const player = MOCK_PLAYER_DATA;
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Déconnexion de l'utilisateur...");
    logout();
    navigation.navigate("Login");
    // 1. Logique d'authentification (ex: await signOut(auth))

    // 2. Navigation vers l'écran de connexion/initial
    // navigation.navigate('AuthStack'); // Remplacez par votre route de connexion
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 1. SECTION EN-TÊTE ET NOM */}
        <View style={styles.headerContainer}>
          {/* Icône de profil */}
          <Ionicons
            name="person-circle-outline"
            size={100}
            color="#007AFF"
            style={styles.profileIcon}
          />

          <Text style={styles.playerName}>
            {player.firstName} {player.lastName}
          </Text>
          <Text style={styles.username}>@{player.username}</Text>
          <View style={styles.rankBadge}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.rankText}>{player.rank}</Text>
          </View>
        </View>

        {/* 2. CARTE DES STATISTIQUES CLÉS */}
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

        {/* 3. CARTE BIOGRAPHIE */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bio & Infos</Text>
          <Text style={styles.bioText}>{player.bio}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="shield-outline" size={18} color="#007AFF" />
            <Text style={styles.infoLabel}>Club Principal : </Text>
            <Text style={styles.infoValue}>{player.mainClub}</Text>
          </View>
        </View>

        {/* 4. SECTION HISTORIQUE (Future section pour les matchs/tournois) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des Performances</Text>
          {/* Ici, vous pourriez mapper une liste de matchs ou de tournois */}
          <Text style={styles.placeholderText}>
            Historique des matchs à venir...
          </Text>
        </View>

        {/* 5. BOUTON DE DÉCONNEXION (Corrigé et Stylisé) */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          {/* Taille de l'icône réduite à 20 */}
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#FFFFFF"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

// 💡 Style de carte de base pour la cohérence
const BASE_CARD_STYLE = {
  backgroundColor: "#ffffff",
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
  elevation: 2,
  marginBottom: 20,
};

// --- STYLESHEET AMÉLIORÉ ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Fond clair
  },
  container: {
    padding: 20,
  },

  // --- 1. HEADER ---
  headerContainer: {
    ...BASE_CARD_STYLE,
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 10,
    shadowOffset: { width: 0, height: 2 }, // Ombre plus marquée pour le header
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 15,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#007AFF15", // Fond très clair
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginLeft: 5,
  },

  // --- 2. STATS ---
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
    fontWeight: "bold",
    color: "#FF3B30", // Couleur d'accentuation (Rouge/Performance)
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

  // --- 3. CARTE GÉNÉRALE (Bio) ---
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

  // --- 4. SECTION GÉNÉRIQUE ---
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
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },

  // --- NOUVEAUX STYLES DE DÉCONNEXION (Réduction de la taille et rouge adouci) ---
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D32F2F", // Rouge moins agressif (Material Deep Orange)
    borderRadius: 8,
    paddingVertical: 10, // Réduction du padding vertical
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
    color: "#FFFFFF",
    fontSize: 16, // Taille de police réduite
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutIcon: {},
});

export default PlayerProfileScreen;
