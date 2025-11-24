import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/auth/login.screen";
import RegisterScreen from "../../screens/auth/register.screen";
import PaymentScreen from "../../screens/payment/payment.screen";
import ForgotPasswordScreen from "../../screens/auth/forgot-password.screen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {/* headerShown: false pour une apparence sans barre de titre par défaut */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
