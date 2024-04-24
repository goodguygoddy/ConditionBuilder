import { useState, useEffect } from 'react';
import axios from 'axios';

interface IDataItem {
    [key: string]: string | number;
}

interface IReturnType {
    data: IDataItem[],
    loading: boolean,
    error: Error | null
}

/**
 * Custom hook to fetch data from a given URL.
 * @param url The URL to fetch data from.
 * @returns An object containing the data, loading status, and any error encountered.
 */
const useFetch = (url: string) : IReturnType => {
    const [data, setData] = useState<IDataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setData([]);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
