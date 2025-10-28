import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pour de belles icônes
import React, { useState } from "react"; // 💡 Assurez-vous d'importer React
import { useAuth } from "../../context/authContext";
import AuthService from "../../services/auth.service";

interface ClubProfileScreenProps {
    navigation: any;
}

// Définition du style de carte de base pour la réutilisation sans erreur de bloc-scoped
const BASE_CARD_STYLE = {
    backgroundColor: '#ffffff',
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

  const [openPicker, setOpenPicker] = useState(false);
  const authService = new AuthService();
  
  // Fonction de déconnexion (simulée)
  const handleLogout = () => {
    console.log("Déconnexion de l'utilisateur...");

    authService.logout(user?.email as string);
    
    logout();
    // 1. Logique d'authentification (ex: await signOut(auth))
    
    // 2. Navigation vers l'écran de connexion/initial
    // navigation.navigate('AuthStack'); // Remplacez par votre route de connexion
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        {/* 1. SECTION EN-TÊTE DU PROFIL */}
        <View style={styles.headerContainer}>
          <Ionicons name="shield-half-outline" size={80} color="#007AFF" style={styles.profileIcon} />
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.address}>{club.address}</Text>
        </View>

        {/* 2. CARTE DE DESCRIPTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>À Propos du Club</Text>
          <Text style={styles.descriptionText}>{club.description}</Text>
        </View>

        {/* 3. CARTE DES STATISTIQUES */}
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
        
        {/* 5. BOUTON DE DÉCONNEXION (Corrigé et Stylisé) */}
        <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
        >
            {/* Taille de l'icône réduite à 20 */}
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>


      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    padding: 20,
  },
  
  // --- HEADER ---
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
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
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  
  // --- CARTES GÉNÉRALES ---
  card: {
    ...BASE_CARD_STYLE,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  
  // --- STATISTIQUES ---
  statsContainer: {
    ...BASE_CARD_STYLE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  separator: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  
  // --- ACTIONS ---
  actionSection: {
    marginBottom: 20,
  },
  actionContainer: {
    ...BASE_CARD_STYLE,
    marginBottom: 0,
    padding: 15,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },

  // --- NOUVEAUX STYLES DE DÉCONNEXION (Réduction de la taille et rouge adouci) ---
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D32F2F', // Rouge moins agressif (Material Deep Orange)
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
    color: '#FFFFFF',
    fontSize: 16, // Taille de police réduite
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutIcon: {}
});

export default ClubProfileScreen;