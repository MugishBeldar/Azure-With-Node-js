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
// const axios = require('axios')
// module.exports = async function (context) {
//     console.log("🚀 ~ file: index.js:13 ~ context:", context)
//     // return `Hello ${context.bindings.name.id}!`;

//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://jsonplaceholder.typicode.com/posts/1`,
//         headers: {},
//     };


//    const response = axios.request(config)
//         .then((response) => {
//             console.log(JSON.stringify(response.data));
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };
const axios = require('axios');
const { insertEntity } = require('../services')
module.exports = async function (context) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://jsonplaceholder.typicode.com/posts/${context.bindings.name.id}`,
            headers: {},
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log("Error in getjsondata:-");
        const entity = {
            partitionKey: "Error",
            rowKey: new Date().getTime().toString(),
            messageWithCode: error.message,
            url: error.response.config.url,
        }
        insertEntity({ entity })
        return entity
    }
};
