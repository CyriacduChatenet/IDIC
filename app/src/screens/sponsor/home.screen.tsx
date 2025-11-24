import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Map from "../../components/map/map.component";

const SponsorHomeScreen = () => {
  return (
    <View style={styles.container}>
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

export default SponsorHomeScreen;
