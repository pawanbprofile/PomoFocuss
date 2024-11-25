import {View, Text, TextInput, TextStyle} from 'react-native';
import React from 'react';
import Styles from './Styles';
import Colors from '../../Utils/Colors';
import {useApplicationContext} from '../../Context/ApplicationContext';

type InputFieldProps = {
  height: number;
  placeHolder: string;
  isNumeric?: boolean;
  title: string;
  value: string;
  onValueChange: (val: string) => void;
  isParameter?: boolean;
};
const InputField = ({
  placeHolder,
  height,
  isNumeric,
  title,
  value,
  onValueChange,
  isParameter,
}: InputFieldProps) => {
  const {borderColor, textColor} = useApplicationContext().appTheme;
  return (
    <View style={Styles.container}>
      <Text style={{color: textColor, marginBlock: 8}}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onValueChange}
        style={[
          Styles.text,
          {borderColor},
          {
            height,
            textAlign: 'justify',
            textAlignVertical: isParameter ? 'center' : 'top',
            color: textColor,
            flexWrap: 'wrap',
          },
        ]}
        multiline={true}
        keyboardType={isNumeric ? 'number-pad' : 'ascii-capable'}
        underlineColorAndroid={'transparent'}
        autoCorrect={false}
        autoCapitalize="sentences"
        placeholder={placeHolder}
        placeholderTextColor={'#ADADADA0'}
      />
    </View>
  );
};

export default InputField;
