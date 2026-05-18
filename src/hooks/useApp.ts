'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SponsorDeal } from '@/lib/types'; // Assuming SponsorDeal is a relevant type for filtering

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): { filtered: T[]; search: string; setSearch: (s: string) => void; status: string; setStatus: (s: string) => void } {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>(''); // For filtering by item.status

  const filtered = items.filter((item) => {
    const matchesSearch = search === '' || fields.some((field) => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase());
    });

    const itemStatus = (item as unknown as SponsorDeal).status; // Type assertion for common status field
    const matchesStatus = status === '' || itemStatus === status;

    return matchesSearch && matchesStatus;
  });

  return { filtered, search, setSearch, status, setStatus };
}

export function useModal<T = unknown>(): {
  isOpen: boolean;
  open: (item?: T) => void;
  close: () => void;
  activeItem: T | null;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const open = useCallback((item?: T) => {
    setActiveItem(item || null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null);
  }, []);

  return { isOpen, open, close, activeItem };
}

export function useDemoToast(): {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  show: (msg: string, type?: 'success' | 'error' | 'info') => void;
} {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setMessage('');
      timerRef.current = null;
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, type, visible, show };
}