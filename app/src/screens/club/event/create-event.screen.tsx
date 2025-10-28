import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import CreateEventForm from "../../../components/event/create-event-form.component";
import React from "react";

interface ClubCreateEventScreenProps {
    navigation: any;
}

const ClubCreateEventScreen = ({ navigation }: ClubCreateEventScreenProps) => {
  return (
    // 💡 1. Utilisation de SafeAreaView pour gérer les zones sûres
    <SafeAreaView style={styles.safeArea}>
        {/* 💡 2. Utilisation de ScrollView pour que le formulaire soit défilable */}
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer} // Styles appliqués au contenu
            keyboardShouldPersistTaps="handled" // Améliore l'interaction clavier/bouton
        >
            
            {/* 💡 3. Ajout d'un titre de page */}
            <Text style={styles.headerTitle}>Créer un nouvel Événement</Text>
            <Text style={styles.subtitle}>Remplissez les informations du tournoi ou de la rencontre.</Text>

            {/* 4. Le formulaire de création */}
            <View style={styles.formWrapper}>
                <CreateEventForm navigation={navigation} />
            </View>
            
        </ScrollView>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
};

// --- STYLESHEET AMÉLIORÉ ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Fond du dashboard
  },
  container: {
    flex: 1,
    // Le ScrollView prend toute la place
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Espace supplémentaire en bas pour le clavier/défilement
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  formWrapper: {
    // 💡 Optionnel: si vous voulez mettre le formulaire dans une "carte"
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  }
});

export default ClubCreateEventScreen;