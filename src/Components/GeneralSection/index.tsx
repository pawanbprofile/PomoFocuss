import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Styles from './Styles';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
type GeneralSectionParams = {
  title: string;
  children: React.ReactNode;
};
const GeneralSection = ({title, children}: GeneralSectionParams) => {
  const {textColor, borderColor} = useApplicationContext().appTheme;
  return (
    <View style={[Styles.container, {borderColor: borderColor}]}>
      <Text style={[Styles.title, {color: textColor}]}>{title}</Text>
      {children}
    </View>
  );
};

export default GeneralSection;
