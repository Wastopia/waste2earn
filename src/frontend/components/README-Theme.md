# Theme Toggle System

This project includes a comprehensive theme toggle system that allows users to switch between light and dark themes with persistent storage and smooth animations.

## Components

### 1. ThemeToggle
A simple animated button component that toggles between light and dark themes.

**Usage:**
```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

<ThemeToggle size={24} />
```

**Props:**
- `size?: number` - Size of the icon (default: 24)
- `style?: any` - Additional styles

### 2. ThemeSettings
A comprehensive theme settings component with multiple theme options.

**Usage:**
```tsx
import { ThemeSettings } from '@/components/ThemeSettings';

<ThemeSettings />
```

### 3. ThemeDemo
A demo component showcasing all theme functionality.

**Usage:**
```tsx
import { ThemeDemo } from '@/components/ThemeDemo';

<ThemeDemo />
```

## Hooks

### useTheme
Custom hook for theme management with AsyncStorage persistence.

**Usage:**
```tsx
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme, setTheme, isSystemTheme } = useTheme();
```

**Returns:**
- `theme: 'light' | 'dark'` - Current theme
- `toggleTheme: () => Promise<void>` - Toggle between themes
- `setTheme: (theme: 'light' | 'dark') => Promise<void>` - Set specific theme
- `isSystemTheme: boolean` - Whether using system preference

### useThemeContext
Context hook for accessing theme throughout the app.

**Usage:**
```tsx
import { useThemeContext } from '@/contexts/ThemeContext';

const { theme, toggleTheme, setTheme, isSystemTheme } = useThemeContext();
```

## Context

### ThemeProvider
Wraps the app to provide theme context throughout.

**Usage:**
```tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

<ThemeProvider>
  <App />
</ThemeProvider>
```

## Features

- ✅ Persistent theme storage using AsyncStorage
- ✅ Smooth animations with rotation and scaling
- ✅ System theme detection
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Accessibility friendly
- ✅ Cross-platform (iOS, Android, Web)

## Integration

The theme toggle is already integrated into the tab layout header. To add it to other screens:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

// In your component
<ThemeToggle />
```

## Colors

The theme system uses the existing Colors constant:

```tsx
import { Colors } from '@/constants/Colors';

// Access theme colors
const backgroundColor = Colors[theme].background;
const textColor = Colors[theme].text;
const tintColor = Colors[theme].tint;
```

## Animation

The ThemeToggle component includes:
- Scale animation on press
- Rotation animation on theme change
- Smooth transitions between states

## Storage

Theme preferences are automatically saved to AsyncStorage and restored on app launch. The storage key is `@theme_preference`. 