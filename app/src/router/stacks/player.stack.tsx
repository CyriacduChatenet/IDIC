import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PlayerNavigator from '../navigator/player-navigator.component';


const Stack = createStackNavigator();

const PlayerStack = () => {
  return (
    <Stack.Navigator>
            {/* Le Tab Navigator (PlayerNavigator) devient l'écran principal du Stack.
        Les options headerShown: false permettent d'éviter un double en-tête
        si vous avez des headers dans PlayerNavigator.
      */}
      <Stack.Screen 
        name="PlayerTabs" 
        component={PlayerNavigator} 
        options={{ headerShown: false }} 
      />
      
      {/* Vous pouvez ajouter ici d'autres écrans spécifiques à Player,
        accessibles depuis les onglets mais sans l'interface de navigation par onglets,
        par exemple: 
        <Stack.Screen name="PlayerSettings" component={PlayerSettingsScreen} />
      */}
    </Stack.Navigator>
  );
}

export default PlayerStack;