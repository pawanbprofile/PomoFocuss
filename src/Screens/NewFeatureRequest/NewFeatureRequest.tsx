import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';
import InputField from '../../Components/InputField/InputField';
import Sizes from '../../Utils/Sizes';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import sendEmail from '../../Utils/Helpers/Mail';
import validator from 'validator';
import Colors from '../../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
const title =
  'Write your suggestion or problem here. We will find out problem and convert it into app feature.';
const NewFeatureRequest = () => {
  const navigation = useNavigation();
  const {backgroundColor, barStyle, textColor} =
    useApplicationContext().appTheme;
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [mailBody, setMailBody] = useState<string>('');
  const [validDetails, setValidDetails] = useState<boolean>(true);
  const translateY = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const translateX = useSharedValue(0);
  const reanimatedError = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (email.length > 0 || mobileNumber.length > 0 || mailBody.length > 0) {
      setValidDetails(
        validator.isEmail(email) &&
          validator.isLength(mobileNumber) === 10 &&
          validator.isLength(mailBody) >= 25,
      );
    }
  }, [email, mobileNumber, mailBody]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const opeEmail = () => {
    if (validDetails) {
      sendEmail(
        email,
        'New Feature Request',
        `We need your feedback : call:${mobileNumber}`,
      ).then(() => navigation.goBack());
    }
  };
  useEffect(() => {
    if (!validDetails) {
      console.log('Details invalid');
      translateX.value = withRepeat(withTiming(12, {duration: 100}), 5, true);
    } else {
      //enable button
    }
  }, [validDetails]);

  useEffect(() => {
    translateY.value = keyboardVisible
      ? withTiming(100, {duration: 400})
      : withTiming(0, {duration: 500});
  }, [keyboardVisible]);

  return (
    <SafeAreaView style={[Styles.container, {backgroundColor}]}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <Text
        style={[
          {
            color: textColor,
            fontFamily: 'Inter 24pt',
            marginBlock: Sizes.Margin.Medium,
          },
        ]}>
        {title}
      </Text>
      <InputField
        height={50}
        placeHolder="Enter your email"
        value={email}
        onValueChange={setEmail}
        title={'Email'}
        isParameter
      />
      <InputField
        height={50}
        placeHolder="Enter your number"
        isNumeric={true}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        title={'Mobile Number'}
        isParameter
      />

      <InputField
        height={240}
        placeHolder="Type your question"
        value={mailBody}
        onValueChange={setMailBody}
        title={'Question'}
      />
      {!validDetails && (
        <Animated.View
          style={[
            {
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            },
            reanimatedError,
          ]}>
          <Text
            style={{
              color: '#FF5349',
              textAlign: 'left',
              width: '100%',
              paddingHorizontal: 8,
            }}>
            Invalid details. Please check
          </Text>
        </Animated.View>
      )}
      <Animated.View style={[Styles.buttonContainer, reanimatedStyle]}>
        <TouchableOpacity
          disabled={!validDetails}
          style={[
            Styles.button,
            {
              backgroundColor: validDetails
                ? textColor
                : Colors.Backgorunds.Grey,
            },
          ]}
          onPress={opeEmail}>
          <Text
            style={[
              Styles.buttonText,
              {color: !validDetails ? Colors.Fonts.Grey : backgroundColor},
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default NewFeatureRequest;
