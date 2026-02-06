import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '@/lib/colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleRestart = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Image
            source={require('@/assets/Spark-logo-transparent.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>
            We're sorry for the interruption.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleRestart}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Tap to restart</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.xl,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
    fontFamily: 'Georgia',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D4AF37',
    letterSpacing: 0.3,
  },
});
