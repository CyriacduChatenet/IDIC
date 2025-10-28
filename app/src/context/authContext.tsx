import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "../types/user.type"; // Assurez-vous que ce chemin est correct
import { Permission } from "../enum/permission.enum"; // Assurez-vous que ce chemin est correct
import { ActivityIndicator, Text, View } from "react-native";

// --- Définition du Type de Contexte ---

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// 💡 Créez le contexte avec des valeurs par défaut pour TypeScript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Fournisseur (Provider) ---

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Simule l'utilisateur connecté/déconnecté
  const [user, setUser] = useState<User | null>(null);
  // Simule le chargement initial (ex: vérification du token stocké)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 Ici, vous vérifieriez si un token ou un ID utilisateur est stocké localement (AsyncStorage)
    // Pour l'instant, on simule la fin du chargement après un court délai.
    setTimeout(() => {
      // Exemple de connexion automatique simulée :
      // setUser({ id: '123', permission: Permission.Player } as User);
      setLoading(false);
    }, 1500);
  }, []);

  // Fonction de connexion (appelée après une connexion réussie)
  const login = (userData: User) => {
    setUser(userData);
    // 💡 (Optionnel) Stocker le token dans AsyncStorage ici
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    // 💡 (Optionnel) Supprimer le token de AsyncStorage ici
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
  };

  // Tant que le chargement initial n'est pas terminé, on affiche rien ou un écran de splash
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Vérification de la session...</Text> {/* 💡 Ce texte est correctement dans un composant <Text> */}
      </View>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// --- Hook Personnalisé pour l'Utilisation ---

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};