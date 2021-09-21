const potd = document.querySelector(".potd");
const potdDialog = document.querySelector(".potdDialog");
const potdCloseButton = document.querySelector(".potdCloseButton");
const persCloseButton = document.querySelector(".persCloseButton");
const potdDisplayImage = document.getElementById("potdDisplayImage");
const potdDate = document.getElementById("potdDate");
const explanation = document.getElementById("explanation");
const potdDialogInner = document.querySelector(".potdDialogInner");
const pers = document.getElementById("pers");
const persDialog = document.querySelector(".persDialog");
const marsSolForm = document.querySelector(".marsSol");
const earthDateForm = document.querySelector(".earthDate");
const marsSolInput = document.getElementById("marsSolInput");
const earthDateInput = document.getElementById("earthDateInput");
const persResult = document.querySelector(".persResult");
const persForm = document.querySelector(".persForm");
const inner = document.querySelector(".inner");

marsSolForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const marsSolInputValue = marsSolInput.value;
  marsSolForm.reset();
  marsSolPers(marsSolInputValue)
    .then((data) => marsSolPersUI(data))
    .catch((err) => console.log(err));
});

earthDateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const earthDateInputValue = earthDateInput.value;
  earthDateForm.reset();
  earthDatePers(earthDateInputValue)
    .then((data) => earthDatePersUI(data))
    .catch((err) => console.log(err));
});

const marsSolPersUI = (data) => {
  const photos = data.photos;
  console.log(photos);
  if (photos.length !== 0) {
    console.log("more than 0 results");
    for (i = 0; i < 5; i++) {
      console.log(photos[i].img_src);
      const img = document.createElement("img");

      img.setAttribute("src", `${photos[i].img_src}`);
      persResult.append(img);
    }
    const limit = document.createTextNode("Limit of 5 photos");
    persResult.append(limit);
  } else if (photos.length === 0) {
    console.log("0 results");
    const text = document.createTextNode("No results found");
    persResult.append(text);
  }
  persResult.classList.remove("dnone");
};

const earthDatePersUI = (data) => {
  const photos = data.photos;
  console.log(photos);
  if (photos.length !== 0) {
    console.log("more than 0 results");
    for (i = 0; i < 5; i++) {
      console.log(photos[i].img_src);
      const img = document.createElement("img");
      img.setAttribute("src", `${photos[i].img_src}`);
      persResult.append(img);
    }
    const limit = document.createTextNode("Limit of 5 photos");
    persResult.append(limit);
  } else if (photos.length === 0) {
    console.log("0 results");
    const text = document.createTextNode("No results found");
    persResult.append(text);
  }
  persResult.classList.remove("dnone");
};

pers.addEventListener("click", () => {
  persDialog.classList.remove("dnone");
  persDialog.classList.add("dblock");
  persForm.classList.remove("dnone");
  persForm.classList.add("dblock");
  persResult.classList.remove("dblock");
  persResult.classList.add("dnone");
  inner.classList.remove("dflex");
  inner.classList.add("dnone");
});

potd.addEventListener("click", () => {
  potdDialog.classList.remove("dnone");
  potdDialog.classList.add("dblock");
  inner.classList.remove("dflex");
  inner.classList.add("dnone");
});

potdCloseButton.addEventListener("click", () => {
  potdDialog.classList.remove("dblock");
  potdDialog.classList.add("dnone");
  inner.classList.remove("dnone");
  inner.classList.add("dflex");
});

persCloseButton.addEventListener("click", () => {
  persDialog.classList.remove("dblock");
  persDialog.classList.add("dnone");
  persResult.innerHTML = "";
  inner.classList.remove("dnone");
  inner.classList.add("dflex");
});

window.addEventListener("load", () => {
  updatePotd();
  updatePotdDialog();
});

const updatePotd = async () => {
  const data = await getPotd();
  const potdImg = document.createElement("img");
  const potdDiv = document.createElement("div");
  const potdTitle = document.createTextNode("PHOTO OF THE DAY");

  potdImg.setAttribute("src", `${data.hdurl}`);
  potdDiv.classList.add("middleText");
  potdDiv.append(potdTitle);
  potd.append(potdImg);
  potd.append(potdDiv);

  /*  potdDialog.innerHTML = `<div class="potdDialogInner">
  <img src="${data.hdurl}" alt="" /><span class="closeButton"
    >x</span
  >
  <p>
  ${data.date}
  </p>
  <p>
    ${data.explanation}
  </p>
</div>`; */
};

const updatePotdDialog = async () => {
  const data = await getPotd();

  const potdDialogImg = document.createElement("img");
  const potdDialogDateText = document.createTextNode(`${data.date}`);
  const potdDialogExplanationText = document.createTextNode(
    `${data.explanation}`
  );

  potdDialogImg.setAttribute("src", `${data.hdurl}`);
  potdDialogInner.prepend(potdDialogImg);
  potdDate.append(potdDialogDateText);
  explanation.append(potdDialogExplanationText);
};

const marsSolPers = async (solInput) => {
  const persData = await getPersPhotosSol(solInput);
  persForm.classList.add("dnone");
  persResult.classList.add("dblock");
  /*   const arr = new Array();
  arr = persData.photos;
  console.log(arr);
  console.log(persData.photos[0].img_src); */
  return persData;
};

const earthDatePers = async (solInput) => {
  const persData = await getPersPhotosEarth(solInput);
  persForm.classList.add("dnone");
  persResult.classList.add("dblock");
  /*   const arr = new Array();
    arr = persData.photos;
    console.log(arr);
    console.log(persData.photos[0].img_src); */
  return persData;
};
