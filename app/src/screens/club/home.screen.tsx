import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import EventList from "../../components/event/event-list.component";

interface ClubHomeScreenProps {
    navigation: any;
}

const ClubHomeScreen = ({ navigation }: ClubHomeScreenProps) => {
  return (
    // 💡 1. Utilisation de SafeAreaView pour gérer la barre de statut et les encoches
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 💡 2. Section d'en-tête stylisée (simule le header) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tableau de Bord du Club</Text>
          <Text style={styles.subtitle}>Vos événements récents et à venir.</Text>
        </View>

        {/* 3. Le contenu principal (la liste d'événements) */}
        <View style={styles.contentArea}>
          <Text style={styles.listTitle}>Événements Actifs</Text>
          {/* Le composant EventList a été intégré dans une zone de contenu scrollable/flexible */}
          <EventList navigation={navigation} /> 
        </View>
        
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

// --- STYLESHEET AMÉLIORÉ ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Couleur de fond du corps
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", 
  },
  header: {
    backgroundColor: '#ffffff', // Fond blanc du "header"
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    // Ombre légère pour effet de profondeur
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 15, // Marge sur les côtés de la zone de liste
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
    marginTop: 5,
  }
});

export default ClubHomeScreen;