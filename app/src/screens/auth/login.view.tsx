import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const LoginView = () => {
  return (
    <View style={styles.container}>
      <Text>Login view!</Text>
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

export default LoginView;
