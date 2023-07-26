const azure = require("azure-storage");
// const { queryEntities } = require("../services/table-service");
const { queryEntities } = require('../services/tableServices')

module.exports = async function (context, req) {
    try {
        const blog = context.bindingData.blog;

        if (!blog) {
            context.res = {
                status: 400,
                body: "Blog ID is required",
            };
        }

        var query = new azure.TableQuery().where("PartitionKey eq ?", blog);

        const result = await queryEntities("post", query);

        context.res = {
            body: result,
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message,
        };
    }
};