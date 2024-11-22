export const PROCESS_PAYMENT_REQUEST = 'PROCESS_PAYMENT_REQUEST';
export const PROCESS_PAYMENT_SUCCESS = 'PROCESS_PAYMENT_SUCCESS';
export const PROCESS_PAYMENT_FAILURE = 'PROCESS_PAYMENT_FAILURE';

// Action Types
interface ProcessPaymentRequestAction {
  type: typeof PROCESS_PAYMENT_REQUEST;
}

interface ProcessPaymentSuccessAction {
  type: typeof PROCESS_PAYMENT_SUCCESS;
  payload: PaymentResponse; // Replace with your specific payment response type
}

interface ProcessPaymentFailureAction {
  type: typeof PROCESS_PAYMENT_FAILURE;
  payload: string; // Assuming the error is a string
}

// Define your PaymentResponse type
export interface PaymentResponse {
  transactionId: string; // Unique identifier for the transaction
  amount: number; // Amount processed
  status: string; // Status of the payment (e.g., 'success', 'failed')
}

// Combine Action Types
export type PaymentActionTypes =
  | ProcessPaymentRequestAction
  | ProcessPaymentSuccessAction
  | ProcessPaymentFailureAction;

// Action Creators
export const processPaymentRequest = (): ProcessPaymentRequestAction => ({
  type: PROCESS_PAYMENT_REQUEST,
});

export const processPaymentSuccess = (response: PaymentResponse): ProcessPaymentSuccessAction => ({
  type: PROCESS_PAYMENT_SUCCESS,
  payload: response,
});

export const processPaymentFailure = (error: string): ProcessPaymentFailureAction => ({
  type: PROCESS_PAYMENT_FAILURE,
  payload: error,
});

// Example Thunk for Processing Payment
import { Dispatch } from 'redux';

export const processPayment = (paymentDetails: any) => { // Replace 'any' with your actual payment details type
  return async (dispatch: Dispatch<PaymentActionTypes>) => {
    dispatch(processPaymentRequest());
    try {
      const response = await fetch('your-payment-api-endpoint', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: PaymentResponse = await response.json();
      dispatch(processPaymentSuccess(data));
    } catch (error: unknown) {
      // Type assertion to handle the error
      if (error instanceof Error) {
        dispatch(processPaymentFailure(error.message));
      } else {
        dispatch(processPaymentFailure('An unknown error occurred'));
      }
    }
  };
};