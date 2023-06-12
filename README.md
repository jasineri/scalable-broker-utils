# Scalable Broker utilities

The Scalable Broker web application has a very limited functionality for daily life activities, for example like exporting of transaction list, or reactivating expired sell orders
so this is my attempt to enhance it :)

## Firefox extension
### Reactivate expired sell orders with price limit (tested on Firefox v113)
Usage:
1. Install the Firefox Extension:
   - Visit the URL "https://addons.mozilla.org/en-US/firefox/addon/scalable-broker-utils/".
   - On the webpage, you will see an "Add to Firefox" button. Click on it.
   - A pop-up window will appear, displaying information about the extension. Review the details and make sure it is the correct extension you want to install.
   - Click on the "Add" button to start the installation process.
   - Firefox will now download and install the extension. You may see a progress bar indicating the installation status.
   - Once the installation is complete, you will see a notification indicating that the extension has been successfully added to Firefox.
   - Optionally, you may be prompted to restart your browser to enable the extension. If prompted, click on the "Restart Now" button to complete the installation.
   - After the browser restarts, the extension will be active and ready to use.
2. Open the Expired Order:
   - On Scalable Capital website locate and open the expired order that you want to resell.
3. "Resell" Button:
   - After opening the expired order, you should see a "resell" button.
   - This button is added by the Firefox extension.
   - Click on the "resell" button.
4. New Sell Order Form:
   - When you click the "resell" button, a new sell order form will be opened.
   - If selling of the share is permitted (based on the platform's rules), the form will be pre-filled with the share amount and limit price from the expired order.
   - Review the pre-filled details of the sell order form to ensure they match your requirements.
   - If needed, you can make adjustments to the share amount or limit price in the form.
5. Check and Execute the Order:
   - Carefully review the details of the sell order form to ensure they are correct.
   - Double-check the share amount and limit price to make sure they meet your expectations.
   - If everything looks good, click the "Sell" or "Verkaufen" button to place the sell order.

## Vanilla JavaScript
### exportTransactions

Usage:
1. Navigate to https://de.scalable.capital/broker/transactions
2. Just copy and paste content of the [scalable-broker.js](src/scalable-broker.js) into development console of your browser
3. Go back to the transactions' page and press `Export CSV` button    

### cancelOrder

Usage:
1. Navigate to https://de.scalable.capital/broker
2. Just copy and paste content of the [scalable-broker.js](src/scalable-broker.js) into development console of your browser
3. call util.cancelOrder(`BrokerPortfolioId`, `BrokerSecurityTransactionId`). Make sure to use real Ids as arguments!

## Release Notes

Firefox extension version 0.1.3 - 2023-05-29

Greasemonkey script version 0.1.3 - 2023-05-29

+ Enhancements to reactivate expired sell orders

Firefox extension version 0.1.2 - 2023-05-22

Greasemonkey script version 0.1.2 - 2023-05-22

+ Bugfix the feature to reactivate expired sell orders

Firefox extension version 0.1.1 - 2023-05-19

Greasemonkey script version 0.1.1 - 2023-05-19

+ Bugfix the feature to reactivate expired sell orders

Firefox extension version 0.1.0 - 2023-05-18

+ Added the feature to reactivate expired sell orders

Greasemonkey script version 0.1.0 - 2023-05-18

+ Added the feature to reactivate expired sell orders

Javascript version 0.3.0 - 2023-01-30

+ Added `Export CSV` button. Thx to MichaelSp!

Version 0.2.0 - 2021-05-28

+ Added cancel order functionality


*Undocumented Scalable Broker API*
