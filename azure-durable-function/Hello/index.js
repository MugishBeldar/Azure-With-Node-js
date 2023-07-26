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
// An activity function is where you perform "the real work" in your workflow: work such as making a database call or performing some non-deterministic computation.
module.exports = async function (context) {
    context.log("🚀 ~ file: index.js:13 ~ context:", context)
    return `Hello ${context.bindings.name}!`;
};