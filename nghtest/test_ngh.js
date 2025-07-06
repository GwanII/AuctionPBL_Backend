const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 2025;

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

let db;
let collection;

const client = new MongoClient(url);
client.connect(url)
.then((client) => {
    console.log("MongoDB 연결 성공");

    db = client.db(dbName);
    collection = db.collection(collectionName);

    app.listen(8000, () => {
        console.log("서버 실행 중...");
    });
})
.catch((err) => {
    console.error("mongoDB 연결 실패", err);
});

app.get('/', (req, res) => {
    res.send("mongoDB 연결 테스트");
})

app.get('/ngh', async (req, res) => {
    if (!collection) {
        return res.status(500).send("컬렉션이 없어염");
    }

    try {
        const tryinsert = await collection.insertOne({
            name: "남기현",
            age: 1000
        });
        console.log("1개 삽입 결과:", tryinsert);
    } catch (err) {
        console.error("데이터 삽입 실패: ", err);
        res.status(500).send("데이터 삽입 중 에러 발생");
    } finally {
        await client.close();
    }
});