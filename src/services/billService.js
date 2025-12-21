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

export const billService = {
    getAllBills: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/bills`);
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching bills:', error);
            return [];
        }
    },

    getBillById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bills/${id}`);
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error fetching bill with id ${id}:`, error);
            return null;
        }
    },

    createBill: async (billData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error creating bill:', error);
            throw error;
        }
    },

    updateBill: async (id, billData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bills/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error updating bill with id ${id}:`, error);
            throw error;
        }
    },

    deleteBill: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bills/${id}`, {
                method: 'DELETE',
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error deleting bill with id ${id}:`, error);
            throw error;
        }
    },
};