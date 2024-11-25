import {View, Text} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';

const Audi = () => {
  const {textColor} = useApplicationContext().appTheme;
  return (
    <View style={Styles.container}>
      <Text style={[Styles.circle, {color: textColor}]}>o</Text>
      <Text style={[Styles.circle, {color: textColor}]}>o</Text>
      <Text style={[Styles.circle, {color: textColor}]}>o</Text>
      <Text style={[Styles.circle, {color: textColor}]}>o</Text>
    </View>
  );
};

export default Audi;
