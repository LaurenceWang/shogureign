/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import {StyleSheet, View, Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import CardReverse from './CardReverse';
import BackStatic from './BackgroundStatic';

import useKanjiCards from './Kanjitab';
const {KanjiCards} = useKanjiCards();

const MultipleCard = ({
  onChooseWestAnswer,
  onChooseEastAnswer,
  onChooseNorthAnswer,
  onChooseSouthAnswer,
  westText,
  eastText,
  northText,
  southText,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const openAnimation = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (event.translationX > 50 && event.translationY < event.translationX && (-event.translationX) < event.translationY) {

        runOnJS(onChooseEastAnswer)(eastText);
      } else if (event.translationX < -50 && event.translationY > event.translationX && (-event.translationX) > event.translationY ) {

        runOnJS(onChooseWestAnswer)(westText);
      } else if (event.translationY > -50 && event.translationX > event.translationY && (-event.translationY) > event.translationX) {

        runOnJS(onChooseSouthAnswer)(southText);
      } else if (event.translationY < 50 && event.translationX < event.translationY && (-event.translationY) < event.translationX ) {

        runOnJS(onChooseNorthAnswer)(northText);
      }
      else {
      x.value = withSpring(0, {velocity: event.velocityX});
      }
      y.value = withSpring(0, {velocity: event.velocityY});
    },
  });

  useEffect(() => {
    setShowCard(true);
    openAnimation.value = withDelay(
      80,
      withTiming(
        2,
        {
          duration: 600,
        },
        () => {
          runOnJS(setIsActive)(true);
        },
      ),
    );
  }, []);

  const animatedMovableCard = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {
          rotateZ: `${interpolate(
            x.value,
            [-50, 50],
            [-0.05, 0.05],
            Extrapolate.EXTEND,
          )}rad`,
        },
      ],
    };
  });

  const animatedFront = useAnimatedStyle(() => { // reversing card animation
    return {
      opacity: openAnimation.value >= 1.5 ? 1 : 0,
      transform: [
        {
          scale: interpolate(openAnimation.value, [1, 1.5, 2], [1, 1.2, 1]),
        },
        {perspective: openAnimation.value * 180},
        {rotateY: `${openAnimation.value * 180}deg`},
      ],
    };
  });

  const animatedBack = useAnimatedStyle(() => { // reversing card animation
    return {
      opacity: openAnimation.value <= 1.5 ? 1 : 0,
      transform: [
        {
          scale: interpolate(openAnimation.value, [1, 1.5, 2], [1, 1.2, 1]),
        },
        {perspective: openAnimation.value * 180},
        {rotateY: `${openAnimation.value * 180}deg`},
      ],
    };
  });

  const animatedBackShadow = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        openAnimation.value,
        [1, 1.5],
        [0, 0.3],
        Extrapolate.CLAMP,
      ),
    };
  });

  const animatedFrontShadow = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        openAnimation.value,
        [1.5, 2],
        [0.3, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const animatedRightTextWrapper = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [15, 70], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          rotateZ: `${interpolate(
            x.value,
            [0, 50],
            [0, -0.03],
            Extrapolate.EXTEND,
          )}rad`,
        },
      ],
    };
  });

  const animatedLeftTextWrapper = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [-15, -70], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          rotateZ: `${interpolate(
            x.value,
            [-50, 0],
            [0.03, 0],
            Extrapolate.EXTEND,
          )}rad`,
        },
      ],
    };
  });

  const animatedUpTextWrapper = useAnimatedStyle(() => {
    return {
      opacity: interpolate(y.value, [-15, -70], [0, 1], Extrapolate.CLAMP),
      
    };
  });

  const animatedDownTextWrapper = useAnimatedStyle(() => {
    return {
      opacity: interpolate(y.value, [15, 70], [0,1], Extrapolate.CLAMP),
      
    };
  });

  return (
    <>
      <View style={[{opacity: showCard ? 1 : 0}, styles.cardWrapper]}>

        <Animated.View style={[animatedBack, styles.wrapperBack]}>
          <Animated.View style={[animatedBackShadow, styles.shadow]} />
          <CardReverse />
        </Animated.View>
        <PanGestureHandler onGestureEvent={gestureHandler} enabled={isActive}>
          <Animated.View style={animatedFront}>
            <View style={[styles.wrapper]}>
              <BackStatic/>
              <Text style={styles.textUp}>{northText}</Text>     
              <Text style={styles.textLeft}>{westText}</Text>
              <Text style={styles.textRight}>{eastText}</Text>
              <Text style={styles.textDown}>{southText}</Text>
            </View>
            <Animated.View
              style={[styles.kanji, animatedMovableCard]}>
              <Animated.View style={[animatedFrontShadow, styles.shadow]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  
  kanji: {
    backgroundColor: 'red',
    color: 'blue',
    position: 'absolute',
    height: 50,
    width: 50,
    left: 145,
    top: 145,
    borderRadius: 5,
  },
  
  wrapper: {
    height: 340,
    width: 340,
    borderRadius: 35,
  },
  wrapperBack: {
    height: 340,
    width: 340,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'absolute',
  },
  cardWrapper: {
    height: 340,
  },
  topTextWrapper: {
    height: 340,
    width: 340,
    borderRadius: 35,
  },

  textUp: {
    textAlign: 'center',
    top: -320,
    fontSize: 80,
  },
  
  textLeft: {
    top: -340,
    left: 20,
    fontSize: 80,
  },

  textRight: {
    top: -445,
    left: -20,
    textAlign: 'right',
    fontSize: 80,
  },

  textDown: {
    textAlign: 'center',
    top: -430,
    fontSize: 80,
  },
  shadow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    zIndex: 10,
  },
});

export default MultipleCard;