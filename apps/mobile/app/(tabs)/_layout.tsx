import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { Book, Heart, BarChart3, Moon } from 'lucide-react-native';
import { useRef, useEffect } from 'react';
import { colors, shadows, spacing } from '@/lib/colors';

interface TabIconProps {
  icon: React.ReactNode;
  focused: boolean;
  isNight?: boolean;
}

function TabIcon({ icon, focused, isNight = false }: TabIconProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        focused && (isNight ? styles.iconContainerNightFocused : styles.iconContainerFocused),
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      {icon}
      {/* Gold accent indicator */}
      {focused && (
        <View style={[styles.activeIndicator, isNight && styles.activeIndicatorNight]} />
      )}
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="readings"
        options={{
          title: 'Readings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Book
                  size={22}
                  color={focused ? colors.primary : color}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: 'Prayer',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Heart
                  size={22}
                  color={focused ? colors.primary : color}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <BarChart3
                  size={22}
                  color={focused ? colors.primary : color}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="night"
        options={{
          title: 'Night',
          tabBarActiveTintColor: colors.night.gold,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              isNight
              icon={
                <Moon
                  size={22}
                  color={focused ? colors.night.gold : color}
                  strokeWidth={focused ? 2 : 1.5}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 92 : 72,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    // Elevated shadow for elegant appearance
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 6,
  },
  tabBarItem: {
    paddingTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 36,
    borderRadius: 18,
    position: 'relative',
  },
  iconContainerFocused: {
    backgroundColor: colors.primaryFaint,
  },
  iconContainerNightFocused: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.gold,
  },
  activeIndicatorNight: {
    backgroundColor: colors.night.gold,
  },
});
