import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

interface PlayerProfileScreenProps {
    navigation: any;
}

const PlayerProfileScreen = ({ navigation }: PlayerProfileScreenProps) => {
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

export default PlayerProfileScreen;
