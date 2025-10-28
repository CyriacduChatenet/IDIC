import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import PlayerTicketScreen from "../../screens/player/ticket.screen";
import PlayerProfileScreen from "../../screens/player/profile.screen";
import PlayerMapScreen from "../../screens/player/map.screen";

const Tab = createBottomTabNavigator();

const PlayerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tickets") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // 🐛 CORRECTION: Retourne le composant d'icône réel
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Styles conservés
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
        headerStyle: { backgroundColor: "#f0f0f0" },
        headerTintColor: "#333",
        headerTitleStyle: { fontWeight: "bold" },
      })}
    >
      <Tab.Screen
        name="Map"
        component={PlayerMapScreen}
        options={{ title: "Carte", headerShown: false}}
      />
      <Tab.Screen
        name="Tickets"
        component={PlayerTicketScreen}
        options={{ title: "Billets", headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={PlayerProfileScreen}
        options={{ title: "Profil", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default PlayerNavigator;
