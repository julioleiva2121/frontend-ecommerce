const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
    if (response.status === 204) {
        return null;
    }
    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Something went wrong');
        } catch (e) {
            throw new Error(errorText || 'Something went wrong');
        }
    }
    return response.json();
};

export const customerService = {
    getAllCustomers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/clients`);
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching customers:', error);
            return [];
        }
    },

    getCustomerById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/clients/${id}`);
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error fetching customer with id ${id}:`, error);
            return null;
        }
    },

    createCustomer: async (customerData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },
};
