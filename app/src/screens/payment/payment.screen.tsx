import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// Assurez-vous que ce chemin est correct dans votre projet
import { useStripePayment } from '../../hooks/payment.hook'; 
// Remplacement temporaire d'icône pour la compilation
// Dans un projet React Native réel, utilisez : import { Ionicons } from "@expo/vector-icons"; 

// --- COMPONENT PROPS ---
interface PaymentScreenProps {
  // Prop required to handle navigation to the login page
  onLoginRequired: () => void; 
}

// --- PLAN DATA (Replace with your actual Stripe price IDs) ---
const PAYMENT_PLANS = [
  {
    id: 'monthly',
    title: 'Achat unique',
    price: '39,99 €',
    duration: 'le tournoi',
    description: 'Accès pour créer un tournoi',
    isSubscription: false,
    priceId: 'price_mensuel_stripe_id',
    amountCents: 3990, // Replace with your Stripe Price ID
  },
  {
    id: 'annual',
    title: 'Abonnement Annuel',
    price: '99,99 €',
    duration: 'par an',
    description: 'Le meilleur rapport qualité-prix. Facturation annuelle.',
    isSubscription: true,
    priceId: 'price_annuel_stripe_id', // Replace with your Stripe Price ID
  }
];

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onLoginRequired }) => {
  
  // Use useStripePayment, passing onLoginRequired as the success function
  const { loading: paymentLoading, openPaymentSheet } = useStripePayment(
      PAYMENT_PLANS[0].amountCents as number, 
      'eur',
      onLoginRequired // <-- NOW PASSED AS onSUCCESS CALLBACK
  ); 

  // 💡 SIMULATION: Function to open subscription sheet
  const openSubscriptionSheet = (priceId: string) => {
      console.log(`Tentative d'abonnement pour le plan : ${priceId}`);
      // REPLACE WITH YOUR ACTUAL SUBSCRIPTION LOGIC
      alert(`Simulation: Launching subscription ${priceId}`);
      // NOTE: If subscription is successful, you should also call onLoginRequired here
  }

  // Click handler function
  const handlePlanSelection = (plan: typeof PAYMENT_PLANS[0]) => {
    if (plan.isSubscription) {
      openSubscriptionSheet(plan.priceId);
    } else {
      // The openPaymentSheet function will call onLoginRequired internally on success
      openPaymentSheet();
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
                        {/* Replacement of the icon with a simple text arrow (>) to avoid import error */}
                        <Text style={styles.arrowIcon}>&gt;</Text> 
                    </View>
                </TouchableOpacity>
            ))}


            {/* Global loading indicator for the single payment */}
            {paymentLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#CC6E31" />
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
    color: '#CC6E31', // Accent color
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
      color: '#CC6E31',
  },
  arrowIcon: { // New style for the workaround arrow icon
    fontSize: 20,
    color: '#CC6E31',
    fontWeight: 'bold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#CC6E31',
  },
  // STYLES FOR THE LOGIN BUTTON
  loginButton: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#CC6E31',
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
});

export default PaymentScreen;
