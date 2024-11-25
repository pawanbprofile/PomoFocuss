import {StyleSheet} from 'react-native';
import Sizes from '../../Utils/Sizes';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: Sizes.Padding.XL,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontFamily: 'Inter 24pt',
  },
});

export default Styles;
