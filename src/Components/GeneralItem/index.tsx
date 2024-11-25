import {View, Text, Switch, TouchableOpacity, Platform} from 'react-native';
import React, {useContext, useState} from 'react';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Utils/Colors';
import Sizes from '../../Utils/Sizes';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
type GeneralItemProps = {
  icon: string;
  title: string;
  subtitle?: string;
  toggle?: boolean;
  onPress?: () => void;
  onToggle?: (val: boolean) => void;
};

const GeneralItem = ({
  title,
  subtitle,
  toggle,
  icon,
  onPress,
  onToggle,
}: GeneralItemProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    console.log('toggling');
    setIsEnabled(prevState => !prevState);
    onToggle && onToggle(!isEnabled);
  };
  const {backgroundColor, buttonColor, textColor} =
    useApplicationContext().appTheme;
  const isAndroid = Platform.OS === 'android';
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={() => {
        console.log('toggle ', toggle);
        onPress ? (!toggle ? onPress() : toggleSwitch()) : toggleSwitch();
      }}>
      <Icon name={icon} size={22} color={textColor} />
      <View style={{flex: 1, marginHorizontal: Sizes.Margin.Large}}>
        <Text style={[Styles.title, {color: textColor}]}>{title}</Text>
        {subtitle ? (
          <Text style={[Styles.subTitle, {color: textColor}]}>{subtitle}</Text>
        ) : null}
      </View>
      {toggle ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Switch
            trackColor={{
              false: Colors.Backgorunds.Grey,
              true: Colors.Backgorunds.green,
            }}
            thumbColor={Colors.Backgorunds.Grey}
            ios_backgroundColor={buttonColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
              transform: [
                {scaleX: isAndroid ? 1 : 0.7},
                {scaleY: isAndroid ? 1 : 0.7},
              ],
            }}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default GeneralItem;
