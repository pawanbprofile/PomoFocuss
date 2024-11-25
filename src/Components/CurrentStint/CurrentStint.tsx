import {View, Text, Pressable, Dimensions} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';
import {STINT, STINT_STATUS} from '../../Interfaces';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useSessionContext} from '../../Context/SessionContext';

type CurrentStintProps = {
  currentStint: STINT;
  status: string;
  onEvent: () => void;
  isPlaying: boolean;
  disable: boolean;
};
const CurrentStint = ({
  currentStint,
  status,
  onEvent,
  isPlaying,
  disable,
}: CurrentStintProps) => {
  const padding = Dimensions.get('window').width / 2;
  const {textColor} = useApplicationContext().appTheme;
  const translateY = useSharedValue(0);
  const paddingX = useSharedValue(0);
  const animatedFont = useSharedValue(16);
  const {sessionTime, breakTime, longBreakTime} = useSessionContext();
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  const moveRight = useAnimatedStyle(() => {
    return {
      translateX: paddingX.value,
    };
  });
  const moveLeft = useAnimatedStyle(() => {
    return {
      translateX: -paddingX.value,
    };
  });

  const reanimatedFont = useAnimatedStyle(() => {
    return {
      fontSize: animatedFont.value,
    };
  });

  const duration = useMemo(() => {
    switch (currentStint) {
      case STINT.FOCUS: {
        return sessionTime > 1 ? sessionTime + ' MINS' : sessionTime + ' MIN';
      }
      case STINT.SHORT_BREAK: {
        return breakTime > 1 ? breakTime + ' MINS' : breakTime + ' MIN';
      }
      case STINT.LONG_BREAK: {
        return longBreakTime > 1
          ? longBreakTime + ' MINS'
          : longBreakTime + ' MIN';
      }
      default: {
        return sessionTime > 1 ? sessionTime + ' MINS' : sessionTime + ' MIN';
      }
    }
  }, [currentStint, sessionTime, breakTime, longBreakTime]);

  useEffect(() => {
    paddingX.value = isPlaying
      ? withTiming(
          padding,
          {duration: 300},
          finished => (animatedFont.value = withTiming(20, {duration: 200})),
        )
      : withTiming(
          0,
          {duration: 500},
          finished => (animatedFont.value = withTiming(16, {duration: 200})),
        );
  }, [isPlaying]);

  return (
    <View style={Styles.mainContainer}>
      <Pressable
        disabled={disable}
        onPress={() => {
          translateY.value = withRepeat(
            withTiming(12, {duration: 100}),
            2,
            true,
            finished => {
              if (finished) runOnJS(onEvent)();
            },
          );
        }}>
        {({pressed}) => (
          <View
            style={[
              Styles.container,
              {backgroundColor: pressed ? 'grey' : 'transparent'},
            ]}>
            <Animated.View
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingLeft: 32,
                },
                moveLeft,
              ]}>
              <Icon name={'chevron-up'} size={10} color={textColor} />
              <Icon name={'chevron-down'} size={10} color={textColor} />
            </Animated.View>
            <Animated.View
              style={[
                {
                  alignSelf: 'center',
                  justifyContent: 'center',
                },
                reanimatedStyle,
              ]}>
              <Animated.Text
                style={[
                  Styles.text,
                  {color: textColor, textAlignVertical: 'center'},
                  reanimatedFont,
                ]}>
                {status}
              </Animated.Text>
            </Animated.View>
            <Animated.View style={moveRight}>
              <Text style={[Styles.textTime, {color: textColor}]}>
                {duration}
              </Text>
            </Animated.View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CurrentStint;
