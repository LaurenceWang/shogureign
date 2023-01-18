import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';

const BackStatic = ({shadowOpacity = 0 }) => {
  return (
    <>
        <View style={[styles.shadow, { opacity: shadowOpacity }]} />
        {/* <ImageBackground source={'https://cdn-icons-png.flaticon.com/512/257/257701.png'} resizeMode="cover" style={styles.icon}></ImageBackground> */}
        <View style={[styles.triangleLeft,]}>
      <FastImage
          style={styles.icon}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/257/257701.png',
          }}
        /> 
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
    overflow:'hidden',
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
    borderLeftColor: 'red',
    borderRadius: 35,
    //position : 'relative',
    
    //flex : 1,
    //overflow:'hidden',
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
  },
  triangleDown: {
    width: 0,
    height: 0,
  },

  icon: {
    
    /*width: 0,
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
    borderRadius: 35,*/
    zIndex : 10,
    height : 120,
    width : 120,
    //position : 'absolute',
    //left : 0,
    marginLeft : -170,
    marginTop : -60,

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
