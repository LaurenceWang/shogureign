import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';


import thumbsUpImage from './images/thumbsup.png';
import thumbsDownImage from './images/thumbsdown.png';


const Feedback = ({ isGood, isBad }) => {
  const heartAnimation = useSharedValue(0);
  const cloudAnimation = useSharedValue(0);

  useEffect(() => {
    if (isGood) {
      heartAnimation.value = withTiming(1);
      setTimeout(() => {
        heartAnimation.value = withTiming(0);
      }, 1000);
    }
    if (isBad) {
      cloudAnimation.value = withTiming(1);
      setTimeout(() => {
        cloudAnimation.value = withTiming(0);
      }, 1000);
    }
  }, [cloudAnimation, heartAnimation, isBad, isGood]);

  const animatedHeart = useAnimatedStyle(() => {
    return {
      opacity: heartAnimation.value,
      transform: [{ translateY: 20 - heartAnimation.value * 20 }],
    };
  });

  const animatedCloud = useAnimatedStyle(() => {
    return {
      opacity: cloudAnimation.value,
      transform: [{ translateY: 20 - cloudAnimation.value * 20 }],
    };
  });

  const getStyles = (iconSize) => StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartWrapper: {
      position: 'absolute',
      bottom: 155,
    },
    cloudWrapper: {
      position: 'absolute',
      bottom: 140,
    },
    thumbImage: {
      height: 100,
      width: 100,
    },
  });

  const styles = getStyles();

  return (
    <>
      <View style={styles.wrapper}>
        {isGood && (
          <Animated.View style={[animatedHeart, styles.heartWrapper]}>
            <Image source={thumbsUpImage} style={styles.thumbImage} />
          </Animated.View>
        )}
        {isBad && (
          <Animated.View style={[animatedCloud, styles.cloudWrapper]}>
            <Image source={thumbsDownImage} style={styles.thumbImage} />
          </Animated.View>
        )}
      </View>
    </>
  );
};

export default Feedback;
