import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import TicketList from "../../components/ticket/ticket-list.component";

interface PlayerTicketScreenProps {
  navigation: any;
}

const PlayerTicketScreen = ({ navigation }: PlayerTicketScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Mes Tickets d'Événement</Text>
        <View style={styles.ticketListWrapper}>
          <TicketList />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PlayerTicketScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Fond neutre
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, // Espace en bas pour le scroll
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  ticketListWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
});
