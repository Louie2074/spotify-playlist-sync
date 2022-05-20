const { MongoClient } = require('mongodb');


async function mongo() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
const uri =''
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await createListing(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function createListing(client, newListing) {
  const result = await client
    .db('User')
    .collection('admin').find().toArray()
  console.log(result);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

mongo().catch(console.error);
