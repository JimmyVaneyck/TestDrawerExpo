import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import Profile from './app/components/Profile/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

import { DefaultColors, MyDarkTheme, MyLightTheme } from './app/constants/Colors';
import React, { useState, useEffect } from 'react';
import { isDarkModeStorage, setDarkModeStorage } from './app/helpers/Storage';
import { Icon } from 'react-native-elements';
import Profile2 from './app/components/Profile/Profile2';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>();

  useEffect(() => {
    setTheme();
  }, []);

  async function setTheme() {
    const isDarkMode = await isDarkModeStorage();
    setDarkTheme(isDarkMode);
  }

  function toggleTheme() {
    setDarkModeStorage(!darkTheme);
    setDarkTheme(!darkTheme);
  }

  function Root() {
    return (
      <Drawer.Navigator 
        screenOptions={{
          headerTintColor: darkTheme ? DefaultColors.white : DefaultColors.black
        }}
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )
        }}>
        <Drawer.Screen name="Profile" component={Profile} 
          options={{
            drawerIcon: ({focused, size}) => (
              <Icon
                color={focused ? DefaultColors.tint : (darkTheme ? DefaultColors.white : DefaultColors.black)}
                size={size}
                name="account-circle" 
                type="material" />
            )
          }}
        />
        <Drawer.Screen name="Profile 2" component={Profile2} 
          options={{
            drawerIcon: ({focused, size}) => (
              <Icon
                color={focused ? DefaultColors.tint : (darkTheme ? DefaultColors.white : DefaultColors.black)}
                size={size}
                name="list" 
                type="material" />
            )
          }}
        />
      </Drawer.Navigator>
    );
  }

  function getNavigation() {
    if (darkTheme == undefined)
      return <View></View>;

    return (
      <RootSiblingParent>
        <NavigationContainer theme={darkTheme ? MyDarkTheme : MyLightTheme}>
          <StatusBar barStyle={"light-content"} backgroundColor="black"/>
            <Stack.Navigator screenOptions={{
              animation: "slide_from_right"
            }}>
            <Stack.Screen
              name="Root"
              component={Root}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    );
  }

  return (
    getNavigation()
  );
}
