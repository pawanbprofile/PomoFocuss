import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';

type TimerProps = {
  minutes: string;
  seconds: string;
};
const Timer = ({minutes, seconds}: TimerProps) => {
  const {textColor} = useApplicationContext().appTheme;

  return (
    <View style={Styles.container}>
      <Text style={[Styles.value, {color: textColor}]}>{minutes}</Text>
      <Text style={[Styles.value, {color: textColor}]}>:</Text>
      <Text style={[Styles.value, {color: textColor}]}>{seconds}</Text>
    </View>
  );
};

export default React.memo(Timer);
