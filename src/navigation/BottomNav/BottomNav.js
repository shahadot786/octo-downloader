import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../screens/Home/HomeScreen';
import AudioPlayerScreen from '../../screens/Player/Audio/AudioPlayerScreen';
import VideoPlayerScreen from '../../screens/Player/Video/VideoPlayerScreen';
import TabButton from './Utils/TabButton';
import PdfScreen from '../../screens/Pdf/PdfScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';
import colors from '../../theme/constant/colors';
import { commonStyles } from '../../styles/commonStyles';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          backgroundColor: colors.Black,
          borderRadius: 15,
          height: 70,
          borderTopWidth: 0,
          ...styles.shadow,
        },
        tabBarActiveTintColor: colors.Green,
        tabBarInactiveTintColor: colors.Grey,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <FontAwesome name="home" color={color} size={20} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Galley"
        component={AudioPlayerScreen}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <Ionicons name="images" color={color} size={20} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                AUDIO
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Download"
        component={VideoPlayerScreen}
        options={{
          tabBarLabel: 'Download',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <Ionicons name="download" color={color} size={25} />
            </View>
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="PRO"
        component={PdfScreen}
        options={{
          tabBarLabel: 'PRO',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <MaterialCommunityIcons name="shield-crown" color={color} size={20} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                PRO
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <Ionicons name="settings" color={color} size={20} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.Primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.20,
    elevation: 5,
  },
});
