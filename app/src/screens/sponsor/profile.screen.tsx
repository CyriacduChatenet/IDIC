import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

interface SponsorProfileScreenProps {
    navigation: any;
}

const SponsorProfileScreen = ({ navigation }: SponsorProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Profile view!</Text>
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

export default SponsorProfileScreen;
