import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import modalStyles from './modal.style';

const BottomSheet = ({children, visible, toggleModal}) => {
  return (
    <Modal
      animationType={'slide'}
      onRequestClose={toggleModal}
      transparent
      visible={visible}>
      <View style={modalStyles.container}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={toggleModal}>
          <View style={{flex: 1}}></View>
        </TouchableWithoutFeedback>
        <View style={modalStyles.modalView}>
          <View style={modalStyles.dot} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
