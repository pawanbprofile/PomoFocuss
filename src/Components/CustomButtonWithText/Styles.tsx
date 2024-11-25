import {StyleSheet} from 'react-native';
import FontSize from '../../Utils/FontSize';

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: 12,
  },
  title: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FontSize.Large,
    fontFamily: 'Inter 24pt',
  },
});

export default Styles;
