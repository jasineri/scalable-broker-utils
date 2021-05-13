/**
 * The Scalable Broker web application does not have any functionality for exporting transaction lists, so this is my attempt to get one :)
 *
 * exportTransactions
 *
 * Usage:
 * 1. Navigate to https://de.scalable.capital/broker/transactions
 * 2. Just copy and paste content of the scalable-broker.js into development console of your browser
 * 3. Save the CSV
 *
 * @type {{exportTransactions: scalableBroker.exportTransactions}}
 */
var scalableBroker = (function () {
    /**
     * Get finished transactions list as CSV
     */
    function exportTransactions() {
        let transactions = 'Date;ISIN;Type;Quantity;Price\n';
        let nextData = JSON.parse(jQuery('#__NEXT_DATA__')[0].innerHTML)['props']['pageProps']['middlewareProps']['m8']['initialQueryResult'];
        jQuery.each(nextData, function (index, value) {
            if (index.startsWith('BrokerSecurityTransaction') && value['isCancellationRequested'] === false && value['finalisationReason'] === 'FILLED') {
                let date = value['lastEventDateTime'];
                let ISIN = value['security']['id'].split(':')[1];
                let type = value['side'];
                let quantity = nextData[value['numberOfShares']['id']]['filled'];
                let price = value['totalAmount'] / quantity;
                transactions += date + ';' + ISIN + ';' + type + ';' + quantity + ';' + price.toString().replace('.', ',') + '\n';
            }
        });
        download('transactions.csv', transactions);
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
        }
    };
})();

scalableBroker.exportTransactions();