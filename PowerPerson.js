import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Images from './images/index';
import ProgressBar from './ProgressBar';

const PowerPerson = ({ base, isHappy, isSad, value }) => {
  const heartAnimation = useSharedValue(0);
  const cloudAnimation = useSharedValue(0);
  const personSize = useSharedValue(1);

  const iconSize = 95;

  let styles = getStyles(iconSize, value);

  useEffect(() => {
    styles = getStyles(iconSize, value);
  }, [value]);

  useEffect(() => {
    if (isHappy) {
      heartAnimation.value = withTiming(1);
      personSize.value = withTiming(1.1);
      setTimeout(() => {
        personSize.value = withTiming(1);
        heartAnimation.value = withTiming(0);
      }, 1000);
    }
    if (isSad) {
      cloudAnimation.value = withTiming(1);
      personSize.value = withTiming(0.9);
      setTimeout(() => {
        personSize.value = withTiming(1);
        cloudAnimation.value = withTiming(0);
      }, 1000);
    }
  }, [cloudAnimation, heartAnimation, isSad, isHappy, personSize]);

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

  const personScale = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: (personSize.value - 1) * -50 },
        { scale: personSize.value },
      ],
    };
  });

  return (
    <>
      <View style={styles.wrapper}>
        <Animated.View style={[animatedHeart, styles.heartWrapper]}>
          <Image
            source={Images.jaugeEffects.up}
            style={styles.heartImage}
          />
        </Animated.View>
        <Animated.View style={[animatedCloud, styles.cloudWrapper]}>
          <Image
            source={Images.jaugeEffects.down}
            style={styles.cloudImage}
          />
        </Animated.View>
        <Animated.View style={personScale}>
          <ProgressBar value={value} />
          <Image source={Images.jauges[base].full} style={styles.personImage} />
        </Animated.View>
      </View >
    </>
  );
};

const getStyles = (iconSize, value) => StyleSheet.create({
  mask: {
    overflow: "hidden",
  },
  maskImage: {
    margin: `${Math.floor(iconSize * (value / 100))}pt 0 0 0`
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  personImage: {
    height: iconSize,
    width: iconSize,
  },
  heartImage: {
    height: 55,
    width: 55,
  },
  heartWrapper: {
    position: 'absolute',
    bottom: 105,
  },
  cloudImage: {
    height: 65,
    width: 65,
  },
  cloudWrapper: {
    position: 'absolute',
    bottom: 95,
  },
});

export default PowerPerson;
