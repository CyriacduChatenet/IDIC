import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import CreateEventForm from "../../../components/event/create-event-form.component";
import React from "react";

interface ClubCreateEventScreenProps {
  navigation: any;
}

const ClubCreateEventScreen = ({ navigation }: ClubCreateEventScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* TITRE */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Créer un nouvel Événement</Text>
          <Text style={styles.subtitle}>
            Remplissez les informations du tournoi ou de la rencontre.
          </Text>
        </View>

        {/* FORMULAIRE DANS UNE CARTE */}
        <View style={styles.formWrapper}>
          <CreateEventForm navigation={navigation} />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ClubCreateEventScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7", // Fond global style Apple
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#3C3C43",
    textAlign: "center",
    lineHeight: 22,
  },
  formWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
