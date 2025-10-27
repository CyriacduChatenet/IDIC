import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

import PaymentView from "./views/payment/payment.view";
import Router from "./Router";

const App = () => {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
      <Router />
    </StripeProvider>
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

export default App;
