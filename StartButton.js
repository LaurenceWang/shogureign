import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const StartButton = ({onPress}) => {
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
              uri: 'https://cdn-icons-png.flaticon.com/512/7734/7734686.png',
            }}
            style={styles.reverseIcon}
          />
          <Text style={styles.text}>Play</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapperBack: {
    position: 'absolute',
    height: 160,
    width: 160,
    backgroundColor: '#aaa',
    borderRadius: 35,
    overflow: 'hidden',
  },
  cardWrapper: {
    height: 160,
    width: 160,
    left: 90,
    top: -100,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCCD3',
  },
  reverseIcon: {
    height: 80,
    width: 80,
  },
  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  text: {
    paddingTop: 20,
  },
});

export default StartButton;