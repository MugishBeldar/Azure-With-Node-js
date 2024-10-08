﻿/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    // Replace "Hello" with the name of your Durable Activity Function.
    // outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
    // context.log(outputs,"!!!!!!!!!!!!!!!!!");
    // outputs.push(yield context.df.callActivity("Hello", "Seattle"));
    // context.log(outputs,"!!!!!!!!!!!!!!!!!");
    // outputs.push(yield context.df.callActivity("Hello", "abcde"));
    // context.log(outputs,"!!!!!!!!!!!!!!!!!");
    // outputs.push(yield context.df.callActivity("JsonDataPost",""));
    // context.log(outputs,"!!!!!!!!!!!!!!!!!");
    // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]

    const postResult = yield context.df.callActivity("JsonDataPost","");
    console.log("🚀 ~ file: index.js:32 ~ module.exports=df.orchestrator ~ postResult:", postResult)
    outputs.push(postResult);

    const getResult = yield context.df.callActivity("GetJsonData",{id:1});
    outputs.push(getResult);

    // console.log("🚀 ~ file: index.js:30 ~ module.exports=df.orchestrator ~ yield context.df.callActivity(JsonDataPost,):", yield context.df.callActivity("JsonDataPost",""))
    // console.log("🚀 ~ file: index.js:30 ~ module.exports=df.orchestrator ~ result:", result)
    return outputs;
});