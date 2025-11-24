import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import EventList from "../../components/event/event-list.component";

interface ClubHomeScreenProps {
    navigation: any;
}

const ClubHomeScreen = ({ navigation }: ClubHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER APPLE */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tableau de Bord</Text>
          <Text style={styles.headerSubtitle}>Vos événements & activités</Text>
        </View>

        {/* CONTENT */}
        <ScrollView 
          contentContainerStyle={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Événements actifs</Text>

          <EventList navigation={navigation} />
        </ScrollView>

        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
};

export default ClubHomeScreen;

/* ---------------- APPLE STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F7", // Apple grey background
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },

  /* HEADER */
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    /* douce ombre iOS */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 15,
    color: "#6F6F6F",
    fontWeight: "500",
  },

  /* CONTENT */
  contentArea: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 15,
  },
});
