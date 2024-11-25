import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 40,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter 24pt',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 8,
    letterSpacing: 1.5,
  },
  textTime: {
    fontSize: 14,
    fontFamily: 'Inter 24pt',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Styles;
