import {View, Text} from 'react-native';
import React from 'react';
import {useApplicationContext} from '../../Context/ApplicationContext';
import Sizes from '../../Utils/Sizes';
type PrivacyPolicyItemProps = {
  title: string;
  value: string;
};
const PrivacyPolicyItem = ({title, value}: PrivacyPolicyItemProps) => {
  const {textColor, backgroundColor, borderColor} =
    useApplicationContext().appTheme;
  return (
    <View style={{width: '100%'}}>
      <Text
        style={{
          color: textColor,
          textAlign: 'left',
          fontSize: 20,
          marginTop: 12,
          width: '100%',
          fontFamily: 'Inter 24pt',
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: textColor,
          textAlign: 'justify',
          fontSize: 14,
          width: '100%',
          fontFamily: 'Inter 24pt',
          marginVertical: Sizes.Margin.Medium,
        }}>
        {value}
      </Text>
    </View>
  );
};

export default PrivacyPolicyItem;
