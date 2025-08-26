// Predefined color schemes for sidebar icons
export const iconColors = {
  // Default colors
  default: '#073954',
  active: '#ffffff',
  hover: '#3b82f6',
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Theme colors
  primary: '#073954',
  secondary: '#64748b',
  accent: '#8b5cf6',
  
  // Grayscale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

// CSS filter generator for SVG colors
export const getSvgFilter = (color: string): string => {
  // Predefined color filters for common colors
  const colorFilters: Record<string, string> = {
    'white': 'brightness(0) invert(1)',
    'black': 'brightness(0)',
    'red': 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
    'blue': 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(200deg) brightness(104%) contrast(97%)',
    'green': 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)',
    'yellow': 'brightness(0) saturate(100%) invert(83%) sepia(31%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(107%)',
    'purple': 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(270deg) brightness(104%) contrast(97%)',
    'orange': 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(30deg) brightness(118%) contrast(119%)',
    'pink': 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(320deg) brightness(118%) contrast(119%)',
    'gray': 'brightness(0) saturate(0%)',
    'grey': 'brightness(0) saturate(0%)',
  };

  // Check if it's a predefined color
  if (colorFilters[color.toLowerCase()]) {
    return colorFilters[color.toLowerCase()];
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Convert to HSL for better filter generation
    if (r === g && g === b) {
      // Grayscale
      const brightness = (r + g + b) / 3;
      if (brightness > 128) {
        return 'brightness(0) invert(1)'; // Light colors become white
      } else {
        return 'brightness(0)'; // Dark colors become black
      }
    }
    
    // For colored hex, return empty (use original color)
    return '';
  }

  // Default to original color
  return '';
};

// Get icon color based on state
export const getIconColor = (state: 'default' | 'active' | 'hover' | 'disabled' = 'default'): string => {
  switch (state) {
    case 'active':
      return iconColors.active;
    case 'hover':
      return iconColors.hover;
    case 'disabled':
      return iconColors.gray[400];
    default:
      return iconColors.default;
  }
};
