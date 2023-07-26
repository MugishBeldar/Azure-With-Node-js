// const { TableClient } = require('@azure/data-tables');
// const connectionString = "DefaultEndpointsProtocol=https;AccountName=mk19112000one;AccountKey=/QEuydPc49tRDZj6sttdMS9uJ5lcIhrjTIAvopHoEs9WSZnRg053FJRO2i/Ynjr7vY8INAcbHfB1+AStqYTT4Q==;EndpointSuffix=core.windows.net";
// const tableName = "posts";

// const tableClient = TableClient.fromConnectionString(connectionString, tableName);

// const entity = {
//     partitionKey: "Error",
//     rowKey: new Date().getTime().toString(),
//     messageWithCode: "Bad Request 404",
//     url: "https://jsonplaceholder.typicode.com/post",
// };

// async function insertEntity({ entity }) {
//     try {
//         await tableClient.createEntity(entity);
//         console.log("Entity inserted successfully");
//     } catch (error) {
//         console.error("Error inserting entity:", error);
//     }
// }

// insertEntity();
// module.exports = Object.freeze({
//     insertEntity,
// })

module.exports = function makeInsertEntity({ tableClient }) {
    return async function insertEntity({ entity }) {
        try {
            await tableClient.createEntity(entity);
            console.log("Entity inserted successfully");
        } catch (error) {
            console.error("Error inserting entity:", error);
        }
    }
}