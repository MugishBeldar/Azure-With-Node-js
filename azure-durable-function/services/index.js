const { TableClient } = require('@azure/data-tables');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=emailocrfunctionap26fba7;AccountKey=rOJI+7lB1CHgV1kuf9EVLh7Y98fYQwQ1ezvPS05XAMy9yEmEjjd8z6Oe6ViOUWx0T22wVM1qi/o1+AStKLN1zg==;EndpointSuffix=core.windows.net";

const tableName = "post";
const tableClient = TableClient.fromConnectionString(connectionString, tableName);

const makeInsertEntity = require('./tableServices');
const insertEntity = makeInsertEntity({ tableClient })

module.exports = Object.freeze({
    insertEntity,
})