import {View, Text, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import Styles from './Styles';
import Sessions from '../../Components/Sessions';
import GeneralSection from '../../Components/GeneralSection';
import GeneralItem from '../../Components/GeneralItem';
import {
  ApplicationContext,
  AppTheme,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import BottomSheetModal from '../../Components/BottomSheetModal';
import CounterModal from '../../Components/CounterModal/CounterModal';
import {SESSIONTYPE} from '../../Context/SessionContext';
import Constants from '../../Storage/Constants';
import PrivacyPolicy from '../../Components/PrivacyPolicy/PrivacyPolicy';
import {useNavigation} from '@react-navigation/native';

type SessionVisibility = {
  type: SESSIONTYPE;
  visible: boolean;
};

const Settings = () => {
  const navigation = useNavigation();
  const {backgroundColor, id, barStyle} = useApplicationContext().appTheme;
  const vibrate = useApplicationContext().vibrate;
  const toggleVibrate = useApplicationContext().toggleVibrate;
  const [bottomSheetVisible, setBottomSheetVisibile] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState<
    SessionVisibility | undefined
  >(undefined);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
  const ThemeText = useMemo(() => {
    switch (id) {
      case AppTheme.COFFEE: {
        return Constants.COFFEE;
      }
      case AppTheme.SHADOW: {
        return Constants.SHADOW;
      }
      case AppTheme.TOMATO: {
        return Constants.TOMATO;
      }
      default: {
        return Constants.NA;
      }
    }
  }, [id]);

  return (
    <SafeAreaView
      style={[Styles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Styles.container, {backgroundColor: backgroundColor}]}>
          <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
          <Sessions
            onEvent={(type: SESSIONTYPE) =>
              setShowCounterModal({type, visible: true})
            }
          />
          <GeneralSection title={'General'}>
            <GeneralItem
              icon={'white-balance-sunny'}
              title={'Theme Preferences'}
              subtitle={ThemeText}
              onPress={() => {
                setBottomSheetVisibile(true);
              }}
            />
            <GeneralItem
              icon={'vibrate'}
              title={'Vibrate'}
              subtitle="Stay on track with a gentle buzz at start and pause"
              toggle={true}
              onToggle={(val: boolean) => toggleVibrate(val)}
            />
          </GeneralSection>
          <GeneralSection title={'Support Us'}>
            <GeneralItem
              icon={'star-outline'}
              title={'Rate Us'}
              subtitle="Enjoying PomoFocuss?Would you mind giving us some feedback on Google Play Store"
            />
            {/* <GeneralItem
            icon={'lightbulb-variant-outline'}
            title={'Request New Options'}
            subtitle="Facilitating user-driven innovation,this option streamlines idea submission and discussion for new features,fostering collaboration and enhancing community engagement."
            onPress={() => navigation.navigate('Request Feature')}
          /> */}
          </GeneralSection>
          <GeneralSection title={'About'}>
            <GeneralItem
              icon={'shield-alert-outline'}
              title={'Privacy Policy'}
              onPress={() => setShowPrivacyPolicy(true)}
            />
            <GeneralItem
              icon={'information-outline'}
              title={'App Version'}
              subtitle={Constants.APP_VERSION}
            />
          </GeneralSection>
          {!showCounterModal && bottomSheetVisible && (
            <BottomSheetModal
              hideBottomSheet={() => {
                setBottomSheetVisibile(false);
              }}
            />
          )}
          {!bottomSheetVisible && showCounterModal ? (
            <CounterModal
              visible={true}
              closeModal={() => {
                setShowCounterModal(undefined);
              }}
              type={showCounterModal.type}
            />
          ) : null}
          {showPrivacyPolicy ? (
            <PrivacyPolicy
              visible={true}
              closeModal={() => setShowPrivacyPolicy(false)}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
