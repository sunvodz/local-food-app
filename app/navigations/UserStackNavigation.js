import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Order from 'app/screens/User/Order';
import DeleteAccount from 'app/screens/User/DeleteAccount';
import FAQ from 'app/screens/FAQ';
import LanguageSelect from 'app/screens/LanguageSelect';
import PaymentSelect from 'app/screens/User/PaymentSelect';
import PayWithStripe from 'app/screens/User/PayWithStripe';
import PayWithSwish from 'app/screens/User/PayWithSwish';
import DonateNothing from 'app/screens/User/DonateNothing';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

const StackNavigator = createStackNavigator();

export default function userStackNavigator({navigation, route}) {
  const lang = route.params.lang;

  return (
    <StackNavigator.Navigator
      initialRouteName='ProfileTabNavigation'
      screenOptions={({navigation, route}) => ({
        headerStyle: globalStyle.navigator.headerStyle,
        headerTintColor: globalStyle.navigator.headerTintColor,
        headerTitleStyle: globalStyle.navigator.headerTitleStyle,
        headerBackTitleVisible: false,
      })}
    >
      <StackNavigator.Screen
        name='ProfileTabNavigation'
        component={ProfileTabNavigation}
        initialParams={{
          auth: route.params.auth,
          lang: route.params.lang,
        }}
        options={{
            title: route.params.auth.user.name
        }}
      />
      <StackNavigator.Screen
        name='Order'
        component={Order}
        options={{
          title: trans('Order', lang)
        }}
      />
      <StackNavigator.Screen
        name='LanguageSelect'
        component={LanguageSelect}
        options={{
          title: trans('Select Language', lang)
        }}
      />
      <StackNavigator.Screen
        name='FAQ'
        component={FAQ}
        options={{
          title: trans('FAQ', lang)
        }}
      />
      <StackNavigator.Screen
        name='PaymentSelect'
        component={PaymentSelect}
        options={{
          title: trans('Select payment option', lang)
        }}
      />
      <StackNavigator.Screen
        name='PayWithSwish'
        component={PayWithSwish}
        options={{
          title: trans('Pay with Swish', lang)
        }}
      />
      <StackNavigator.Screen
        name='PayWithStripe'
        component={PayWithStripe}
        options={{
          title: trans('Pay with card', lang)
        }}
      />
      <StackNavigator.Screen
        name='DonateNothing'
        component={DonateNothing}
        options={{
          title: trans('Donate nothing', lang)
        }}
      />
    </StackNavigator.Navigator>
  );
}
