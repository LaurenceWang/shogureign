import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const GameOverScreen = ({ text }) => {
  // Set an icon for the game over screen
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    wrapper: {
      backgroundColor: '#FFCCD3',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'black'
    }
  }
);

export default GameOverScreen;
