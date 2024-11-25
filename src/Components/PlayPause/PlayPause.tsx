import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';
import {useApplicationContext} from '../../Context/ApplicationContext';
type PlayPauseProps = {
  isPlaying: boolean;
  onEvent: () => void;
};
const PlayPause = ({isPlaying, onEvent}: PlayPauseProps) => {
  const {textColor} = useApplicationContext().appTheme;
  return (
    <View style={Styles.container}>
      <Pressable onPress={onEvent}>
        <Icon name={isPlaying ? 'pause' : 'play'} size={54} color={textColor} />
      </Pressable>
    </View>
  );
};

export default PlayPause;
