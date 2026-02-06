import { TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/lib/colors';

interface SettingsGearProps {
  color?: string;
}

export function SettingsGear({ color = colors.textMuted }: SettingsGearProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/settings')}
      style={styles.container}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Settings size={20} color={color} strokeWidth={1.5} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
  },
});
