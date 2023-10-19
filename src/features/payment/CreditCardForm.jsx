import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function CreditCardForm() {


    const stripe = useStripe();
    // const elements = useElements();

    const appearance = {
        theme: 'stripe',
      };


// Pass the appearance object to the Elements instance
const elements = stripe.elements({appearance});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Send paymentMethod.id to your server here
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ width: '400px', height: '100px' }} >
            <CardElement  style={{ width: '400px', height: '100px' }} />

            <button type="submit" disabled={!stripe} className="bg-orange-500 text-white rounded-3xl px-4 py-1">Pay</button>
        </form>
    );
}
