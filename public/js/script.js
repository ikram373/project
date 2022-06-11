const selected = document.querySelector(".selected-cat");
const optionsContainer = document.querySelector(".options-container-cat");

const optionsList = document.querySelectorAll(".option-cat");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});



const  selectedwil = document.querySelector(".selected");
const optionsContainerwil = document.querySelector(".options-container");

const optionsListwil = document.querySelectorAll(".option");

selectedwil.addEventListener("click", () => {
  optionsContainerwil.classList.toggle("active");
});

optionsListwil.forEach(o => {
  o.addEventListener("click", () => {
    selectedwil.innerHTML = o.querySelector("label").innerHTML;
    optionsContainerwil.classList.remove("active");
  });
});

