import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const KanjiButton = ({onPress}) => {
  const openAnimation = useSharedValue(1);

  const animatedWrapper = useAnimatedStyle(() => {
    return {
      opacity: openAnimation.value,
    };
  });

  const onPressCard = () => {
    openAnimation.value = withTiming(0);
    onPress();
  };

  return (
    <Pressable style={styles.cardWrapper} onPress={onPressCard}>
      <Animated.View style={[animatedWrapper, styles.wrapperBack]}>
        <View style={styles.wrapper}>
          <FastImage
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6851/6851875.png',
            }}
            style={styles.reverseIcon}
          />
          <Text style={styles.text}>Dictionnaire</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapperBack: {
    height: 160,
    width: 160,
    left: -90,
    top: -100,
    backgroundColor: '#aaa',
    borderRadius: 35,
    overflow: 'hidden',
  },
  cardWrapper: {
    height: 160,
    width: 160,
    position: 'absolute',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#FFCCD3',
  },
  reverseIcon: {
    height: 140,
    width: 140,
    position: 'absolute',
  },
  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  text: {
    paddingTop: 133,
    paddingLeft:33,


  },
});

export default KanjiMenu;