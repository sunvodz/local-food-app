import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'app/components';
import globalStyle from 'app/styles';
import { trans } from 'app/shared';

const scrollViewProps = {
  contentContainerStyle: {
    minHeight: '100%'
  },
  keyboardShouldPersistTaps: 'always',
  enableOnAndroid: true,
  style: {
    backgroundColor: globalStyle.primaryColor,
  }
};

export default class Terms extends React.Component {
  render() {
    const lang = this.props.lang;

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>{trans('Terms', lang)}</Text>
          <Text style={styles.text}>{trans('Signing up and using Local Food Nodes is incredible simple. Just create an account.', lang)}</Text>
          <Text style={styles.text}>{trans('By signing up, and becoming a supporting member you at the same time become a part of co-creating the local food supply. Now how about that!? But first, we have a few simple terms you need to read, understand and accept to be able to enter and go totally local.', lang)}</Text>

          <Text style={styles.header}>{trans('General', lang)}</Text>
          <Text style={styles.text}>{trans('Signing up an account is free, but to be able to place an order you need to become a supporting member. Read more about membership here.', lang)}</Text>
          <Text style={styles.text}>{trans('The products you order are directly from the producers. This also means you pay straight to the producers, always.', lang)}</Text>
          <Text style={styles.text}>{trans('Local Food Nodes is never a selling part which means that the producers have all the responsibility for their products. How it is produced, what it contains and how it is packed and delivered. If you have questions about products, prices, deliveries, quality you need to contact the producer it concerns.', lang)}</Text>
          <Text style={styles.text}>{trans('You can join as many nodes as you like and you can order from who ever you like, how often as you like, as long as you are able to pick up the ordered products from the delivery location on the delivery time.', lang)}</Text>

          <Text style={styles.header}>{trans('GDPR', lang)}</Text>
          <Text style={styles.text}>{trans('It is important for us that you feel safe with us handling your personal information, that is why we are transparent with what information we collect and how we use it. We never sell your information to third parties.', lang)}</Text>
          <Text style={styles.text}>{trans('Personal information is all the information that can be used to identify a person, like name, email, IP address and orders.', lang)}</Text>
          <Text style={styles.text}>{trans('We always makes sure your information is safe with us. On this page we describe what information we save and why. Your information is stored until you change or delete them or delete your account.', lang)}</Text>

          <Text style={styles.text}>{trans('This is the information connected to your user account:', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Email', lang)}</Text>
          <Text style={styles.text}>{trans('Necessary to create an account on localfoodnodes.org. It is used a unique identifier for your account, for order confirmations, and communication from your nodes and producers as well as from us. We do not send markering emails.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Password', lang)}</Text>
          <Text style={styles.text}>{trans('Necessary to create an account on localfoodnodes.org. Your password is stored encrypted in our database.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Name', lang)}</Text>
          <Text style={styles.text}>{trans('We ask for your name to help make the producers and node admins work a bit easier so they can identidy you when you place and order, but you are free to use an alias if you like.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Phone number', lang)}</Text>
          <Text style={styles.text}>{trans('Optional. Phone numbers have been requested by producers and node admins as a way to get in contact with you before a delivery, or if there is a problem with your product.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Street name, zip and city')}</Text>
          <Text style={styles.text}>{trans('Optional. Your address is used by our maps to show delivery locations near you.', lang)}</Text>

          <Text style={styles.text}>{trans('You can change information or delete your account whenever you like directly from the site.', lang)}</Text>

          <Text style={styles.header}>{trans('External services', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Digital Ocean', lang)}</Text>
          <Text style={styles.text}>{trans('We run our web servers and databases on digitalocean.com.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Sentry', lang)}</Text>
          <Text style={styles.text}>{trans('Sentry collects error logs from the site, so when something crashes we get an email. It is possible that personal information is included in the error. We are only interested in solving the bugs. An error is stored for 30 days.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Amazon S3', lang)}</Text>
          <Text style={styles.text}>{trans('Uploaded images are stored on S3 to relieve our web server. They are stored there until you delete them form the site or delete your account.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('SendInBlue', lang)}</Text>
          <Text style={styles.text}>{trans('Emails sent from localfoodnodes.org or Local Food App (reset password, verify account and such) are sent using SendInBlue.', lang)}</Text>

          <Text style={styles.subHeader}>{trans('Stripe', lang)}</Text>
          <Text style={styles.text}>{trans('Payments are processed by Stripe and they collect your name and card information.', lang)}</Text>

          <Button style={styles.button} title={trans('Accept terms', lang)} onPress={this.props.onAcceptTerms} />
        </View>
      </ScrollView>
    );
  }
}

let styles = {
  scrollView: {
    backgroundColor: globalStyle.primaryColor,
  },
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 30,
  },
  subHeader: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    marginBottom: 3,
    marginTop: 15,
  },
  text: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    lineHeight: 20,
  },
  button: {
    button: {
      marginTop: 15,
    }
  }
};