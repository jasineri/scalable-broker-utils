# Scalable Broker utilities

The Scalable Broker web application has a very limited functionality for daily life activities, for example exporting of transaction list,
so this is my attempt to enhance it :)

Release Notes

Version 0.2.0 - 2021-05-28

+ Added cancel order functionality


## exportTransactions

Usage:
1. Navigate to https://de.scalable.capital/broker/transactions
2. Just copy and paste content of the [scalable-broker.js](src/scalable-broker.js) into development console of your browser
3. Save the CSV    

## cancelOrder

Usage:
1. Navigate to https://de.scalable.capital/broker
2. call scalableBroker.cancelOrder(`BrokerPortfolioId`, `BrokerSecurityTransactionId`). Make sure to use real Ids as arguments!
   
*Undocumented Scalable Broker API*