import { NavigationContainer } from "@react-navigation/native";
import { Permission } from "../enum/permission.enum";
import AuthStack from "./stacks/auth.stack";
import PlayerStack from "./stacks/player.stack";
import ClubStack from "./stacks/club.stack";
import SponsorStack from "./stacks/sponsor.stack";// 💡 Importez le hook
import { useAuth } from "../context/authContext";

const Router = () => {
  // 💡 UTILISATION DU HOOK useAuth
  const { user } = useAuth();

  // Si 'loading' est vrai, le Provider affichera déjà un spinner.
  // Le Router ne doit s'occuper que de l'authentification.

  // 1. Vérifiez si l'utilisateur est null (non connecté) en premier
  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack /> // Affiche Login/Register
      </NavigationContainer>
    );
  }

  // 2. Si l'utilisateur existe, utilisez sa permission pour choisir le Stack
  return (
    <NavigationContainer>
      {user.permission === Permission.Player ? (
        <PlayerStack />
      ) : user.permission === Permission.Club ? (
        <ClubStack />
      ) : user.permission === Permission.Sponsor ? (
        <SponsorStack />
      ) : (
        // Si l'utilisateur a une permission inconnue, on le déconnecte (ou AuthStack)
        <AuthStack /> 
      )}
    </NavigationContainer>
  );
};

export default Router;