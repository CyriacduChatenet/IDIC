import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import TicketList from "../../components/ticket/ticket-list.component";

interface PlayerTicketScreenProps {
    navigation: any;
}

const PlayerTicketScreen = ({ navigation }: PlayerTicketScreenProps) => {
  return (
    <View style={styles.container}>
      <TicketList />
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

export default PlayerTicketScreen;
