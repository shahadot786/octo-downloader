/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../theme/constant/colors';
import BigText from '../../theme/Text/BigText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IOSButton from '../atoms/buttons/IOSButton';
import Text_Size from '../../theme/constant/fonts';
import metrics from '../../theme/constant/metrics';
import useTheme from '../../hooks/theme/useTheme';
/*
    onBlur: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
    setIsModalVisible: (arg0: boolean) => void;
    isModalVisible: boolean | undefined;
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    isButton?: boolean;
    notOutsidePress?: boolean;
    height?: string;
    handlePress: () => void;
    btnOneText?: string;     [if isButton is true then this field is compulsory]
    btnTwoText?: string;    [if isButton is true then this field is compulsory]
    btnOneColor?: string;   [if isButton is true then this field is compulsory]
    btnTwoColor?: string;   [if isButton is true then this field is compulsory]
  */
const MiddleModal = props => {
  const {initialMode} = useTheme();
  return (
    <TouchableWithoutFeedback
      onBlur={props.onBlur}
      onPress={() => props?.setIsModalVisible(false)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props?.isModalVisible}>
        <TouchableWithoutFeedback
          disabled={props.notOutsidePress ? true : false}
          onPress={() =>
            props?.setIsModalVisible && props?.setIsModalVisible(false)
          }>
          <View style={[styles.centeredView]}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: initialMode
                    ? colors.SoftBlack
                    : colors.SoftWhite,
                  minHeight: props.height ? props.height : '20%',
                },
              ]}>
              {props.header && (
                <View
                  style={{
                    backgroundColor: colors.Primary,
                    width: '100%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <BigText
                    text={props.header}
                    textStyle={{color: colors.White}}
                  />
                </View>
              )}
              {props.crossIcon && (
                <Pressable
                  onPress={() => {
                    props?.setIsModalVisible(false);
                  }}
                  style={({pressed}) => [
                    {
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      opacity: pressed ? 0.7 : 1,
                      zIndex: 1,
                      //   backgroundColor: colors.Black,
                      padding: 5,
                      borderRadius: 50,
                    },
                  ]}>
                  <Ionicons
                    name="close-circle-sharp"
                    color={colors.White}
                    size={22}
                  />
                </Pressable>
              )}
              <View>{props.children}</View>
              {/*Bottom Buttons */}
              {props.isButton && (
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}>
                    <IOSButton
                      containerStyle={styles.containerStyle}
                      onSelect={() => {
                        props?.setIsModalVisible(false);
                        props.handleBtnOnePress && props.handleBtnOnePress();
                      }}
                      btnStyle={{backgroundColor: props.btnOneColor}}
                      textAlignment={styles.textAlignment}
                      titleStyle={styles.textStyle}
                      title={props.btnOneText}
                    />
                    <IOSButton
                      containerStyle={styles.containerStyle}
                      onSelect={() => {
                        props?.setIsModalVisible(false);
                        props.handleBtnTwoPress && props.handleBtnTwoPress();
                      }}
                      textAlignment={styles.textAlignment}
                      btnStyle={{backgroundColor: props.btnTwoColor}}
                      titleStyle={styles.textStyle}
                      title={props.btnTwoText}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  modalText: {
    color: 'black',
    fontSize: Text_Size.Text_1,
  },
  modalView: {
    width: metrics.screenWidth > 800 ? '60%' : '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  containerStyle: {
    height: metrics.screenHeight <= 800 ? metrics.screenHeight * 0.04 : 30,
    width: '25%',
    borderRadius: 10,
    marginBottom: '10%',
    marginTop: '5%',
  },
  textAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Text_Size.Text_10,
    fontWeight: '600',
    color: colors.White,
  },
});

export default MiddleModal;
