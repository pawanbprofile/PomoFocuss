import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Styles from './Styles';
import Colors from '../../Utils/Colors';
import Sizes from '../../Utils/Sizes';
import FontSize from '../../Utils/FontSize';
import PreferenceButton from '../PreferenceButton';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ApplicationContext,
  AppTheme,
  useApplicationContext,
} from '../../Context/ApplicationContext';
const height = Dimensions.get('window').height;
type BottomSheetModalProps = {
  hideBottomSheet: () => void;
};
const BottomSheetModal = ({hideBottomSheet}: BottomSheetModalProps) => {
  const {id} = useApplicationContext().appTheme;
  const translateY = useSharedValue(height * 0.55);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const closeModal = () => {
    try {
      translateY.value = withTiming(height * 0.55, {duration: 1000}, () => {
        runOnJS(hideBottomSheet)();
      });
    } catch (error) {
      console.log('error closing modal ', error);
    }
  };

  const openModal = () => {
    try {
      translateY.value = withTiming(0, {duration: 600});
    } catch (error) {
      console.log('Error opening modal ', error);
    }
  };

  useEffect(() => {
    openModal();
  }, []);
  return (
    <TouchableOpacity
      style={Styles.container}
      activeOpacity={1}
      onPress={closeModal}>
      <Animated.View
        style={[
          {
            height: '55%',
            backgroundColor: '#000000',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 12,
          },
          reanimatedStyle,
        ]}>
        <View
          style={{
            width: 50,
            height: 6,
            borderRadius: 8,
            alignSelf: 'center',
            backgroundColor: Colors.Backgorunds.Coffee,
            marginBottom: 16,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.Large,
            fontWeight: '600',
            color: 'white',
          }}>
          Theme Preferences
        </Text>
        <View
          style={{
            height: 200,
            justifyContent: 'space-between',
            marginTop: 24,
          }}>
          <PreferenceButton
            title={'Tomato'}
            textColor={Colors.Backgorunds.Tomato}
            isSelected={id === AppTheme.TOMATO}
            id={AppTheme.TOMATO}
            onPress={closeModal}
          />
          <PreferenceButton
            title={'Coffee'}
            textColor={Colors.Backgorunds.Coffee}
            isSelected={id === AppTheme.COFFEE}
            id={AppTheme.COFFEE}
            onPress={closeModal}
          />
          <PreferenceButton
            title={'Shadow'}
            textColor={Colors.Backgorunds.Shadow}
            isSelected={id === AppTheme.SHADOW}
            id={AppTheme.SHADOW}
            onPress={closeModal}
          />
        </View>
        <Text
          style={{
            color: Colors.Fonts.Coffee,
            flex: 1,
            textAlignVertical: 'center',
            textAlign: 'justify',
            paddingHorizontal: 24,
          }}>
          * Select your preferred theme mode to choose text, background and icon
          colors.
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default BottomSheetModal;
