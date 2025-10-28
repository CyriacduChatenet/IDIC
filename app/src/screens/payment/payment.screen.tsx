import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useStripePayment } from '../../hooks/payment.hook'; // Assurez-vous que ce chemin est correct
import { Ionicons } from "@expo/vector-icons"; 

// --- DONNÉES DES PLANS (Mettez vos vrais IDs de prix Stripe ici) ---
const PAYMENT_PLANS = [
  {
    id: 'monthly',
    title: 'Abonnement Mensuel',
    price: '9,99 €',
    duration: 'par mois',
    description: 'Accès illimité pour un paiement récurrent.',
    isSubscription: true,
    priceId: 'price_mensuel_stripe_id', // Remplacez par votre Price ID Stripe
  },
  {
    id: 'annual',
    title: 'Abonnement Annuel',
    price: '99,99 €',
    duration: 'par an (Économisez 20 €!)',
    description: 'Le meilleur rapport qualité-prix. Facturation annuelle.',
    isSubscription: true,
    priceId: 'price_annuel_stripe_id', // Remplacez par votre Price ID Stripe
  },
  {
    id: 'one-time',
    title: 'Accès Illimité (Achat Unique)',
    price: '249,00 €',
    duration: 'Paiement en une seule fois',
    description: 'Accès à vie sans récurrence.',
    isSubscription: false,
    amountCents: 24900, // Montant en centimes pour le paiement unique
  },
];

const PaymentScreen = () => {
  // 💡 Note : Votre hook useStripePayment doit être capable de gérer les deux cas (paiement unique et abonnement)
  // J'ai simulé l'appel à la fonction openPaymentSheet pour un montant fixe pour l'exemple
  
  // Utilisation simplifiée pour le paiement unique de l'exemple (249.00 EUR)
  const { loading: paymentLoading, openPaymentSheet } = useStripePayment(
      PAYMENT_PLANS[2].amountCents as number, 
      'eur'
  ); 

  // 💡 SIMULATION : Fonction pour ouvrir la sheet d'abonnement (à décommenter/implémenter dans le hook)
  const openSubscriptionSheet = (priceId: string) => {
      // const { openSubscriptionSheet } = useStripeSubscription(priceId);
      console.log(`Tentative d'abonnement pour le plan : ${priceId}`);
      // REMPLACER PAR VOTRE LOGIQUE D'ABONNEMENT RÉELLE
      // Exemple : openSubscriptionSheet(priceId);
      alert(`Simulation: Lancement de l'abonnement ${priceId}`);
  }

  // Fonction de gestion du clic
  const handlePlanSelection = (plan: any) => {
    if (plan.isSubscription) {
      openSubscriptionSheet(plan.priceId);
    } else {
      openPaymentSheet();
      // Si vous aviez plusieurs paiements uniques, vous feriez :
      // openPaymentSheet(plan.amountCents, 'eur');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Choisissez votre plan d'accès</Text>
            <Text style={styles.headerSubtitle}>Sélectionnez l'option qui vous convient le mieux.</Text>
        </View>

        <View style={styles.container}>
            {PAYMENT_PLANS.map((plan) => (
                <TouchableOpacity
                    key={plan.id}
                    style={styles.planCard}
                    onPress={() => handlePlanSelection(plan)}
                    disabled={paymentLoading}
                    activeOpacity={0.8}
                >
                    <View style={styles.planContent}>
                        <View>
                            <Text style={styles.planTitle}>{plan.title}</Text>
                            <Text style={styles.planDescription}>{plan.description}</Text>
                        </View>
                        <View style={styles.priceBox}>
                            <Text style={styles.priceText}>{plan.price}</Text>
                            <Text style={styles.durationText}>{plan.duration}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.actionRow}>
                        {plan.isSubscription ? (
                            <Text style={styles.actionText}>S'abonner</Text>
                        ) : (
                            <Text style={styles.actionText}>Payer en 1 fois</Text>
                        )}
                         <Ionicons name="arrow-forward-outline" size={20} color="#007AFF" />
                    </View>
                </TouchableOpacity>
            ))}

            {/* Indicateur de chargement global pour le paiement unique */}
            {paymentLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Préparation du paiement...</Text>
                </View>
            )}
        </View>
    </SafeAreaView>
  );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
      padding: 20,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginBottom: 20,
  },
  headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
  },
  headerSubtitle: {
      fontSize: 16,
      color: '#666',
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  planContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 15,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF', // Couleur d'accentuation
  },
  planDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    maxWidth: 200,
  },
  priceBox: {
      alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  durationText: {
      fontSize: 14,
      color: '#888',
      marginTop: 2,
      fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#007AFF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#007AFF',
  }
});

export default PaymentScreen;