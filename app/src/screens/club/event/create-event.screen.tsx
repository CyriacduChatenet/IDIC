import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

interface ClubCreateEventScreenProps {
    navigation: any;
}

const ClubCreateEventScreen = ({ navigation }: ClubCreateEventScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Create event screen !</Text>
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
