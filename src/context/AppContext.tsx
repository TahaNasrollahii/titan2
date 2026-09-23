'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type Toast = {
  id: number;
  title: string;
  text?: string;
  icon?: string;
};

type AppContextType = {
  cartCount: number;
  cartPop: boolean;
  addToCart: (name?: string) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: number) => void;
  hasUnreadNotifications: boolean;
  clearNotifications: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartPop, setCartPop] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastIdCounter, setToastIdCounter] = useState(0);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    setToastIdCounter(prev => {
      const id = prev + 1;
      setToasts(current => {
        const newToasts = [...current, { ...toast, id }];
        if (newToasts.length > 3) return newToasts.slice(newToasts.length - 3);
        return newToasts;
      });
      return id;
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(current => current.filter(t => t.id !== id));
  }, []);

  const addToCart = useCallback((name?: string) => {
    setCartCount(c => c + 1);
    setCartPop(false);
    setTimeout(() => setCartPop(true), 10);
    addToast({
      title: 'به سبد خرید اضافه شد',
      text: name || '',
      icon: 'cart'
    });
  }, [addToast]);

  const clearNotifications = useCallback(() => {
    setHasUnreadNotifications(false);
    addToast({
      title: "You're all caught up",
      text: 'اعلان جدیدی ندارید',
      icon: 'bell'
    });
  }, [addToast]);

  useEffect(() => {
    (window as any).titanToast = addToast;
    (window as any).titanAddToCart = addToCart;
  }, [addToast, addToCart]);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        cartPop,
        addToCart,
        toasts,
        addToast,
        removeToast,
        hasUnreadNotifications,
        clearNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
