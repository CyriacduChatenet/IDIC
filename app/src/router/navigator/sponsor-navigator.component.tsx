import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import SponsorHomeScreen from "../../screens/sponsor/home.screen";
import SponsorProfileScreen from "../../screens/sponsor/profile.screen";

const Tab = createBottomTabNavigator();

const SponsorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Événements") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Membres") {
            iconName = focused ? "people" : "people-outline";
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
        name="Home"
        component={SponsorHomeScreen}
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={SponsorProfileScreen}
        options={{ title: "Profil", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default SponsorNavigator;
