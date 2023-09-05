/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react'; // Import useState and useEffect
import strings from '../../theme/constant/strings';
import colors from '../../theme/constant/colors';
import metrics from '../../theme/constant/metrics';
import DescriptionText from '../../theme/Text/DescriptionText';
import formatTimestamp from '../../utils/formatTimestamp';
import formatBytes from '../../utils/formatBytes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PdfThumbnail from 'react-native-pdf-thumbnail';

const Item = ({data, type, navigation}) => {
  const [pdfThumbnailUri, setPdfThumbnailUri] = useState(null);

  useEffect(() => {
    if (type === 'pdf') {
      getPdfThumbnail();
    }
  }, [type]);

  const onItemPressHandler = () => {
    navigation.navigate(strings.ItemViewerScreen, {
      path: data?.path,
      type: type,
    });
  };

  const getPdfThumbnail = async () => {
    const {uri} = await PdfThumbnail.generate(data?.path, 0);
    setPdfThumbnailUri(uri);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onItemPressHandler}
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
            width: metrics.screenWidth / 3.5,
            height: 100,
            padding: 5,
          }}>
          {/* Image */}
          {type === 'image' && (
            <Image
              source={{uri: `file://${data?.path}`}}
              style={{height: '100%', borderRadius: 10}}
              resizeMode="cover"
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
          {/* pdf */}
          {type === 'pdf' && pdfThumbnailUri && (
            <Image
              source={{uri: pdfThumbnailUri}} // Display the PDF thumbnail URL
              style={{height: '100%', borderRadius: 10}}
              resizeMode="cover"
            />
          )}
          {type === 'video' && (
            <View
              style={{
                top: 30,
                left: 40,
                position: 'absolute',
              }}>
              <Ionicons name={'play-circle'} size={30} color="#fff" />
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
