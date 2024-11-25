import {View, Text, Switch, Platform} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontSize from '../../Utils/FontSize';
import Colors from '../../Utils/Colors';
import Sizes from '../../Utils/Sizes';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import useStateCallback from '../../hooks/UseStateCallback';
type SwitchTextProps = {
  title: string;
  onEvent: (val: boolean) => void;
  initialState: boolean;
};
const SwitchText = ({title, onEvent, initialState}: SwitchTextProps) => {
  const {buttonColor, textColor, backgroundColor} =
    useApplicationContext().appTheme;
  const [isEnabled, setIsEnabled] = useStateCallback<boolean>(initialState);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled, (value: any) => onEvent(value));
  };
  const isAndroid = Platform.OS === 'android';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.Margin.Large,
        marginBottom: isAndroid ? Sizes.Margin.Medium : 0,
      }}>
      <Text
        style={{
          fontSize: FontSize.Medium,
          color: textColor,
          fontFamily: 'Inter 24pt',
          textAlignVertical: 'center',
          flex: 1,
        }}>
        {title}
      </Text>
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
    </View>
  );
};

export default SwitchText;
