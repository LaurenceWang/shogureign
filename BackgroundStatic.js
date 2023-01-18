import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const BackStatic = ({shadowOpacity = 0 }) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={[styles.shadow, { opacity: shadowOpacity }]} />
        <View style={styles.triangleRight}>
      <FastImage
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/257/257701.png',
          }}
        />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 340,
    width: 340,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c0a2fc',
  },
  
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 170,
    borderRightWidth: 170,
    borderBottomWidth: 170,
    borderLeftWidth: 170,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'green',
    borderRadius: 35,
    overflow: 'hidden',
  },

  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 170,
    borderRightWidth: 170,
    borderBottomWidth: 170,
    borderLeftWidth: 170,
    borderTopColor: 'transparent',
    borderRightColor: 'gold',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRadius: 35,
    overflow: 'hidden',
  },

  triangleUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 170,
    borderRightWidth: 170,
    borderBottomWidth: 170,
    borderLeftWidth: 170,
    borderTopColor: 'blue',
    borderRightColor: 'gold',
    borderBottomColor: 'red',
    borderLeftColor: 'green',
    borderRadius: 35,
    overflow: 'hidden',
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 170,
    borderRightWidth: 170,
    borderBottomWidth: 170,
    borderLeftWidth: 170,
    borderTopColor: 'blue',
    borderRightColor: 'gold',
    borderBottomColor: 'red',
    borderLeftColor: 'green',
    borderRadius: 35,
    overflow: 'hidden',
  },

  icon: {
    height: 200,
    width: 200,
  },

  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
});

export default BackStatic;
