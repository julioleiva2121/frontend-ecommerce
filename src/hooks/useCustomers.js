import { useState, useEffect, useCallback } from 'react';
import { customerService } from '../services/customerService';

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await customerService.getAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return { customers, isLoading, error, refetch: fetchCustomers };
};
