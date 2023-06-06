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
    };

    // 리뷰를 배열에 추가합니다.
    reviews.push(newReview);

    // 리뷰 데이터를 로컬 스토리지에 저장합니다.
    saveReviews(reviews);
  }
}

// 리뷰 데이터를 로컬 스토리지에 저장하는 함수입니다.
function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// 로컬 스토리지에서 리뷰 데이터를 가져오는 함수입니다.
function getReviews() {
  const reviewsString = localStorage.getItem("reviews");
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

  nicknameElement.classList.add("nickname-item");
  contentElement.classList.add("content-item");
  dateElement.classList.add("date-item");

  nicknameElement.innerHTML = `<p>${review.nickname}</p>`;
  contentElement.innerHTML = `<p>${review.text}</p>`;
  dateElement.innerHTML = `<span>${review.date}</span>`;

  userNickname.appendChild(nicknameElement);
  userContent.appendChild(contentElement);
  userDate.appendChild(dateElement);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
