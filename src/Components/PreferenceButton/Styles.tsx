import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';
import Colors from '../../Utils/Colors';

const Styles = StyleSheet.create({
  container: {
    height: 52,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: Colors.Fonts.Coffee,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '600',
    flex: 1,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default Styles;
