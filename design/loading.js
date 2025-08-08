import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import styles from './style';

const LoadingScreen = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="large" color="#14DBDB" />
      <Text style={styles.info}>Загрузка...</Text>
    </View>
  );
};

export default LoadingScreen