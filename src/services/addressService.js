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
    // Si la respuesta es 201 Created (éxito) y no tiene cuerpo, devolvemos un objeto vacío para evitar errores.
    if (response.status === 201) {
        return {};
    }
    return response.json();
};

export const addressService = {
    createAddress: async (addressData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressData),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error creating address:', error);
            throw error;
        }
    },
};