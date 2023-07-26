// exports.validateBody = async (context, body, schema) => {
//     try {
//      if (!body) {
//       context.res = {
//        status: 400,
//        body: "A request body must be passed!",
//       };
//      context.done();
//      return;
//      }
     
//      await schema.validateAsync(body);
//     } catch (err) {
//       context.res = {
//        status: 400,
//        body: err.message,
//      };
//      context.done();
//     }
//    };