import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    width: '95%',
    height: '85%',
    borderRadius: 12,
    borderWidth: 0.5,
    padding: 12,
    justifyContent: 'center',
  },
  textField: {
    fontSize: 14,
    fontFamily: 'Inter 24pt',
    alignSelf: 'center',
    marginBlock: 12,
  },
  titleField: {
    fontSize: 20,
    fontFamily: 'Inter 24pt',
    alignSelf: 'center',
    marginBlock: 12,
  },
  detailsContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default Styles;
