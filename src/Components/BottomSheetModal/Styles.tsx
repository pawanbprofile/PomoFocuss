import {Dimensions, StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#00000000',
    justifyContent: 'flex-end',
  },
});

export default Styles;
