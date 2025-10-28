import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClubNavigator from "../navigator/club-navigator.component";
import EventDetailScreen from "../../screens/club/event/event-detail.screen";

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

      <Stack.Screen
        name="EventDetail" // Nom unique pour la navigation
        component={EventDetailScreen}
        options={{
          title: "Détails de l'Événement",
          // Cette option est généralement TRUE par défaut, mais la voici si vous en avez besoin :
          headerShown: true, // S'assure que l'en-tête est visible
        }}
      />

      {/* Vous pouvez ajouter ici d'autres écrans spécifiques à Club,
        accessibles depuis les onglets mais sans l'interface de navigation par onglets,
        par exemple: 
        <Stack.Screen name="ClubSettings" component={ClubSettingsScreen} />
      */}
    </Stack.Navigator>
  );
};

export default ClubStack;
