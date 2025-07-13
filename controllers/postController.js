const Post = require('../models/postModel');
require('dotenv').config();


//★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성
//★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성★게시물 생성
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



//★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제
//★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제★게시물 삭제
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  // params는 express 기능 중 하나. URL 경로 변수들이 담긴 객체.
  // URL 경로에 :를 붙여 동적 변수로 받음.  
  // id에는 게시물 id가 들어감.

  // requesterId에 요청자의 정보 저장. 접근자의 ObjectId가 들어감.
  const requesterId = req.user?.userId; //user은 express 기본 객체임. users스키마랑은 상관없음.
                                        //sibal 이거 때문에 1시간 씀.
  // ?.은 옵셔널 체이닝이라는 기능.
  // ?앞의 내용이 undefined or null이면 undefined를 반환하는 기능.
  // 데이터가 없으면 에러를 내지 않고 기능을 수행하지 않음.
  // 맞겠지? 저거 안하면 서버 터진대.

  if (!requesterId) {
    return res.status(401).json({
      status: "error",
      message: "정보가 없습니다.",
    });
  }

  try {
    const post = await Post.findById(id);
    // post에 삭제할 게시물의 ObjectId를 가져옴.
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "게시물을 찾을 수 없습니다.",
      });
    }

    const sellerId = String(post.seller); 
    if (sellerId !== requesterId) { // 두 개가 일치해야 삭제 가능하게.
      return res.status(403).json({
        status: "error",
        message: "본인만 게시물을 삭제할 수 있습니다.",
      });
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "게시물 삭제 성공.",
    });
  } catch (err) {
    console.error("게시물 삭제 오류:", err);
    res.status(500).json({
      status: "error",
      message: "게시물 삭제 실패.",
    });
  }
};



