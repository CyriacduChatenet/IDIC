import { useEffect, useState } from "react";
import { 
    View, 
    FlatList, // 💡 Utilisation de FlatList pour l'optimisation
    Text, 
    StyleSheet, 
    ActivityIndicator // Indicateur de chargement
} from "react-native";
import React from "react";

import TicketService from "../../services/ticket.service";
import { Ticket } from "../../types/ticket.type";
import TicketItem from "./ticket-item.component";

const TicketList = () => {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true); // 💡 État de chargement
  const [error, setError] = useState<string | null>(null); // 💡 État d'erreur

  const ticketService = new TicketService();

  const findAllTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketService.findAllByPlayerId("10");

      console.log(response.data);
      setData(response.data);
      setError(null);

    } catch (err) {
      console.error("Erreur de récupération des tickets:", err);
      setError("Impossible de charger les tickets. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findAllTickets();
  }, []);

  // --- RENDUS CONDITIONNELS ---

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CC6E31" />
        <Text style={styles.loadingText}>Chargement des tickets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // 💡 Rendu pour la liste vide
  if (data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Vous n'avez aucun ticket d'événement actif.</Text>
        <Text style={styles.emptySubtitle}>Rejoignez un club pour participer à des événements !</Text>
      </View>
    );
  }

  // --- RENDU DE LA LISTE PRINCIPALE ---
  return (
    // 💡 FlatList est optimisé pour les longues listes et ne nécessite pas de ScrollView parent
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.qr_code + index}
      renderItem={({ item }) => (
        // 💡 Passage de l'index dans le style pour ajouter une marge si ce n'est pas le dernier élément
        <TicketItem 
          name={item.event.name} 
          address={item.event.address} 
          date={item.event.date} 
          qrcode={item.qr_code} 
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

// --- STYLES ---

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20, // Espace en bas de la liste
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 200, // S'assurer que le chargement/vide est visible
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#CC6E31',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  }
});

export default TicketList;