import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

export const useStripeSubscription = (priceId: string) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeSubscriptionSheet = async () => {
      try {
        const response = await fetch(
          `${Constants.manifest?.extra?.EXPO_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/stripe/subscription`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId }),
          }
        );

        const data = await response.json();
        const secret = data.client_secret || data.clientSecret;

        if (!secret) {
          console.error('❌ Missing clientSecret from backend:', data);
          Alert.alert('Error', 'Failed to initialize subscription sheet.');
          return;
        }

        setClientSecret(secret);

        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: secret,
          merchantDisplayName: 'SportApp',
          returnURL: 'sportapp://payment-return',
          allowsDelayedPaymentMethods: true,
        });

        if (error) {
          console.warn('⚠️ initPaymentSheet error:', error);
          Alert.alert('Error', error.message);
        } else {
          console.log('✅ Subscription sheet initialized.');
        }
      } catch (err) {
        console.error('❌ Error initializing subscription sheet:', err);
        Alert.alert('Error', 'Could not set up subscription sheet.');
      }
    };

    initializeSubscriptionSheet();
  }, [priceId]);

  const openSubscriptionSheet = async () => {
    if (!clientSecret) {
      Alert.alert('Error', 'Subscription sheet not ready yet.');
      return;
    }

    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);

    if (error) {
      Alert.alert('Payment failed', error.message);
      console.warn('❌ Subscription error:', error);
    } else {
      Alert.alert('Success', 'Subscription complete!');
      console.log('✅ Subscription succeeded');
    }
  };

  return { loading, openSubscriptionSheet, clientSecret };
};
