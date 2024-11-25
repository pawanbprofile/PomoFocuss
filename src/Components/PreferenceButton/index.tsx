import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Styles from './Styles';
import Colors from '../../Utils/Colors';
import {
  ApplicationContext,
  AppTheme,
  useApplicationContext,
} from '../../Context/ApplicationContext';

type PreferenceButtonParams = {
  title: string;
  isSelected?: boolean;
  textColor: string;
  id: AppTheme;
  onPress: () => void;
};

const PreferenceButton = ({
  title,
  isSelected,
  textColor,
  id,
  onPress,
}: PreferenceButtonParams) => {
  const {updateAppTheme} = useApplicationContext();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('update app theme');
        updateAppTheme(id);
        onPress();
      }}
      style={[
        Styles.container,
        {
          borderWidth: isSelected ? 1 : 0,
          borderColor: Colors.Fonts.Grey,
          backgroundColor: '#212424',
          paddingHorizontal: 24,
        },
      ]}>
      <Text style={Styles.title}>{title}</Text>
      <View style={[Styles.indicator, {backgroundColor: textColor}]} />
    </TouchableOpacity>
  );
};

export default PreferenceButton;
