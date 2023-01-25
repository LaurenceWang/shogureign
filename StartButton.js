import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const StartButton = ({ onPress }) => {
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
    <View style={styles.cardWrapper}>
      <Pressable style={styles.wrapperBack} onPress={onPressCard}>
        <Animated.View style={[animatedWrapper, styles.iconFull]}>
          <View style={styles.wrapper}>
            <FastImage
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3088/3088267.png',
              }}
              style={styles.reverseIcon}
            />
            <Text style={styles.text}>Jouer</Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperBack: {
    position: 'absolute',
    height: '70%',
    width: '42%',
    borderRadius: 35,
    overflow: 'hidden',
  },
  cardWrapper: {
    height: '100%',
    width: '100%',
    left: '50%',
    top: '10%',
  },
  iconFull: {
    height: '100%',
    width: '100%'
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
    height: '70%',
    width: '42%',
    backgroundColor: 'black',
  },
  text: {
    marginTop : 20,
  },
});

export default StartButton;
