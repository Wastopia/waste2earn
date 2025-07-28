import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const { theme } = useThemeContext();
  
  return (
    <View 
      style={{
        backgroundColor: Colors[theme].tabBarBackground,
        borderTopColor: Colors[theme].tabBarBorder,
        borderTopWidth: 1,
      }}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
