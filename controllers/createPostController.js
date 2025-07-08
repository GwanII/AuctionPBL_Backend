const Post = require('../models/createPostModel');
const mongoose = require('mongoose');
require('dotenv').config();

exports.createPost = async (req, res) => {
  const data = req.body;

  if (!data.postId || !data.title || !data.seller || !data.minimumPrice) {
    return res.status(400).json({
      status: "error",
      message: "필수 데이터가 누락되었습니다.",
    });
  }

  const newPost = new Post(data);

  try {
    await newPost.save();
    res.status(201).json({
      status: "success",
      postId: newPost.postId,
      message: "게시물 생성 완료",
    });
  } catch (err) {
    console.error("게시물 생성 오류:", err);
    res.status(500).json({
      status: "error",
      message: "게시물 생성 실패",
    });
  }
};



//==================================================================
//웹 없이 테스트하는 코드
// 🌿 3) readline 인터페이스 생성
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 🌿 4) 질문 함수 (Promise 기반)
function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// 🌿 5) 실행 함수
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB에 연결되었습니다!');
  } catch (err) {
    console.error('🚨 MongoDB 연결 실패:', err);
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    process.exit(1);
  }


  console.log('📝 게시물 정보를 입력해 주세요!');

  const postId = await ask('Post ID: ');
  const title = await ask('물건: ');
  const sellerUserId = await ask("판매자 ID: ");
  const sellerUserName = await ask("판매자 이름: ");
  const minimumPriceStr = await ask('최소 가격: ');

  const minimumPrice = parseFloat(minimumPriceStr);
  if (isNaN(minimumPrice)) {
    console.error('🚨 최소 가격이 유효한 숫자가 아닙니다.');
    rl.close();
    process.exit(1);
  }

  const testNewpost = new Post({
    postId,
    title,
    seller: {
      userId: sellerUserId,
       userName: sellerUserName
    },
    minimumPrice
  });

  try {
    await testNewpost.save();
    console.log('✅ 게시물이 성공적으로 저장되었습니다!');
  } catch (err) {
    console.error('🚨 게시물 저장 오류:', err);
  } finally {
    rl.close();
    mongoose.disconnect();
  }
})();