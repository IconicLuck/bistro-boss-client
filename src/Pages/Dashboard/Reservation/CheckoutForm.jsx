import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";




const CheckoutForm = ({ price }) => {
    console.log(price)

    const [cardError, setCardError] = useState('')

    const [axiosSecure] = useAxiosSecure()

    const { user } = useContext(AuthContext)

    const stripe = useStripe()
    const elements = useElements()

    const [clientSecret, setClientSecret] = useState('')
    console.log(clientSecret)

    useEffect(() => {
        // console.log(price)
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
            console.log(paymentMethod)
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }

        console.log(paymentIntent)

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border-2 p-4"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="w-9/12 mx-auto mt-5">
                    <button className="btn btn-primary w-full" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600">{cardError}</p>}
        </>
    );
};

export default CheckoutForm;