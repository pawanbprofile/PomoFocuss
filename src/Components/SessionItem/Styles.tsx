import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';
import Colors from '../../Utils/Colors';
import FontSize from '../../Utils/FontSize';

const Styles = StyleSheet.create({
  container: {
    width: 105,
    height: 105,
    backgroundColor: '#545454AA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  period: {
    fontSize: FontSize.XXL,
    color: Colors.Fonts.Coffee,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: Sizes.Margin.Medium,
    fontFamily: 'Inter 24pt',
  },
  title: {
    fontSize: FontSize.Medium,
    color: Colors.Fonts.Coffee,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter 24pt',
  },
});

export default Styles;
