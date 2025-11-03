const groupOne = document.getElementById("groupOne");
const groupTwo = document.getElementById("groupTwo");

const groupOneCharacters = [
  document.getElementById("char1"),
  document.getElementById("char2"),
  document.getElementById("char3"),
  document.getElementById("char4"),
];

const groupTwoCharacters = [
  document.getElementById("char5"),
  document.getElementById("char6"),
  document.getElementById("char7"),
  document.getElementById("char8"),
];

const groupOneBtn = document.getElementById("groupOneBtn");
const groupTwoBtn = document.getElementById("groupTwoBtn");
const nextBtn = document.getElementById("nextBtn");

groupOneBtn.addEventListener("click", () => {
  selectGroup(groupOne, groupOneCharacters);
});

groupTwoBtn.addEventListener("click", () => {
  selectGroup(groupTwo, groupTwoCharacters);
});

nextBtn.addEventListener("click", () => {
  window.location.href = "game.html";
});

function selectGroup(selectedGroup, selectedCharacters) {
  groupOne.classList.remove("selected");
  groupTwo.classList.remove("selected");
  selectedGroup.classList.add("selected");

  const characterSrc = selectedCharacters.map((c) => c.src);

  localStorage.setItem("selectedGroup", selectedGroup.id);
  localStorage.setItem("selectedCharacters", JSON.stringify(characterSrc));
  nextBtn.style.display = "block";
}
