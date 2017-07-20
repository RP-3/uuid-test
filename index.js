const uuid = require('uuid');
const Promise = require('bluebird');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'rohanpethiyagoda',
        database : 'uuid_test'
    },
    pool: { min: 0, max: 2 }
});

const INSERTION_COUNT = 100000; // 100k
const idArray = new Array(INSERTION_COUNT);

for(var i=0; i<INSERTION_COUNT; i++){
    idArray[i] = uuid.v4();
}

const insertUuids = () => {

    console.log('Begin UUID insertion');
    const start = Date.now();

    return Promise.map(idArray, (id) => knex('uu_ids').insert({ id }), {concurrency: 1})
    .then(() => {

        console.log(`UUID insertion complete in ${Date.now() - start}ms`);
        return null;
    });
};

const insertSerial = () => {

    console.log('Begin intId insertion');
    const start = Date.now();

    return Promise.map(idArray, (id, i) => knex('int_ids').insert({ id: i + 1 }), {concurrency: 1})
    .then(() => {

        console.log(`intId insertion complete in ${Date.now() - start}ms`);
        return null;
    });
};

const readIntIds = () => {

    console.log('Begin intId reads');
    const start = Date.now();

    return Promise.map(idArray, (id, i) => {
        return knex('int_ids')
        .select()
        .where({ id: Math.floor(Math.random() * INSERTION_COUNT) + 1 });
    }, { concurrency: 1 })
    .then(() => {

        console.log(`intId reads complete in ${Date.now() - start}ms`);
        return null;
    });
};

const readUuids = () => {

    console.log('Begin Uuid reads');
    const start = Date.now();

    return Promise.map(idArray, (id, i) => {
        return knex('uu_ids')
        .select()
        .where({ id: idArray[Math.floor(Math.random() * INSERTION_COUNT)] });
    }, { concurrency: 1 })
    .then(() => {

        console.log(`Uuid reads complete in ${Date.now() - start}ms`);
        return null;
    });
};

return insertUuids()
.then(insertSerial)
.then(readIntIds)
.then(readUuids)
.then(() => process.exit());
