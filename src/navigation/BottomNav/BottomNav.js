import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
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
      // screenOptions={() => ({
      //   headerShown: false,
      //   tabBarShowLabel: true,
      //   tabBarStyle: {
      //     height: 65,
      //     paddingHorizontal: 0,
      //     paddingTop: 4,
      //     paddingBottom: 6,
      //     backgroundColor: '#1b1b1d',
      //     position: 'absolute',
      //     borderTopWidth: 0,
      //   },
      //   tabBarActiveTintColor: '#15c55d',
      //   tabBarInactiveTintColor: '#d5ffdb',
      //   tabBarLabelStyle: {
      //     fontSize: 12, marginTop:2,
      //     margin: 0,
      //   },
      // })}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: colors.Black,
          borderRadius: 15,
          height: 90,
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
              <FontAwesome name="home" color={color} size={30} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Audio"
        component={AudioPlayerScreen}
        options={{
          tabBarLabel: 'Audio',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <FontAwesome name="sticky-note" color={color} size={30} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                Audio
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoPlayerScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <FontAwesome name="plus" color={color} size={40} />
            </View>
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Pdf"
        component={PdfScreen}
        options={{
          tabBarLabel: 'Pdf',
          tabBarIcon: ({ color }) => (
            <View style={commonStyles.justifyAlignCenter}>
              <FontAwesome name="user" color={color} size={30} />
              <Text style={{ color: color, fontSize: 12, marginTop: 2 }}>
                Pdf
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
              <FontAwesome name="gear" color={color} size={30} />
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
    shadowOpacity: 0.25,
    elevation: 5,
  },
});
