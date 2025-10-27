import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/auth/login.screen";
import RegisterScreen from "./screens/auth/register.screen";
import ForgotPasswordScreen from "./screens/auth/forgot-password.screen";

// Créer l'objet Stack
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register", headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: "ForgotPassword", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
