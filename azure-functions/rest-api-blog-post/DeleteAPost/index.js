const { deleteEntity } = require("../services/tableServices");
module.exports = async function (context, req) {
  try {
    const { blog, id } = context.bindingData;

    const entity = {
      PartitionKey: { _: blog },
      RowKey: { _: id.toString() },
    };

    await deleteEntity("post", entity);
  } catch (error) {
    context.res = {
      status: 500,
      body: `Request error. ${error.message}`,
    };
  }
};