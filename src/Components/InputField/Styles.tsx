import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';

const Styles = StyleSheet.create({
  container: {
    paddingVertical: Sizes.Padding.Small,
    width: '100%',
    borderRadius: 12,
    borderWidth: 0.5,
    padding: Sizes.Padding.Medium,
    marginBottom: 12,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: '400',
    lineHeight: 32,
    fontFamily: 'Inter 24pt',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default Styles;
