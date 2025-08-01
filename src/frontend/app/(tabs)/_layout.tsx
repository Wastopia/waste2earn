import React from 'react';
import { Platform, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { LogIn } from '@/components/LogIn';
import { LogOut } from '@/components/LogOut';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useIdentity } from '@/components/IdentityWrapper';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { authState } = useIdentity();
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tabBarActiveTint,
        tabBarInactiveTintColor: Colors[theme].tabBarInactiveTint,
        tabBarStyle: {
          ...Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
          backgroundColor: Colors[theme].tabBarBackground,
          borderTopColor: Colors[theme].tabBarBorder,
          borderTopWidth: 1,
        },
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            {authState.isAuthenticated ? <LogOut /> : <LogIn />}
          </View>
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: { height: 80 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="leaf.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan & Sort',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.2.squarepath" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
