const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=emaillogicalapp;AccountKey=UFbjW6o6166EpX8+H6ILmarigdbavlQw24conUUDIa9ERXGPKEdVM45eUIr49wEC90NGCwUVTSA0+AStXHxsFw==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);


async function listContainers() {
    const containersIterator = blobServiceClient.listContainers();
    const containers = [];
    for await (const container of containersIterator) {
        containers.push(container);
    }
    return containers;
}


async function listBlobs(containerName) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobsIterator = containerClient.listBlobsFlat();
    const blobs = [];
    for await (const blob of blobsIterator) {
        blobs.push(blob);
    }
    return blobs;
}


async function getBlobUrls() {
    const containers = await listContainers();
    console.log("🚀 ~ file: try01.js:29 ~ getBlobUrls ~ containers:", containers)
    const blobUrls = [];
    for (const container of containers) {
        const blobs = await listBlobs(container.name);
        const containerClient = blobServiceClient.getContainerClient(container.name);

        for (const blob of blobs) {
            const blobClient = containerClient.getBlobClient(blob.name);
            blobUrls.push(blobClient.url);
        }
    }
    return blobUrls;
}


getBlobUrls()
    .then((blobUrls) => {
        console.log(blobUrls);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
