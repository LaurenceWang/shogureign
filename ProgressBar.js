import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const ProgressBar = ({ value }) => {
  const styles = getStyles((value >= 0) ? value : 0);

  return (
    <View className="power-pb" style={styles.pb}>
      <Animated.View className="power-pb-green" style={styles.fill} />
    </View>
  );
}

const getStyles = (value) => StyleSheet.create({
  pb: {
    marginBottom : 35,
    transform: [{rotateZ: '-90deg'}],
    borderWidth: 1,
    borderColor : "#AAA",
  },
  fill: {
    
    backgroundColor: "#AAA",
    width: `${value}%`,
    height: 10,
  }
});

export default ProgressBar;
