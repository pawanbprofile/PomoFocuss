import {View, Text, Modal, ScrollView} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';
import PrivacyPolicyItem from '../PrivacyPolicyItem/PrivacyPolicyItem';
import Sizes from '../../Utils/Sizes';
import CustomButtonWithText from '../CustomButtonWithText/CustomButtonWithText';
import Constants from '../../Storage/Constants';
type PrivacyPolicyProps = {
  visible: boolean;
  closeModal: () => void;
};

const PrivacyPolicy = ({visible, closeModal}: PrivacyPolicyProps) => {
  const {textColor, backgroundColor, borderColor} =
    useApplicationContext().appTheme;
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {
        closeModal();
      }}
      visible={visible}
      transparent={true}>
      <View style={Styles.modalBackground}>
        <View
          style={[
            Styles.container,
            {backgroundColor: backgroundColor, borderColor: borderColor},
          ]}>
          <Text style={[Styles.titleField, {color: textColor}]}>
            {Constants.PRIVACY_POLICY}
          </Text>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={Styles.detailsContainer}>
              <Text style={[Styles.textField, {color: textColor}]}>
                {Constants.DESCRIPTION}
              </Text>
              <PrivacyPolicyItem
                title={'Information We Collect :'}
                value={Constants.COLLECTION_NOTE}
              />
              <PrivacyPolicyItem
                title={'Automatically Collected Information :'}
                value={Constants.AUTOMATICALLY_COLLECTED_INFORMATION}
              />
              <PrivacyPolicyItem
                title={'Use of Information :'}
                value={Constants.USE_OF_INFORMATION}
              />
              <PrivacyPolicyItem
                title={'Sharing of Information :'}
                value={Constants.SHARING_OF_INFORMATION}
              />

              <PrivacyPolicyItem
                title={'Data Retention :'}
                value={Constants.DATA_RETENTION}
              />
              <PrivacyPolicyItem
                title={'Security :'}
                value={Constants.SECURITY}
              />
              <PrivacyPolicyItem
                title={'Changes To Privacy Policy :'}
                value={Constants.CHANGES_TO_PRIVACY_POLICY}
              />
              <PrivacyPolicyItem
                title={'Contact Us :'}
                value={Constants.CONTACT_US}
              />
              <Text
                style={[Styles.textField, {marginBottom: Sizes.Margin.XXXL}]}>
                {Constants.AGREE_TERMS}
              </Text>
            </View>
          </ScrollView>
          <CustomButtonWithText
            title={'Agree Terms'}
            onAction={() => {
              console.log('close privacy policy');
              closeModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyPolicy;
