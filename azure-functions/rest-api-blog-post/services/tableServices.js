const azure = require("azure-storage");
const tableSvc = azure.createTableService(
    "restapidemoblogpost",
    process.env.AZURE_STORAGE_ACCESS_KEY
);


const insertEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.insertEntity(
            tableName,
            entity,
            { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
            function (error, result, response) {
                if (error) {
                    reject(error);
                }
                // resolve(result);
                resolve(response.body);
            });
    });
};


const queryEntities = (tableName, query) => {
    return new Promise((resolve, reject) => {
        tableSvc.queryEntities(
            tableName,
            query,
            null,
            { payloadFormat: "application/json;odata=nometadata" },
            function (error, result, response) {
                if (error) {
                    reject(error);
                }
                resolve(response.body);
            }
        );
    });
};


// There are multiple methods available to update an existing entity:

// replaceEntity - Updates an existing entity by replacing it.

// mergeEntity - Updates an existing entity by merging new property values into the existing entity.

// insertOrReplaceEntity - Updates an existing entity by replacing it. If no entity exists, a new one will be inserted.

// insertOrMergeEntity - Updates an existing entity by merging new property values into the existing. If no entity exists, a new one will be inserted.
const updateEntity = (table, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.mergeEntity(table, entity, function (error, result, response) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};


const deleteEntity = (table, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.deleteEntity(table, entity, function (error, result, response) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

module.exports = Object.freeze({
    insertEntity,
    queryEntities,
    updateEntity,
    deleteEntity
})