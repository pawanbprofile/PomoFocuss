import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  Vibration,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrentStint from '../../Components/CurrentStint/CurrentStint';
import {STINT, STINT_STATUS} from '../../Interfaces';
import Timer from '../../Components/Timer/Timer';
import Audi from '../../Components/Audi/Audi';
import PlayPause from '../../Components/PlayPause/PlayPause';
import {useSessionContext} from '../../Context/SessionContext';
import Constants from '../../Storage/Constants';
import Sound from 'react-native-sound';
import ResetButton from '../../Components/ResetButton/ResetButton';
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const {backgroundColor, barStyle, textColor} =
    useApplicationContext().appTheme;
  const vibrate = useApplicationContext().vibrate;
  const [stintStatus, setStintStatus] = useState<STINT_STATUS>(
    STINT_STATUS.INITIAL,
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const {sessionTime, breakTime, longBreakTime} = useSessionContext();
  const [currentStint, setCurrentStint] = useState<STINT>(STINT.FOCUS);
  const audio = require('../../../assets/audio/notice.mp3');
  var notify = new Sound(audio, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const interval = useMemo(() => {
    let timePeriod = 0;

    switch (currentStint) {
      case STINT.FOCUS: {
        timePeriod = sessionTime * 60 * 1000;
        break;
      }
      case STINT.SHORT_BREAK: {
        timePeriod = breakTime * 60 * 1000;
        break;
      }
      case STINT.LONG_BREAK: {
        timePeriod = longBreakTime * 60 * 1000;
        break;
      }
    }
    return timePeriod;
  }, [currentStint, sessionTime, breakTime, longBreakTime]);
  const [duration, setDuration] = useState(interval);
  useEffect(() => {
    setDuration(interval);
  }, [interval]);
  const minutes = useMemo(() => {
    const result = (Math.floor(duration / 1000 / 60) % 60) % 100;
    return result < 10 ? '0' + result : '' + result;
  }, [duration]);

  const seconds = useMemo(() => {
    const result = (Math.floor(duration / 1000) % 60) % 100;
    return result < 10 ? '0' + result : '' + result;
  }, [duration]);

  const status = useMemo(() => {
    if (currentStint === STINT.FOCUS) {
      return Constants.FOCUS;
    } else if (currentStint === STINT.SHORT_BREAK) {
      return Constants.BREAK;
    } else return Constants.LONG_BREAK;
  }, [currentStint]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [interval]);

  useEffect(() => {
    if (timerRef.current && !isPlaying) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setDuration(prev => {
        if (isPlaying && timerRef.current) {
          if (prev === 0) {
            clearInterval(timerRef.current);
            //call on end event
            vibrate && Vibration.vibrate(500);
            notify.play();
            setIsPlaying(false);
            nextStint();
            return prev;
          } else {
            return prev - 1000;
          }
        } else {
          return prev;
        }
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const nextStint = () => {
    switch (currentStint) {
      case STINT.FOCUS: {
        setCurrentStint(STINT.SHORT_BREAK);
        break;
      }
      case STINT.SHORT_BREAK: {
        setCurrentStint(STINT.LONG_BREAK);
        break;
      }
      default: {
        setCurrentStint(STINT.FOCUS);
        break;
      }
    }
  };

  useEffect(() => {
    Sound.setCategory('Playback');
    return () => {
      notify.release();
    };
  }, []);

  return (
    <SafeAreaView
      style={[Styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          disabled={isPlaying}
          style={{alignSelf: 'flex-end', padding: 24}}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Icon name={'settings-outline'} size={28} color={textColor} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CurrentStint
          currentStint={currentStint}
          status={status}
          isPlaying={isPlaying}
          onEvent={() => nextStint()}
          disable={isPlaying}
        />
        <Timer minutes={minutes} seconds={seconds} />
        <Audi />
        <PlayPause
          isPlaying={isPlaying}
          onEvent={() => {
            setIsPlaying(prev => !prev);
          }}
        />
        <View style={{width: '100%', minHeight: 95}}>
          {!isPlaying && duration < interval ? (
            <ResetButton
              isPlaying={isPlaying}
              onReset={() => {
                setDuration(interval);
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
