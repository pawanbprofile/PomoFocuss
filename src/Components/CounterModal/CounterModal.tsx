import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useMemo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SessionContext,
  SESSIONTYPE,
  useSessionContext,
} from '../../Context/SessionContext';
import Styles from './Styles';
import {
  ApplicationContext,
  useApplicationContext,
} from '../../Context/ApplicationContext';
import Sizes from '../../Utils/Sizes';

type CounterModalProps = {
  visible: boolean;
  closeModal: () => void;
  type: SESSIONTYPE;
};

const MAX_PERIOD = 59;
const CounterModal = ({visible, closeModal, type}: CounterModalProps) => {
  const {backgroundColor, textColor} = useApplicationContext().appTheme;
  const {
    sessionTime,
    breakTime,
    longBreakTime,
    increaseTime,
    decreaseTime,
    resetTime,
  } = useSessionContext();

  const value = useMemo(() => {
    if (type === SESSIONTYPE.SESSION) {
      return sessionTime;
    } else if (type === SESSIONTYPE.BREAK) {
      return breakTime;
    } else {
      return longBreakTime;
    }
  }, [sessionTime, breakTime, longBreakTime]);
  let timer: NodeJS.Timeout | null = null;

  const onDecreaseButtonPressIn = () => {
    timer = setInterval(() => {
      decreaseTime(type);
    }, 500);
  };

  const stopTimer = useCallback(() => {
    timer && clearInterval(timer);
  }, [timer]);

  const onIncreaseButtonPressIn = () => {
    timer = setInterval(() => {
      increaseTime(type);
    }, 500);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={Styles.modalBackground}>
        <View style={[Styles.mainContainer, {backgroundColor}]}>
          <TouchableOpacity
            onPress={closeModal}
            style={{
              marginTop: -20,
              marginRight: -16,
              alignSelf: 'flex-end',
              padding: 8,
            }}>
            <Icon name={'closecircle'} color={textColor} size={24} />
          </TouchableOpacity>
          <View style={[Styles.container]}>
            <TouchableOpacity
              style={Styles.signContainer}
              onPress={() => decreaseTime(type)}>
              <Text style={[Styles.signs, {color: textColor}]}>-</Text>
            </TouchableOpacity>
            <Text style={[Styles.value, {color: textColor}]} numberOfLines={1}>
              {value}
            </Text>
            {value < MAX_PERIOD ? (
              <TouchableOpacity
                style={Styles.signContainer}
                onPress={() => increaseTime(type)}>
                <Text style={[Styles.signs, {color: textColor}]}>+</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: Sizes.Padding.Medium,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              resetTime(type);
              closeModal();
            }}>
            <Text
              style={{
                color: textColor,
                alignSelf: 'flex-end',
                textAlign: 'right',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CounterModal;
