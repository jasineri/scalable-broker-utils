/**
 * @license Scalable Broker utilities v0.2.0
 *
 * The Scalable Broker web application has a very limited functionality for daily life activities, for example like exporting of transaction list,
 * so this is my attempt to enhance it :)
 *
 * exportTransactions
 *
 * Usage:
 * 1. Navigate to https://de.scalable.capital/broker/transactions
 * 2. Just copy and paste content of the scalable-broker.js into development console of your browser
 * 3. Save the CSV
 *
 * @type {{exportTransactions: scalableBroker.exportTransactions, cancelOrder: scalableBroker.cancelOrder}}
 */
var scalableBroker = (function () {
    /**
     * Get finished transactions list as CSV
     */
    function exportTransactions() {
        let transactions = 'Date;ISIN;Type;Quantity;Price;Amount\n';
        let nextData = JSON.parse(jQuery('#__NEXT_DATA__')[0].innerHTML)['props']['pageProps']['middlewareProps']['m8']['initialQueryResult'];
        jQuery.each(nextData, function (index, value) {
            if (index.startsWith('BrokerSecurityTransaction') && value['isCancellationRequested'] === false && value['finalisationReason'] === 'FILLED') {
                let date = value['lastEventDateTime'];
                let ISIN = value['security']['id'].split(':')[1];
                let type = value['side'];
                let quantity = nextData[value['numberOfShares']['id']]['filled'];
                let amount = (('BUY' === type) ? '-1' : '1') * value['totalAmount'];
                let price = Math.abs(amount / quantity);
                transactions += date + ';' + ISIN + ';' + type + ';' + quantity + ';' + price.toLocaleString('de-DE') + ';' + amount.toLocaleString('de-DE') + '\n';
            }
        });
        download('transactions.csv', transactions);
    }

    /**
     * Cancels the order by orderId. The request response is returned per callback function.
     * @param portfolioId BrokerPortfolio.Id
     * @param orderId BrokerSecurityTransaction.Id
     */
    function cancelOrder(portfolioId, orderId) {
        var xhr = new XMLHttpRequest();
        var url = "https://de.scalable.capital/broker/graphql";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("content-type", "application/json");
        var authCookie = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'))[2];
        xhr.setRequestHeader('authorization', 'Bearer ' + authCookie);
        var callback = arguments[arguments.length - 1];
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        var data = JSON.stringify([{
            "operationName": "cancelOrder",
            "variables": {"portfolioId": portfolioId, "input": {"orderId": orderId}},
            "query": "mutation cancelOrder($portfolioId: ID!, $input: CancelBrokerOrderInput!) {\n  cancelOrder(input: $input, portfolioId: $portfolioId) {\n    id\n    __typename\n  }\n}\n"
        }]);
        xhr.send(data);
    }

    function checkJQuery(callback) {
        if (!window.jQuery) {
            let head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            let script = document.createElement('script');
            script.async = true;
            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            script.onload = script.onreadystatechange = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    script = null;
                    if (callback) {
                        callback();
                    }
                }
            };
            head.insertBefore(script, head.firstChild);
        } else {
            callback();
        }
    }

    function download(filename, text) {
        let element = document.createElement('a');
        element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
        element.download = filename;
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return {
        exportTransactions: function () {
            checkJQuery(function () {
                exportTransactions();
            });
        },
        cancelOrder: function (portfolioId, orderId) {
            cancelOrder(portfolioId, orderId);
        }
    };
})();

scalableBroker.exportTransactions();