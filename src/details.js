// //mainpage에 있던 영화코드 -> ${paramId}로 가져옴
// const urlParams = new URL(location.href).searchParams;
// const paramId = urlParams.get("id");
// console.log(paramId);

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjFhODNmODg5NjI3YjBjNzRmYjY1ZGM2ZjBiNmU2YSIsInN1YiI6IjY0NzU2NGY2ZGQyNTg5MDEyMDA1OWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYbO2zm8YucQo4jLrsGEtheiaYzCIhcxhyD8M9kAqhI",
//   },
// };

// fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=en-US`, options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 값 선택
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const contentInput = document.getElementById("content");
const reviewContainer = document.getElementById("wrapReviewsBox");
const submitButton = document.getElementById("submit");

// 전송 버튼에 addReview() 추가
submitButton.addEventListener("click", addReview);

// 페이지 로드 시, 리뷰 데이터를 로드
window.addEventListener("load", loadReviews);

// 1.전송버튼 클릭 이벤트 발생 -> 기존 데이터에 새로 등록된 리뷰 내용 탑재
function addReview() {
  //값 선택
  const nicknameText = nicknameInput.value.trim();
  const passwordText = passwordInput.value.trim();
  const contentText = contentInput.value.trim();
  console.log("등록한 리뷰 내용", contentText);
  const movieId = paramId;

  if (nicknameText == "" || passwordText == "") {
    alert("닉네임과 패스워드를 입력해주세요!");
    return;
  } else if (contentText.length < 5) {
    alert("리뷰를 5자 이상 작성해주세요!");
    return;
  } else if (contentText.length >= 5) {
    // 기존 리뷰 데이터 가져와서
    const reviews = getReviews();

    // 새로운 리뷰 객체 생성
    const newReview = {
      nickname: nicknameText,
      password: passwordText,
      text: contentText,
      id: movieId,
      date: new Date().toLocaleDateString(),
      own_id: Math.random(),
    };

    // 리뷰를 배열에 추가
    reviews.push(newReview);

    //리뷰 데이터를 로컬 스토리지에 저장
    saveReviewsNReload(reviews); // i.f
  }
}

//i.f
function saveReviewsNReload(reviews) {
  localStorage.setItem(`${paramId}`, JSON.stringify(reviews));
  window.location.reload(); //[🤔+새로고침 : 여기에 미리 안넣으면, 수동으로 새로고침 해야만 화면에 반영됨..]
}

// window.localStorage.clear();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 3.로컬 스토리지에서 getItem으로 리뷰 데이터 가져옴
function getReviews() {
  // key값(영화코드)에 해당하는 value값 가져와서
  const reviewsString = localStorage.getItem(`${paramId}`);
  console.log("콘솔1", reviewsString);

  // key값에 해당하는 value값 있으면 js객체 형태로 파싱해서 가져옴 / 없으면 빈 배열([])이라도 가져옴 (∴댓글 삭제시 []로 보이는것 같음)
  return reviewsString ? JSON.parse(reviewsString) : [];
}

// 4.화면에 로드
function loadReviews() {
  // 로컬 스토리지에서 리뷰 데이터 가져옴
  const reviews = getReviews();

  // 리뷰 컨테이너 초기화
  // reviewContainer.innerHTML = "";

  // 내려온 리뷰 데이터 돌면서 -> 각 데이터의 .id가 key값(영화코드)과 같으면 -> 화면출력용 요소 생성
  for (const review of reviews) {
    if (review.id === paramId) {
      createReviewElement(review); // i.f
    }
  }
}

//i.f
function createReviewElement(review) {
  //요소 생성
  const wrapReview = document.createElement("div");
  wrapReview.className = "wrapReview";
  const wrapReviewBox1 = document.createElement("div");
  wrapReviewBox1.className = "wrapReviewBox1";
  const wrapReviewBox2 = document.createElement("div");
  wrapReviewBox2.className = "wrapReviewBox2";
  const wrapReviewBox3 = document.createElement("div");
  wrapReviewBox3.className = "wrapReviewBox3";

  const nicknameElement = document.createElement("span");
  nicknameElement.className = "nickname-item";
  const dateElement = document.createElement("span");
  dateElement.className = "date-item";
  const contentElement = document.createElement("span");
  contentElement.className = "content-item";

  const editButton = document.createElement("button"); //수정버튼
  editButton.className = "review-edit-btn";
  editButton.textContent = "수정";

  const deleteButton = document.createElement("button"); //삭제버튼
  deleteButton.className = "review-delete-btn";
  deleteButton.textContent = "삭제";

  nicknameElement.textContent = review.nickname;
  contentElement.textContent = review.text;
  dateElement.textContent = review.date;

  // 수정 버튼에 enableEditMode() 걸어줌
  editButton.addEventListener(
    "click",
    () => {
      const 비밀번호 = prompt("비밀번호를 입력해주세요.");
      if (비밀번호 == review.password) {
        enableEditMode(review); //i.f
      } else {
        alert("비밀번호가 올바르지 않습니다.");
        window.location.reload();
      }
    },
    { once: true }
  );

  // 삭제 버튼에 deleteReview() 걸어줌
  deleteButton.addEventListener("click", () => {
    deleteReview(review); //i.f
  });

  //화면에 출력

  wrapReviewBox1.appendChild(nicknameElement);
  wrapReviewBox1.appendChild(dateElement);
  wrapReviewBox2.appendChild(contentElement);
  wrapReviewBox3.appendChild(editButton);
  wrapReviewBox3.appendChild(deleteButton);

  wrapReview.append(wrapReviewBox1, wrapReviewBox2, wrapReviewBox3);
  reviewContainer.appendChild(wrapReview);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 댓글 수정 모드로 전환
function enableEditMode(review) {
  //수정 textarea, 저장버튼 생성
  const wrapReview = document.getElementsByClassName("wrapReview");
  const wrapEditContents = document.createElement("div");
  wrapEditContents.className = "wrap-edit-contents";
  const editInput = document.createElement("textarea");
  editInput.className = "textarea-editInput";
  editInput.placeholder = "수정할 내용을 입력해주세요.";
  const saveButton = document.createElement("button");
  saveButton.className = "save-button";
  saveButton.textContent = "저장";

  // 1.textarea의 입력값 변경 evnet 발생 -> review.text를 입력값으로 업데이트
  editInput.addEventListener("input", (event) => {
    review.text = event.target.value;
  });

  // 2.저장 버튼 클릭 -> 수정 내용 저장 -> 화면 업데이트
  saveButton.addEventListener("click", () => {
    saveEditedReview(review); //i.f
  });

  const reviews = getReviews();
  const index1 = reviews.findIndex((r) => r.own_id === review.own_id);
  wrapEditContents.append(editInput, saveButton);
  wrapReview[index1].append(wrapEditContents);

  // 새로운 수정 input창에 기존 내용 넣어주는 로직
  editInput.textContent = reviews[index1].text;
}

//i.f
function saveEditedReview(review) {
  //기존 데이터 불러와서 -> 조건 맞으면 -> .text 업데이트
  const reviews = getReviews(); //2-1-1
  const index = reviews.findIndex((r) => r.own_id === review.own_id);
  if (index !== -1) {
    reviews[index].text = review.text;

    //로컬스토리지에 내용저장 (+새로고침)
    saveReviewsNReload(reviews); //i.f

    // 화면에 출력
    create(); //i.f
  }
}

// i.f
function create() {
  // 리뷰 데이터를 로컬 스토리지에서 가져옵니다.
  const reviews = getReviews();

  // 리뷰 컨테이너를 초기화합니다.
  // userNickname.innerHTML = "";
  // userContent.innerHTML = "";
  // userDate.innerHTML = "";

  // 가져온 리뷰 데이터를 순회 -> 화면출력용 요소 생성
  for (const review of reviews) {
    if (review.id === paramId) {
      createReviewElement(review);
    }
  }
}

//
// loadReviews 함수 내에서 create()를 호출 -> 초기 화면에 리뷰를 출력 [🤔loadReviews()를 아예 삭제하고 create()함수로 빼보려 시도하였으나 ... 수정버튼입력시 버그가 생겨서 loadReviews()는 그대로 냅두었습니다]
function loadReviews() {
  create();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 댓글 삭제
function deleteReview(review) {
  const reviews = getReviews();
  const index1 = reviews.findIndex((r) => r.own_id === review.own_id);

  if (index1 !== -1) {
    let 비밀번호 = prompt("비밀번호를 입력해주세요.");
    // console.log(비밀번호);

    if (비밀번호 !== review.password) {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (비밀번호 === review.password) {
      reviews.splice(index1, 1);
      saveReviewsNReload(reviews); //i.f
    }
  }
}

// 리뷰 데이터 업데이트 및 화면 업데이트
function updateReviews() {
  const reviews = getReviews();
  saveReviewsNReload(reviews);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
