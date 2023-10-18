import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function CreditCardForm() {


    const stripePromise = loadStripe('pk_test_51O2AMAI47xWQxVGV0k99tPraKxItkbJFMTM62NF3usuyiwNFePFcAYZnb6MZjguJk8FYxZzzmqyY4pW7FBXAtl6K00fCGDlTNi');

    const stripe = useStripe();
    const elements = useElements();



    return (
        <form stripe={stripePromise}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
}
