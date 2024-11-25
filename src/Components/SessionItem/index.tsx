import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Styles from './Styles';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import {SESSIONTYPE} from '../../Context/SessionContext';

type SessionItemProps = {
  title: string;
  period: number;
  type: SESSIONTYPE;
  onEvent: (type: SESSIONTYPE) => void;
};

const SessionItem = ({title, period, type, onEvent}: SessionItemProps) => {
  const {textColor} = useApplicationContext().appTheme;
  return (
    <TouchableOpacity style={Styles.container} onPress={() => onEvent(type)}>
      <Text style={[Styles.period, {color: textColor}]}>{period}</Text>
      <Text
        style={[Styles.title, , {color: textColor}]}
        numberOfLines={1}
        ellipsizeMode="middle">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SessionItem;
