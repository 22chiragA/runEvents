import api from './api';

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const createRazorpayOrder = async (amount) => {
    try {
        const response = await api.post('/api/payment/create-order', { amount });
        return response.data; // { orderId, amount, currency, keyId }
    } catch (error) {
        console.error("Error creating Razorpay Order:", error);
        throw error;
    }
};
