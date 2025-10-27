import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Map from "../../components/map/map.component";

interface PlayerMapScreenProps {
    navigation: any;
}

const PlayerMapScreen = ({ navigation }: PlayerMapScreenProps) => {
  return (
    <View style={styles.container}>
      {/* <Text>Map view!</Text> */}
      <Map />
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

export default PlayerMapScreen;
