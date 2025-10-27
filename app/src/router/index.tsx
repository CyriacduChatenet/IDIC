import { NavigationContainer } from "@react-navigation/native";
import { User } from "../types/user.type";
import AuthStack from "./stacks/auth.stack";
import { Permission } from "../enum/permission.enum";
import PlayerStack from "./stacks/player.stack";
import ClubStack from "./stacks/club.stack";
import SponsorStack from "./stacks/sponsor.stack";

const Router = () => {
  // 💡 En réalité, cette valeur viendrait d'un contexte global (ex: AuthContext)
  // Pour la démonstration de la correction, nous laissons 'null' ici
  const user: User | null = { permission: Permission.Player } as User | null;

  // 1. Vérifiez si l'utilisateur est null (non connecté) en premier
  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
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
        // Option de secours au cas où l'utilisateur est connecté mais sans permission reconnue
        <AuthStack /> 
      )}
    </NavigationContainer>
  );
};

export default Router;