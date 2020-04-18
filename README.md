# Local Food Nodes
Local Food Nodes connects local food producers to local food consumers as well as strengthening those relationships that already exist. We enable direct transactions, resilient communities and regain control over what we eat and how it is produced. A desire to make food local again.

# Local Food App
Local Food App is a React Native app that lets you browser and order products, manage your orders and pay your yearly membership.

# Development notes
If .env is not updartng run npm start with --reset-cache or add to start command in package.json.

For local dev change oauth callback endpoint (if using ngrok)

# Release new version
* Update version number in app.json
* Make sure .env is setup for production
* Upload to App Store Connect with Transporter

# Todo
* Reset password functionality
* Activate account
* Delete account
* Dynamic link account activation

# Testing
Until automated testing is in place, make sure that the app can...

## Basics
* Create account
* Login to account
* Pay membership
* Ask for location and notification permission

## Browse and order
* Zoom in on user location
* Auto follow nodes
* List products
* Filter product with date filter
* Add products to cart
* Validate when adding products to cart
* Cart icon updates correctly
* Delete cart item on click
* Send order
* Sent order is visible in order list
* Recently placed order is deletable

## Settings
* Change language
* Logout
