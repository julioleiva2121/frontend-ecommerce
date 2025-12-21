import { useState, useEffect, useCallback } from 'react';
import { billService } from '../services/billService';

export const useBills = () => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBills = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await billService.getAllBills();
            setBills(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);

    const addBill = useCallback(async (billData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newBill = await billService.createBill(billData);
            setBills((prevBills) => [...prevBills, newBill]);
            return newBill;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateBill = useCallback(async (id, billData) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedBill = await billService.updateBill(id, billData);
            setBills((prevBills) =>
                prevBills.map((bill) => (bill.id_key === id ? updatedBill : bill))
            );
            return updatedBill;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteBill = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await billService.deleteBill(id);
            setBills((prevBills) => prevBills.filter((bill) => bill.id_key !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { bills, isLoading, error, refetch: fetchBills, addBill, updateBill, deleteBill };
};