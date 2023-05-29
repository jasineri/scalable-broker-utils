/**
 * @license Scalable Broker utilities v0.3.0
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
 */

class ScalableUtils {

    constructor() {
        this.showExportCsvButton();
    }

    /**
     * Get finished transactions list as CSV
     */
    exportTransactions() {
        let transactions = "Date;ISIN;Type;Quantity;Price;Amount\n";
        let nextData = JSON.parse(
            document.querySelector("#__NEXT_DATA__").innerHTML
        )["props"]["pageProps"]["middlewareProps"]["m5"]["initialQueryResult"];

        const isSettledValidTransaction = ([key, value]) => {
            return key.startsWith("BrokerSecurityTransaction") &&
                value["isCancellation"] === false &&
                value["status"] === "SETTLED"
        }

        Object.entries(nextData).filter(isSettledValidTransaction).forEach(([key, value]) => {

            let date = value["lastEventDateTime"];
            let ISIN = value["isin"];
            let type = value["side"];
            let quantity = value["quantity"];
            let amount = value["amount"];
            let price = Math.abs(amount / quantity);
            transactions +=
                date +
                ";" +
                ISIN +
                ";" +
                type +
                ";" +
                quantity +
                ";" +
                price.toLocaleString("de-DE") +
                ";" +
                amount.toLocaleString("de-DE") +
                "\n";
        });
        this.download("transactions.csv", transactions);
    }

    /**
     * Cancels the order by orderId. The request response is returned per callback function.
     * @param portfolioId BrokerPortfolio.Id
     * @param orderId BrokerSecurityTransaction.Id
     */
    cancelOrder(portfolioId, orderId) {
        var xhr = new XMLHttpRequest();
        var url = "https://de.scalable.capital/broker/graphql";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("content-type", "application/json");
        var authCookie = document.cookie.match(
            new RegExp("(^| )access_token=([^;]+)")
        )[2];
        xhr.setRequestHeader("authorization", "Bearer " + authCookie);
        var callback = arguments[arguments.length - 1];
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        var data = JSON.stringify([
            {
                operationName: "cancelOrder",
                variables: { portfolioId: portfolioId, input: { orderId: orderId } },
                query:
                    "mutation cancelOrder($portfolioId: ID!, $input: CancelBrokerOrderInput!) {\n  cancelOrder(input: $input, portfolioId: $portfolioId) {\n    id\n    __typename\n  }\n}\n",
            },
        ]);
        xhr.send(data);
    }

    download(filename, text) {
        let element = document.createElement("a");
        element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
        element.download = filename;
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    showExportCsvButton() {
        let btn = document.createElement("button");
        btn.addEventListener('click', () => this.exportTransactions());
        btn.innerText = "Export CSV"

        document.querySelector("#search").parentElement.parentElement.appendChild(btn);
    }
}
const util = new ScalableUtils();

