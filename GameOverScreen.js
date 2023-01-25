import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';

const GameOverScreen = ({ text, iconURI }) => {
  console.log("GameOverScreen > Text : " + text);
  console.log("GameOverScreen > Icon : " + iconURI);

  // Set an icon for the game over screen
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
      {iconURI !== '' && <Image source={{ uri: iconURI }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create(
  {
    wrapper: {
      backgroundColor: '#FFCCD3',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'black'
    },
    image: {
      height: 200,
      width: 200
    }
  }
);

export default GameOverScreen;
