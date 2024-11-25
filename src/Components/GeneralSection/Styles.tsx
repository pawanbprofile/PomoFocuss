import {StyleSheet} from 'react-native';
import Colors from '../../Utils/Colors';
import Sizes from '../../Utils/Sizes';
import FontSize from '../../Utils/FontSize';

const Styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.Backgorunds.Coffee,
    borderBottomWidth: Sizes.Border.small,
    padding: Sizes.Padding.Large,
  },
  title: {
    fontSize: FontSize.Large,
    color: Colors.Fonts.Coffee,
    marginBottom: Sizes.Margin.Medium,
    fontFamily: 'Inter 24pt',
  },
});

export default Styles;
