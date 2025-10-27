import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SponsorNavigator from "../navigator/sponsor-navigator.component";

const Stack = createStackNavigator();

const SponsorStack = () => {
  return (
    <Stack.Navigator>
      {/* Le Tab Navigator (SponsorNavigator) devient l'écran principal du Stack.
        Les options headerShown: false permettent d'éviter un double en-tête
        si vous avez des headers dans SponsorNavigator.
      */}
      <Stack.Screen
        name="SponsorTabs"
        component={SponsorNavigator}
        options={{ headerShown: false }}
      />

      {/* Vous pouvez ajouter ici d'autres écrans spécifiques à Sponsor,
        accessibles depuis les onglets mais sans l'interface de navigation par onglets,
        par exemple: 
        <Stack.Screen name="SponsorSettings" component={SponsorSettingsScreen} />
      */}
    </Stack.Navigator>
  );
};

export default SponsorStack;
