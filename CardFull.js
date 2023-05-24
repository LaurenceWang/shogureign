import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withSpring,
	interpolate,
	Extrapolate,
	runOnJS,
} from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import CardPerson from './CardPerson';
import CardReverse from './CardReverse';

const Card = ({
	onChooseLeftAnswer,
	onChooseRightAnswer,
	leftText,
	rightText,
	character,
	backgroundColor,
}) => {
	const [isActive, setIsActive] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const x = useSharedValue(0);
	const y = useSharedValue(0);

	const textOpacityMultiplier = useSharedValue(1);
	const openAnimation = useSharedValue(1);

	const cardSpringConfig = {
		damping: 100,
		stiffness: 90,
		mass: 0.5,
	};

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
			if (event.velocityX > 500 || event.translationX > 150) {
				x.value = withSpring(400, {
					velocity: event.velocityX,
				});
				textOpacityMultiplier.value = withTiming(0, { duration: 100 });
				runOnJS(onChooseRightAnswer)();
			} else if (event.velocityX < -500 || event.translationX < -150) {
				x.value = withSpring(-400, {
					velocity: event.velocityX,
				});
				textOpacityMultiplier.value = withTiming(0, { duration: 100 });
				runOnJS(onChooseLeftAnswer)();
			} else {
				x.value = withSpring(0, cardSpringConfig);
			}
			y.value = withSpring(0, cardSpringConfig);
		},
	});

	useEffect(() => {
		// I give time for images to load up without blinking
		setShowCard(true);
		setTimeout(() => {
			openAnimation.value = withTiming(2, {
				duration: 1000,
			});
			setTimeout(() => {
				setIsActive(true);
			}, 1000);
		}, 200);
	}, []);

	const animatedMovableCard = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: x.value },
				{ translateY: y.value },
				{
					rotateZ: interpolate(
						x.value,
						[-50, 50],
						[-0.05, 0.05],
						Extrapolate.EXTEND,
					),
				},
			],
		};
	});

	const animatedFront = useAnimatedStyle(() => {
		return {
			opacity: openAnimation.value >= 1.5 ? 1 : 0,
			transform: [
				{
					scale: interpolate(openAnimation.value, [1, 1.5, 2], [1, 1.2, 1]),
				},
				{ perspective: openAnimation.value * 180 },
				{ rotateY: `${openAnimation.value * 180}deg` },
			],
		};
	});

	const animatedBack = useAnimatedStyle(() => {
		return {
			opacity: openAnimation.value <= 1.5 ? 1 : 0,
			transform: [
				{
					scale: interpolate(openAnimation.value, [1, 1.5, 2], [1, 1.2, 1]),
				},
				{ perspective: openAnimation.value * 180 },
				{ rotateY: `${openAnimation.value * 180}deg` },
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
			opacity:
				textOpacityMultiplier.value *
				interpolate(x.value, [15, 70], [0, 1], Extrapolate.CLAMP),
			transform: [
				{
					rotateZ: interpolate(
						x.value,
						[0, 50],
						[0, -0.03],
						Extrapolate.EXTEND,
					),
				},
			],
		};
	});

	const animatedLeftTextWrapper = useAnimatedStyle(() => {
		return {
			opacity:
				textOpacityMultiplier.value *
				interpolate(x.value, [-15, -70], [0, 1], Extrapolate.CLAMP),
			transform: [
				{
					rotateZ: interpolate(
						x.value,
						[-50, 0],
						[0.03, 0],
						Extrapolate.EXTEND,
					),
				},
			],
		};
	});

	return (
		<>
			<View style={[{ opacity: showCard ? 1 : 0 }, styles.cardWrapper]}>
				<Animated.View style={[animatedBack, styles.wrapperBack]}>
					<Animated.View style={[animatedBackShadow, styles.shadow]} />
					<CardReverse />
				</Animated.View>
				<PanGestureHandler onGestureEvent={gestureHandler} enabled={isActive}>
					<Animated.View style={animatedFront}>
						<Animated.View
							style={[animatedMovableCard, styles.wrapper, { backgroundColor }]}>
							<Animated.View
								style={[animatedRightTextWrapper, styles.topTextWrapper]}>
								<Animated.Text style={styles.topText}>
									{rightText}
								</Animated.Text>
							</Animated.View>
							<Animated.View
								style={[animatedLeftTextWrapper, styles.topTextWrapper]}>
								<Animated.Text style={[styles.topText, styles.textLeft]}>
									{leftText}
								</Animated.Text>
							</Animated.View>
							<CardPerson image={image} />
							<Animated.View style={[animatedFrontShadow, styles.shadow]} />
						</Animated.View>
					</Animated.View>
				</PanGestureHandler>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		height: 340,
		width: 340,
		borderRadius: 35,
		overflow: 'hidden',
	},
	wrapperBack: {
		height: 340,
		width: 340,
		borderRadius: 35,
		overflow: 'hidden',
		position: 'absolute',
	},
	cardWrapper: {
		height: 240,
	},
	topTextWrapper: {
		position: 'absolute',
		width: '120%',
		left: '-10%',
		top: '-10%',
		paddingTop: '15%',
		paddingHorizontal: '15%',
		backgroundColor: 'rgba(0,0,0,0.4)',
		padding: 15,
		zIndex: 10,
	},
	topText: {
		color: '#fff',
	},
	textLeft: {
		textAlign: 'right',
	},
	shadow: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: '#000',
		zIndex: 10,
	},
});

export default Card;
