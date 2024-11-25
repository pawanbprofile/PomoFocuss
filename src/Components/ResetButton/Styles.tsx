import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';
import FontSize from '../../Utils/FontSize';

const Styles = StyleSheet.create({
  resetContainer: {
    width: '100%',
    padding: Sizes.Padding.XXXL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    fontSize: FontSize.Large,
    fontFamily: 'Inter 24pt',
    letterSpacing: 1.5,
  },
});

export default Styles;
