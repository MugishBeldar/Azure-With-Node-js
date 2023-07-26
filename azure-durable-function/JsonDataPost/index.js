/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */
const axios = require('axios');
const { insertEntity } = require('../services')

module.exports = async function (context) {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            "title": "foo",
            "body": "bar",
            "userId": 1
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://jsonplaceholder.typicode.com/posts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                // context.log("!!!!!!!!!!!!!!!!!!!111@@@@@@@@@@@@@@@@@@@@@@", Object.keys(error), "!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@");
                // context.log("!!!!!!!!!!!!!!!!!!!111@@@@@@@@@@@@@@@@@@@@@@", error.message, "!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@");
                // context.log("!!!!!!!!!!!!!!!!!!!111@@@@@@@@@@@@@@@@@@@@@@", error.request, "!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@");
                // context.log("!!!!!!!!!!!!!!!!!!!111@@@@@@@@@@@@@@@@@@@@@@", error.response.config.url, "!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@");
                const entity = {
                    partitionKey: "Error",
                    rowKey: new Date().getTime().toString(),
                    messageWithCode: error.message,
                    url: error.response.config.url,
                }
                insertEntity({ entity })
                reject(error);
            });
    });
};
