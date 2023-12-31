/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../theme/constant/colors';
import metrics from '../../../theme/constant/metrics';
import DescriptionText from '../../../theme/Text/DescriptionText';
import formatTimestamp from '../../../utils/formatTimestamp';
import formatBytes from '../../../utils/formatBytes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGallery} from './useGallery';
import LoaderModal from '../../../components/common/LoaderModal';
import useTheme from '../../../hooks/theme/useTheme';

const Item = ({data, type, navigation}) => {
  const {initialMode} = useTheme();
  const [pdfThumbnailUri, setPdfThumbnailUri] = useState(null);
  const {onItemPressHandler, isLoading, onDeletePressHandler} = useGallery();

  useEffect(() => {
    if (type === 'pdf') {
      getPdfThumbnail();
    }
  }, [type]);

  const getPdfThumbnail = async () => {
    const {uri} = await PdfThumbnail.generate(data?.path, 0);
    setPdfThumbnailUri(uri);
  };

  return (
    <View style={styles.container}>
      <LoaderModal visible={isLoading} />
      <Pressable
        onPress={() => onItemPressHandler(navigation, data, type)}
        style={({pressed}) => [
          {
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: colors.Grey,
            borderRadius: 10,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <View
          style={{
            width: metrics.screenWidth / 4,
            height: 80,
            padding: 5,
          }}>
          {/* audio */}
          {type === 'audio' && (
            <MaterialIcon
              name={'audiotrack'}
              size={60}
              color={initialMode ? colors.White : colors.Black}
            />
          )}
          {/* video */}
          {type === 'video' && (
            <Image
              source={{uri: `file://${data?.path}`}}
              style={{height: '100%', borderRadius: 10}}
              resizeMode="cover"
            />
          )}
          {/* software */}
          {type === 'software' && (
            <MaterialIcon
              name={'settings-applications'}
              size={60}
              color={initialMode ? colors.White : colors.Black}
            />
          )}
          {/* Image */}
          {type === 'image' && (
            <Image
              source={{uri: `file://${data?.path}`}}
              style={{height: '100%', borderRadius: 10}}
              resizeMode="cover"
            />
          )}
          {/* pdf */}
          {type === 'pdf' && pdfThumbnailUri && (
            <Image
              source={{uri: pdfThumbnailUri}}
              style={{height: '100%', borderRadius: 10}}
              resizeMode="cover"
            />
          )}
          {/* zip */}
          {type === 'zip' && (
            <MaterialCommunityIcons
              name={'zip-box'}
              size={60}
              color={initialMode ? colors.White : colors.Black}
            />
          )}
          {/* text */}
          {type === 'text' && (
            <MaterialIcon
              name={'text-snippet'}
              size={60}
              color={initialMode ? colors.White : colors.Black}
            />
          )}
          {type === 'video' && (
            <View
              style={{
                top: 30,
                left: 40,
                position: 'absolute',
              }}>
              <Ionicons name={'play-circle'} size={30} color={colors.Primary} />
            </View>
          )}
        </View>
        <View
          style={{
            width: metrics.screenWidth / 1.8,
            marginHorizontal: 10,
            justifyContent: 'center',
          }}>
          <DescriptionText text={`File Name: ${data?.name}`} />
          <DescriptionText
            text={`Download at: ${formatTimestamp(data?.mtime)}`}
          />
          <DescriptionText text={`Size: ${formatBytes(data?.size)}`} />
        </View>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
          onPress={() => onDeletePressHandler(data?.path)}>
          <MaterialCommunityIcons
            name={'trash-can'}
            size={25}
            color={colors.Primary}
          />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
});
