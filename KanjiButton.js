import { StyleSheet, View, Text, Pressable, } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const KanjiButton = ({ onPress }) => {
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
                uri: 'https://cdn-icons-png.flaticon.com/512/5078/5078655.png',
              }}
              style={styles.Icon}
            />
            <Text style={styles.text}>Dictionnaire</Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperBack: {
    height: '20%',
    width: '42%',
    borderRadius: 35,
    overflow: 'hidden',
  },
  cardWrapper: {
    height: '100%',
    width: '100%',
    left: '7%',
    top: '15%',
    position: 'absolute'
  },
  iconFull: {
    height: '100%',
    width: '100%'
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#FFCCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    /*height: '90%',
    width: '90%',
    position: 'absolute',
    left: '5%'*/
    height: '50%',
    width: '50%',
  },
  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '20%',
    width: '42%',
    backgroundColor: 'black',
  },
  text: {
    //paddingTop: 133,
    //paddingLeft:33,


  },
});

export default KanjiButton;
