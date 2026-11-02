export const colors = {
  primary: {
    main: '#2563eb',
    light: '#3b82f6',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#7c3aed',
    light: '#8b5cf6',
    dark: '#6d28d9',
  },
  success: {
    main: '#16a34a',
    light: '#22c55e',
    dark: '#15803d',
  },
  warning: {
    main: '#ca8a04',
    light: '#eab308',
    dark: '#a16207',
  },
  error: {
    main: '#dc2626',
    light: '#ef4444',
    dark: '#b91c1c',
  },
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    black: '#000000',
  },
};

export const getColor = (category, shade = 'main') => {
  if (colors[category] && colors[category][shade]) {
    return colors[category][shade];
  }
  return colors.primary.main;
};