import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreateEventForm from "../../../components/event/create-event-form.component";

interface ClubCreateEventScreenProps {
    navigation: any;
}

const ClubCreateEventScreen = ({ navigation }: ClubCreateEventScreenProps) => {
  return (
    <View style={styles.container}>
      <CreateEventForm navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClubCreateEventScreen;
