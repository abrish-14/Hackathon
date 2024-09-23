const toggle_Button = document.getElementById("button") as HTMLButtonElement;
const skills = document.getElementById("skills") as HTMLElement;

toggle_Button.addEventListener("click", () => {
  if (skills.style.display === "none") {
    skills.style.display = " block";
  } else {
    skills.style.display = "none";
  }
});