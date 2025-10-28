import { StripeProvider } from "@stripe/stripe-react-native";

import Router from "./router";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </StripeProvider>
  );
};

export default App;
