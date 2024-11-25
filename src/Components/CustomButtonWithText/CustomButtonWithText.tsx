import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontSize from '../../Utils/FontSize';
import {useApplicationContext} from '../../Context/ApplicationContext';
import Styles from './Styles';

type CustomButtonWithTextProps = {
  title: string;
  onAction: () => void;
};
const CustomButtonWithText = ({title, onAction}: CustomButtonWithTextProps) => {
  const {textColor, borderColor} = useApplicationContext().appTheme;
  return (
    <TouchableOpacity
      style={[Styles.container, {borderColor: borderColor}]}
      onPress={onAction}>
      <Text style={[Styles.title, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtonWithText;
