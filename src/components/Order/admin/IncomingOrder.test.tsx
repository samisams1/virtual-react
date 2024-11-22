import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import IncomingOrder from './IncomingOrder';
import { useFetchOrderData } from '@/services/order/fetchSubCategoryData';
import { configureStore } from '@reduxjs/toolkit';

// Mock the useFetchOrderData hook
jest.mock('@/services/order/fetchSubCategoryData');

const mockStore = configureStore([]);

describe('IncomingOrder Component', () => {
    let store;

    beforeEach(() => {
        // Reset the mock implementation before each test
        jest.clearAllMocks();
        store = mockStore({ order: { loading: false, orders: [], error: null } }); // Initialize store
    });

    test('renders loading state', () => {
        (useFetchOrderData as jest.Mock).mockReturnValue({
            loading: true,
            orders: [],
            error: null,
        });

        render(
            <Provider store={store}>
                <IncomingOrder />
            </Provider>
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/Loading orders, please wait.../i)).toBeInTheDocument();
    });

    test('renders error state', () => {
        (useFetchOrderData as jest.Mock).mockReturnValue({
            loading: false,
            orders: [],
            error: 'Failed to fetch orders',
        });

        render(
            <Provider store={store}>
                <IncomingOrder />
            </Provider>
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/Error: Failed to fetch orders/i)).toBeInTheDocument();
    });

    test('renders order table when data is available', () => {
        const orders = [
            { id: 1, name: 'Order 1', quantity: 10, price: 100, createdAt: '2023-01-01', status: 'Pending' },
            { id: 2, name: 'Order 2', quantity: 5, price: 50, createdAt: '2023-01-02', status: 'Completed' },
        ];

        (useFetchOrderData as jest.Mock).mockReturnValue({
            loading: false,
            orders: orders,
            error: null,
        });

        render(
            <Provider store={store}>
                <IncomingOrder />
            </Provider>
        );

        expect(screen.getByRole('heading', { name: /Incoming Orders/i })).toBeInTheDocument();
        expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Order 2/i)).toBeInTheDocument();
    });
});