import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import Settings from '../Screens/Settings';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../Utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useContext, useState} from 'react';
import {
  ApplicationContext,
  useApplicationContext,
} from '../Context/ApplicationContext';
import NewFeatureRequest from '../Screens/NewFeatureRequest/NewFeatureRequest';

type RootStackParams = {
  Home: undefined;
  Settings: undefined;
  ['Request Feature']: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParams>();
const RootNavigation = () => {
  const {textColor, backgroundColor} = useApplicationContext().appTheme;
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <RootStack.Screen
          options={({navigation}) => ({
            animation: 'slide_from_right',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTitleAlign: 'center',
            headerLeft: props => (
              <TouchableOpacity
                style={{paddingEnd: 20}}
                onPress={() => {
                  console.log('settings go back');
                  navigation.goBack();
                }}>
                <AntDesign name={'left'} size={20} color={textColor} />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: textColor,
            },
          })}
          name="Settings"
          component={Settings}
        />
        <RootStack.Screen
          options={({navigation}) => ({
            animation: 'slide_from_right',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTitleAlign: 'center',
            headerLeft: props => (
              <TouchableOpacity
                style={{paddingEnd: 20, paddingVertical: 8}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <AntDesign name={'left'} size={20} color={textColor} />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: textColor,
            },
          })}
          name="Request Feature"
          component={NewFeatureRequest}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
