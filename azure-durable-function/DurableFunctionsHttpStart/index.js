const df = require("durable-functions");
const axios = require('axios');
const { insertEntity } = require('../services')

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);
    // context.log(`Started orchestration with ID = '${instanceId}'.`);

    const links = client.createCheckStatusResponse(context.bindingData.req, instanceId);
    // console.log("🚀 ~ file: index.js:13 ~ links:", Object.keys(links));
    // console.log("🚀 ~ file: index.js:13 ~ links:", links.body.statusQueryGetUri);

    const ans = await checkStatus();
    // console.log("🚀 ~ file: index.js:16 ~ returnnewPromise ~ ans:-+++++++++++++++=!!!!!!!!!!!!!!", typeof ans);
    // return ans;
    if (ans.output) {
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: ans.output
        }
        console.log("🚀 ~ file: index.js:25 ~ context.res:", context.res)
        return context.res
    } else {
        context.res = { ...ans };
        return context.res;
    }
    async function checkStatus() {
        try {
            let config = {
                method: 'ges',
                maxBodyLength: Infinity,
                url: links.body.statusQueryGetUri,
                headers: {}
            };

            const response = await axios.request(config);
            const runtimeStatus = response.data.runtimeStatus;
            // console.log("🚀 ~ file: index.js:86 ~ .then ~ fetchedData:", runtimeStatus, response.data.runtimeStatus);

            if (runtimeStatus === "Completed") {
                return response.data;
            }
            else if (runtimeStatus === "Failed") {
                // return "Failed";
                failedObj = {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: "failed"
                };
                return failedObj
            } else {
                return new Promise((resolve) => {
                    setTimeout(async () => {
                        const result = await checkStatus();
                        resolve(result);
                    }, 3000); // Wait for 2 seconds and check status again
                });
            }
        } catch (error) {
            // Handle error if needed
            // console.log("Error in durable function http start:- ++++++++++++====================",error)
            const entity = {
                partitionKey: "Error",
                rowKey: new Date().getTime().toString(),
                messageWithCode: error.message,
                url: error.response.config.url,
            }
            insertEntity({ entity })
            // return entity;
            errObj = {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: entity
            };
            return errObj;
        }
    }
};

