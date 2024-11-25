import {Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ResetButtonProps = {
  isPlaying: boolean;
  onReset: () => void;
};

const ResetButton = ({isPlaying, onReset}: ResetButtonProps) => {
  const {textColor} = useApplicationContext().appTheme;
  const opacity = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = isPlaying
      ? withTiming(0, {duration: 300})
      : withTiming(1, {duration: 0});
  }, [isPlaying]);
  return (
    <Animated.View style={[Styles.resetContainer, reanimatedStyle]}>
      <Pressable
        disabled={isPlaying}
        onPress={() => {
          console.log('resetting');
          onReset();
        }}>
        <Text style={[Styles.reset, {color: textColor}]}>RESET</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ResetButton;
