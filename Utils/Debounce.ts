import { useEffect, useState } from 'react';

/**
 * Retorna um valor com debounce — útil para esperar o usuário terminar de digitar antes de disparar uma requisição.
 *
 * @param value Valor a ser observado (ex: texto digitado).
 * @param delay Tempo de espera em milissegundos (default: 500ms).
 * @returns O valor atualizado apenas após o delay.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
