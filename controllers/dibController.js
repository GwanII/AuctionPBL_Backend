const Dib = require("../models/dibModel");

// 스키마를 동적으로 추가하는 거 시도했는데 안되노.
// ㄴ지피티가 안된대 ㅎㅎ
// postId를 postIds로 바꾸고 자료형 배열로 함. 여기 postId 다 박을거임.




//★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거
//★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거★찜 추가 및 제거
exports.toggleDib = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user?.userId; //사용자 정보 가져와버리기

  if (!userId) {
    return res.status(401).json({
      status: "error",
      message: "로그인이 필요합니다."
    });
  }
  if (!postId) {
    return res.status(400).json({
      status: "error",
      message: "게시물 ID가 필요합니다."
    });
  }
try {
  // 콜렉션에 userId가 있는지 확인
  const existing = await Dib.findOne({ userId });

  if (existing) { // userId가 있다면
    // postIds에 같은 postId가 들어있는지 확인
    const alreadyExists = existing.postIds.some( // .some은 배열에 있으면 true, 없으면 false 반환.
        (id)=> id.toString() === postId.toString()
    ); 
    // .includes 쓰려했는데 .body로 받아온 변수는 자료형이 string임.
    // postId는 자료형이 ObjectId이니까 .some으로 확인하고 .toString 써서 자료형 통일.

    // 근데 보니까 .body로 받아온 변수를 ObjectId로 타입캐스팅 해서 하기도 하던디.
    // ㄴ이거는 좀 더 확인 해야할듯!

    if (alreadyExists) { // postId가 이미 있다면 찜 취소
        existing.postIds.pull(postId);
        await existing.save();
        return res.status(200).json({
            status: "success",
            message: "찜 취소"
        });
    }

    // postId가 없으면 추가
    existing.postIds.push(postId);
    await existing.save();

    return res.status(200).json({
      status: "success",
      message: "찜 추가"
    });
  }

  // userId가 없으면 새 문서 생성
  const newDib = await Dib.create({
    userId,
    postIds: [postId]
  });

  return res.status(201).json({
    status: "success",
    message: "새 찜 문서를 생성, 찜 추가",
    dibId: newDib._id
  });

} catch (error) {
  console.error("찜 처리 중 오류:", error);
  return res.status(500).json({
    status: "error",
    message: "찜 처리 중 문제가 발생~"
  });
}};




// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 회의 때 꼭 물어보기
// 찜 추가 할 때마다 createdAt 추가해줘야하는가.