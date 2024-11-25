import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Styles from './Styles';
import SessionItem from '../SessionItem';
import Sizes from '../../Utils/Sizes';
import Colors from '../../Utils/Colors';
import FontSize from '../../Utils/FontSize';
import SwitchText from '../SwitchText';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import {SESSIONTYPE, useSessionContext} from '../../Context/SessionContext';
type SessionsProps = {
  onEvent: (type: SESSIONTYPE) => void;
};
const Sessions = ({onEvent}: SessionsProps) => {
  const {textColor, borderColor} = useApplicationContext().appTheme;
  const {
    sessionTime,
    breakTime,
    longBreakTime,
    autoStartBreaks,
    autoStartPomodoros,
    toggleAutoStartBreaks,
    toggleAutoStartPomodoros,
  } = useSessionContext();

  const handleEvent = (type: SESSIONTYPE) => {
    onEvent(type);
  };
  return (
    <View style={[Styles.container, {borderColor: borderColor}]}>
      <Text style={[Styles.title, {color: textColor}]}>Sessions</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SessionItem
          title={'FOCUS'}
          period={sessionTime}
          type={SESSIONTYPE.SESSION}
          onEvent={handleEvent}
        />
        <SessionItem
          title={'BREAK'}
          period={breakTime}
          type={SESSIONTYPE.BREAK}
          onEvent={handleEvent}
        />
        <SessionItem
          title={'LONG BREAK'}
          period={longBreakTime}
          type={SESSIONTYPE.LONGBREAK}
          onEvent={handleEvent}
        />
      </View>
      <SwitchText
        title="Auto Start Breaks"
        onEvent={(value: boolean) => {
          toggleAutoStartBreaks(value);
        }}
        initialState={autoStartBreaks}
      />
      <SwitchText
        title="Auto Start Pomodoros"
        onEvent={(value: boolean) => toggleAutoStartPomodoros(value)}
        initialState={autoStartPomodoros}
      />
    </View>
  );
};

export default Sessions;
