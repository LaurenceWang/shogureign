import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const ProgressBar = ({ value }) => {
  const styles = getStyles(value);

  return (
    <View className="power-pb" style={styles.pbBorder}>
      <Animated.View className="power-pb-green" style={styles.green} />
    </View>
  );
}

const getStyles = (value) => StyleSheet.create({
  pbBorder: {
    borderWidth: 1
  },
  green: {
    backgroundColor: "#60F645",
    width: `${value}%`,
    height: 2
  }
});

export default ProgressBar;
