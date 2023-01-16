// 이 프로젝트는 서버가 존재하지 않으므로 데이터 파일로 관리 한다.(data.json)

// fetch 사용법

// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json") // 받아오면 response 오브젝트 전달 함  // response 안에는 body, header, http코드, 등등... => 우리가 원하는 데이터는 body 안에 있음
    .then((response) => response.json()) // response body를 json의 Object로 변환
    .then((json) => json.items); // items의 필요한 정보들 받아옴(.items하면 배열전체만 받아옴)
}

// 읽어온 items요소를 html요소로 반환
function displayItems(items) {
  const container = document.querySelector(".items"); // 받아온 아이템들을 li의 그룹으로 만들어 container에 추가 => JSON타입의 배열을 li타입의 배열로 변환 (부모에 먼저 할당)
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// join을 통해 li li li 각각 나눠져있는 배열을 문자열로 합침
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", () => onButtonClick(event, items));
}

// 버튼 클릭시 처리되는 함수

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  // const filtered = items.filter(item => item[key] === value);
  // displayItems(filtered);

  // 해당하는 요소만 사라지도록 동적으로 관리
  updateItems(items, key, value, dataset);
}

// 해당하는 요소만 사라지도록 동적으로 관리
function updateItems(items, key, value, _dataset) {

  items.forEach((item) => {
    if (item._dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

// main
loadItems() // data.json을 읽어서 아이템 전달, 시간이 걸리므로 promise로 리턴하도록 함
  .then((items) => {
    // 성공 시
    displayItems(items); // html에 아이템 보여줌
    setEventListeners(items); // 버튼 클릭시에 필터링 해줌
  })
  .catch(console.log);
