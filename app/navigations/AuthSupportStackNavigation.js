import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import FAQ from 'app/screens/FAQ';
import LanguageSelect from 'app/screens/LanguageSelect';
import globalStyle from 'app/styles';
import { trans } from 'app/shared';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function authStackNavigation({navigation, route}) {
  const lang = route.params.lang;

  return (
    <Stack.Navigator
      initialRouteName="FAQ"
      screenOptions={({navigation, route}) => ({
        headerStyle: globalStyle.navigator.headerStyle,
        headerTintColor: globalStyle.navigator.headerTintColor,
        headerTitleStyle: globalStyle.navigator.headerTitleStyle,
        headerBackTitleVisible: false,
      })}
    >
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        initialParams={{
          auth: route.params.auth,
          lang: route.params.lang,
        }}
        options={{
          title: trans('FAQ', lang),
          headerRight: () => (
            <Icon style={{marginRight: 15}} name='language' size={24} color='#fff' onPress={() => navigation.navigate('LanguageSelect')} />
          ),
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelect}
        options={{
          title: trans('Select language', lang)
        }}
      />
    </Stack.Navigator>
  );
}
