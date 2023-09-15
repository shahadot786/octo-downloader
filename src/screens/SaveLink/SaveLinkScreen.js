/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSaveLink} from './Utils/useSaveLink';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import LoaderModal from '../../components/common/LoaderModal';
import BottomSpacing from '../../theme/Global/BottomSpacing';

const SaveLinkScreen = () => {
  const {data, loading} = useSaveLink();

  const renderListItem = ({item}) => (
    <View style={{margin: 10}}>
      <Text>Title: {item.title}</Text>
      <Text>Details: {item.details}</Text>
      <Text>Type: {item.type}</Text>
    </View>
  );

  return (
    <ScreenSafeAreaView>
      <LoaderModal visible={loading} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<BottomSpacing />}
      />
    </ScreenSafeAreaView>
  );
};

export default SaveLinkScreen;
