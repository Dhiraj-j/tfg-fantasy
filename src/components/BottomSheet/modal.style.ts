import COLORS from '@theme/color';
import {HEIGHT, WIDTH} from '@theme/size';
import {StyleSheet} from 'react-native';
const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TEXT2 + 'cc',
  },
  modalView: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    minHeight: HEIGHT / 1.5,
    width: WIDTH,
    padding: 15,
    paddingVertical: WIDTH * 0.1,
  },
});

export default modalStyles;
