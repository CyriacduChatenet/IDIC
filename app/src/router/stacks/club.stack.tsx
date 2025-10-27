import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClubNavigator from '../navigator/club-navigator.component';


const Stack = createStackNavigator();

const ClubStack = () => {
  return (
    <Stack.Navigator>
      {/* Le Tab Navigator (ClubNavigator) devient l'écran principal du Stack.
        Les options headerShown: false permettent d'éviter un double en-tête
        si vous avez des headers dans ClubNavigator.
      */}
      <Stack.Screen 
        name="ClubTabs" 
        component={ClubNavigator} 
        options={{ headerShown: false }} 
      />
      
      {/* Vous pouvez ajouter ici d'autres écrans spécifiques à Club,
        accessibles depuis les onglets mais sans l'interface de navigation par onglets,
        par exemple: 
        <Stack.Screen name="ClubSettings" component={ClubSettingsScreen} />
      */}
    </Stack.Navigator>
  );
}

export default ClubStack;