const groupOne = document.getElementById("groupOne");
const groupTwo = document.getElementById("groupTwo");

const groupOneBtn = document.getElementById("groupOneBtn");
const groupTwoBtn = document.getElementById("groupTwoBtn");

groupOneBtn.addEventListener("click", () => {
  selectGroup(groupOne);
});

groupTwoBtn.addEventListener("click", () => {
  selectGroup(groupTwo);
});

function selectGroup(selectedGroup) {
  groupOne.classList.remove("selected");
  groupTwo.classList.remove("selected");
  selectedGroup.classList.add("selected");
  localStorage.setItem("selectedGroup", selectedGroup.id);

}
