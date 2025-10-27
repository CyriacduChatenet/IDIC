import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

interface PlayerHomeScreenProps {
    navigation: any;
}

const PlayerHomeScreen = ({ navigation }: PlayerHomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Player home view!</Text>
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

export default PlayerHomeScreen;
