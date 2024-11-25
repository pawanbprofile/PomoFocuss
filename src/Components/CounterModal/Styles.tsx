import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  mainContainer: {
    width: '80%',
    
    borderRadius: 12,
  },
  container: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  value: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  signContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000030',
  },
  signs: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default Styles;
