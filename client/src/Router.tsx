import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginView from './views/auth/login.view';

// Créer l'objet Stack
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home"
          component={LoginView} 
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;