import {StyleSheet} from 'react-native';
import metrics from '../theme/constant/metrics';

export const commonStyles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyAlignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  smallImageSize: {
    width:
      metrics.screenWidth <= 380 ? 50 : metrics.screenWidth <= 600 ? 60 : 70,
    height:
      metrics.screenWidth <= 380 ? 50 : metrics.screenWidth <= 600 ? 60 : 70,
  },
  bigImageSize: {
    width:
      metrics.screenWidth <= 380 ? 100 : metrics.screenWidth <= 600 ? 120 : 140,
    height:
      metrics.screenWidth <= 380 ? 100 : metrics.screenWidth <= 600 ? 120 : 140,
  },
});
