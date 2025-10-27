import React from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { useStripePayment } from '../../hooks/payment.hook';

const PaymentView = () => {
  const { loading, openPaymentSheet } = useStripePayment(5000, 'eur');
  // const { loading, openSubscriptionSheet } = useStripeSubscription('price_123');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Pay €50" onPress={openPaymentSheet} />
        // <Button title="Subscribe" onPress={openSubscriptionSheet} />
      )}
    </View>
  );
};

export default PaymentView;
