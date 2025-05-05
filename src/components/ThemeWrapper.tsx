'use client';

import { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const root = document.documentElement;
        const updateTheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        updateTheme();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, []);

    return children;
}
