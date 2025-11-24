import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useAuth } from "../../context/authContext";
import Ionicons from "@react-native-vector-icons/ionicons";

interface SponsorProfileScreenProps {
  navigation: any;
}

// Données mockées pour un sponsor
const MOCK_SPONSOR_DATA = {
  id: "sponsor123",
  name: "TechCorp Solutions",
  username: "techcorp_official",
  industry: "Technologie & Services",
  bio: "Sponsor officiel de plusieurs clubs locaux, engagé dans le développement sportif et l’innovation technologique.",
  logoUrl: "https://via.placeholder.com/100", // logo sponsor
  campaigns: 12,
  activeSponsorships: 5,
  website: "https://www.techcorp.com",
  contactEmail: "contact@techcorp.com",
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

const SponsorProfileScreen = ({ navigation }: SponsorProfileScreenProps) => {
  const sponsor = MOCK_SPONSOR_DATA;
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
          <Image source={{ uri: sponsor.logoUrl }} style={styles.logo} />
          <Text style={styles.sponsorName}>{sponsor.name}</Text>
          <Text style={styles.username}>@{sponsor.username}</Text>
          <View style={styles.industryBadge}>
            <Ionicons name="business-outline" size={16} color="#CC6E31" />
            <Text style={styles.industryText}>{sponsor.industry}</Text>
          </View>
        </View>

        {/* Statistiques sponsor */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{sponsor.campaigns}</Text>
            <Text style={styles.statLabel}>Campagnes</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{sponsor.activeSponsorships}</Text>
            <Text style={styles.statLabel}>Sponsoring Actif</Text>
          </View>
        </View>

        {/* Bio & Infos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bio & Infos</Text>
          <Text style={styles.bioText}>{sponsor.bio}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="globe-outline" size={18} color="#CC6E31" />
            <Text style={styles.infoLabel}>Site web : </Text>
            <Text style={styles.infoValue}>{sponsor.website}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color="#CC6E31" />
            <Text style={styles.infoLabel}>Email : </Text>
            <Text style={styles.infoValue}>{sponsor.contactEmail}</Text>
          </View>
        </View>

        {/* Historique / Engagement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engagements & Sponsoring</Text>
          <Text style={styles.placeholderText}>
            Historique des clubs sponsorisés, événements ou campagnes à venir...
          </Text>
        </View>

        {/* Bouton Déconnexion */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 15,
  },
  sponsorName: {
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
  industryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CC6E3115",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  industryText: {
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

  // Bio & Infos
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

  // Historique / Engagement
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

export default SponsorProfileScreen;
