import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native"; // 💡 Ajout de SafeAreaView
import React from "react";

import TicketList from "../../components/ticket/ticket-list.component";

interface PlayerTicketScreenProps {
    navigation: any;
}

const PlayerTicketScreen = ({ navigation }: PlayerTicketScreenProps) => {
  return (
    // 💡 1. Utilisation de SafeAreaView
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.container}>
        {/* 💡 2. Ajout d'un titre de page pour le contexte */}
        <Text style={styles.headerTitle}>Mes Tickets d'Événement</Text>
        
        <TicketList />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0", // 💡 Fond de page neutre
  },
  container: {
    flex: 1,
    // Suppression de alignItems: "center" et justifyContent: "center"
    paddingHorizontal: 15, // Marge latérale pour le contenu
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 20, // Espace sous le titre
  },
});

export default PlayerTicketScreen;