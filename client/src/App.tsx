import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

import PaymentView from "./views/payment/payment.view";

const App = () => {
  return (
    <StripeProvider
      publishableKey={Constants.manifest?.extra?.STRIPE_PUBLIC_KEY || "pk_test_51SFxlDB9ME6JuOdpQA4Tjw5OyrnLYTBiCT1JExy2IxZUh6X2ziMKmb3PoN6pPhYzHD0bC9uTgA7CiR45THta63dY00ojNb5UfY"}
    >
      <View style={styles.container}>
        <PaymentView/>
        <StatusBar style="auto" />
      </View>
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
