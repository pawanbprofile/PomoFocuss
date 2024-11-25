import {StyleSheet} from 'react-native';
import Colors from '../../Utils/Colors';
import Sizes from '../../Utils/Sizes';
import FontSize from '../../Utils/FontSize';

const Styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.Backgorunds.Coffee,
    borderBottomWidth: Sizes.Border.small,
    paddingHorizontal: Sizes.Padding.Large,
    paddingVertical: Sizes.Padding.Medium,
  },
  title: {
    fontSize: FontSize.Large,
    color: Colors.Fonts.Coffee,
    marginBottom: Sizes.Margin.Medium,
    fontFamily: 'Inter 24pt',
    marginLeft: Sizes.Margin.Small,
  },
});

export default Styles;
