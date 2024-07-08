import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe('pk_test_51PaQZDLaJ79CaP6nXRbjPPgfCrGx3a5uqFoyUBa2qPWMefh2g8ePgd4QFANUgrjnXCfgIgvkQ4kMMEfBeXRteNUs000ApYXQ2V');

const Payment: React.FC = () => {
  const { t } = useTranslation();
  const options = {
    clientSecret: 'sk_test_51PaQZDLaJ79CaP6nQKNVOYJCqxH7Z510fWKJsTS0XLEI8JRfL6AcbzCKW7nRdlPPsN4V4zu0Q7z9sSBrrloGe40J00oG6atPfh',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentElement />
      <Button variant="outlined" color="success">
        {t('pay')}
      </Button>
    </Elements>
  );
};

export default Payment;
