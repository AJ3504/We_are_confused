const urlParams = new URL(location.href).searchParams;
const paramId = urlParams.get("id");
console.log(paramId);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjFhODNmODg5NjI3YjBjNzRmYjY1ZGM2ZjBiNmU2YSIsInN1YiI6IjY0NzU2NGY2ZGQyNTg5MDEyMDA1OWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYbO2zm8YucQo4jLrsGEtheiaYzCIhcxhyD8M9kAqhI",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=en-US`, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 값을 선택합니다.
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const contentInput = document.getElementById("content");

const userNickname = document.getElementById("user-nickname");
const userContent = document.getElementById("user-content");
const userDate = document.getElementById("user-date");

const submitButton = document.getElementById("submit");

// 전송 버튼에 클릭 이벤트 핸들러를 추가합니다.
submitButton.addEventListener("click", addReview);

// 페이지 로드 시 리뷰 데이터를 로드합니다.
window.addEventListener("load", loadReviews);

function addReview() {
  const nicknameText = nicknameInput.value.trim();
  const passwordText = passwordInput.value.trim();
  const contentText = contentInput.value.trim();
  console.log(contentText);
  const movieId = paramId;

  if (nicknameText == "" || passwordText == "") {
    alert("닉네임과 패스워드를 입력해주세요!");
    return;
  } else if (contentText.length < 5) {
    alert("리뷰를 5자 이상 작성해주세요!");
    return;
  } else if (contentText.length >= 5) {
    // 기존 리뷰 데이터를 가져옵니다.
    const reviews = getReviews();

    // 새로운 리뷰 객체를 생성합니다.
    const newReview = {
      nickname: nicknameText,
      password: passwordText,
      text: contentText,
      id: movieId,
      date: new Date().toLocaleDateString(),
      //review_id: Math.random()
    };

    // 리뷰를 배열에 추가합니다.
    reviews.push(newReview);

    // 리뷰 데이터를 로컬 스토리지에 저장합니다.
    saveReviewsNReload(reviews);
  }
}

// 리뷰 데이터를 로컬 스토리지에 저장하는 함수입니다.
function saveReviewsNReload(reviews) {
  localStorage.setItem(`${paramId}`, JSON.stringify(reviews));
  window.location.reload();
}

// window.localStorage.clear();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 로컬 스토리지에서 리뷰 데이터를 가져오는 함수입니다.
function getReviews() {
  const reviewsString = localStorage.getItem(`${paramId}`);
  console.log("콘솔1", reviewsString);
  return reviewsString ? JSON.parse(reviewsString) : [];
}

function loadReviews() {
  // 로컬 스토리지에서 리뷰 데이터를 가져옵니다.
  const reviews = getReviews();

  // 리뷰 컨테이너를 초기화합니다.
  // reviewContainer.innerHTML = "";

  // 리뷰 데이터를 순회하면서 리뷰 요소를 생성하여 리뷰 컨테이너에 추가합니다.
  for (const review of reviews) {
    if (review.id === paramId) {
      createReviewElement(review);
    }
  }
}

// 리뷰 요소를 생성하는 함수입니다.
function createReviewElement(review) {
  const nicknameElement = document.createElement("div");
  const contentElement = document.createElement("div");
  const dateElement = document.createElement("div");
  const editButton = document.createElement("button"); //
  const deleteButton = document.createElement("button"); //

  // 닉네임/내용/날짜 column 생성 위해 class명 추가
  nicknameElement.classList.add("nickname-item");
  contentElement.classList.add("content-item");
  dateElement.classList.add("date-item");

  nicknameElement.innerHTML = `<p>${review.nickname}</p>`;
  contentElement.innerHTML = `<p>${review.text}</p>`;
  dateElement.innerHTML = `<span>${review.date}</span>`;
  editButton.textContent = "수정";

  // 수정 버튼 클릭 시 수정 모드로 전환
  editButton.addEventListener("click", () => {
    const 비밀번호 = prompt("입력했던 비밀번호를 재입력해주세요!");
    if (비밀번호 !== review.password) {
      alert("비밀번호가 올바르지 않습니다.");
    } else {
      enableEditMode(review);
    }
  });
  deleteButton.textContent = "삭제"; //
  // 삭제 버튼 클릭 시 댓글 삭제
  deleteButton.addEventListener("click", () => {
    deleteReview(review);
  });

  contentElement.appendChild(editButton); //
  contentElement.appendChild(deleteButton); //

  userNickname.appendChild(nicknameElement);
  userContent.appendChild(contentElement);
  userDate.appendChild(dateElement);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 댓글 수정 모드로 전환
function enableEditMode(review) {
  const contentElement = userContent.querySelector(".content-item");
  const editInput = document.createElement("textarea");
  const saveButton = document.createElement("button");
  saveButton.textContent = "저장";

  // 1.textarea의 입력값 변경 evnet 발생 -> review.text를 입력값으로 업데이트
  editInput.addEventListener("input", (event) => {
    review.text = event.target.value;
  });

  // 2.저장 버튼 클릭 시 수정 내용 저장 후 화면 업데이트
  saveButton.addEventListener("click", () => {
    saveEditedReview(review); //⭐️2-1로 가세요
  });

  // contentElement.innerHTML = "";
  contentElement.appendChild(editInput);
  contentElement.appendChild(saveButton);
}

// ⭐️2-1.저장 버튼 클릭 시 수정 내용 저장 후 화면 업데이트
function saveEditedReview(review) {
  const reviews = getReviews(); //2-1-1
  const index = reviews.findIndex(
    (r) =>
      r.id === review.id &&
      r.nickname === review.nickname &&
      r.password === review.password
    //r.review_id === review.review_id
  );
  //여길 수정했더니.... 되네? 202번째 줄은 안고쳐도 되겠지?

  if (index !== -1) {
    reviews[index].text = review.text;
    saveReviewsNReload(reviews); //2-1-2
    create(); // 화면 업데이트  //⭐️2-1-3으로 가세요
  }
}

//(참고) 2-1-2.
// function saveReviewsNReload(reviews) {
//   localStorage.setItem(`${paramId}`, JSON.stringify(reviews));
// }

// ⭐️2-1-3. 로컬스토리지에 저장한 데이터를 화면에 디스플레이
function create() {
  // 리뷰 데이터를 로컬 스토리지에서 가져옵니다.
  const reviews = getReviews();

  // 리뷰 컨테이너를 초기화합니다.
  userNickname.innerHTML = "";
  userContent.innerHTML = "";
  userDate.innerHTML = "";

  // 가져온 리뷰 데이터를 순회하면서 리뷰 요소를 생성
  for (const review of reviews) {
    if (review.id === paramId) {
      createReviewElement(review);
    }
  }
}

// 2-1-3과 이어짐
// loadReviews 함수 내에서 create()를 호출하여 초기 화면에 리뷰를 출력할 수 있습니다.
function loadReviews() {
  create();
}

//(참고)
// function loadReviews() {
//   // 로컬 스토리지에서 리뷰 데이터를 가져옵니다.
//   const reviews = getReviews();

//   // 리뷰 컨테이너를 초기화합니다.
//   // reviewContainer.innerHTML = "";

//   // 리뷰 데이터를 순회하면서 리뷰 요소를 생성하여 리뷰 컨테이너에 추가합니다.
//   for (const review of reviews) {
//     if (review.id === paramId) {
//       createReviewElement(review);
//     }
//   }
// }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 댓글 삭제
function deleteReview(review) {
  const reviews = getReviews();
  const index1 = reviews.findIndex(
    (r) =>
      r.id === review.id &&
      r.nickname === review.nickname &&
      r.password === review.password
    //r.review_id === review.review_id
  );

  if (index1 !== -1) {
    let 비밀번호 = prompt("입력했던 비밀번호를 재입력해주세요!");
    // console.log(비밀번호);

    if (비밀번호 !== review.password) {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (비밀번호 === review.password) {
      reviews.splice(index1, 1);
      saveReviewsNReload(reviews);
    }
  }
}

// 리뷰 데이터 업데이트 및 화면 업데이트
function updateReviews() {
  const reviews = getReviews();
  saveReviewsNReload(reviews);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
