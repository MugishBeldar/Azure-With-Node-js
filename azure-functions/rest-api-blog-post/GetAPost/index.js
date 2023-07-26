const azure = require("azure-storage");
const { queryEntities } = require("../services/tableServices")
module.exports = async function (context, req) {
    try {
        const { blog, id } = context.bindingData;

        const query = new azure.TableQuery()
            .where("PartitionKey eq ?", blog)
            .and("RowKey eq ?", id.toString());

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