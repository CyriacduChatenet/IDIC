import { StripeProvider } from "@stripe/stripe-react-native";

import Router from "./router";

const App = () => {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
      <Router />
    </StripeProvider>
  );
};

export default App;