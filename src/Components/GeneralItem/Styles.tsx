import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';
import FontSize from '../../Utils/FontSize';
import Colors from '../../Utils/Colors';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Sizes.Padding.Medium,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: FontSize.Medium,
    color: Colors.Fonts.Coffee,
    fontFamily: 'Inter 24pt',
    textAlignVertical: 'top',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: FontSize.Small,
    color: Colors.Fonts.Coffee,
    fontFamily: 'Inter 24pt',
    textAlignVertical: 'top',
    textAlign: 'justify',
  },
});

export default Styles;
