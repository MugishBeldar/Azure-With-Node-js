const { insertEntity } = require("../services/tableServices");
exports.createPostHandler = async (context) => {
 const { blog, title, content } = context.req.body;
 
 const entity = {
  PartitionKey: { _: blog },
  RowKey: { _: new Date().getTime().toString() },
  title: { _: title },
  content: { _: content },
 };
 const result = await insertEntity("post", entity);
 context.res = {
  body: result,
 };
 context.done();
};