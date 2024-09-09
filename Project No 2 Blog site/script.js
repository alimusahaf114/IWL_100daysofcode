const darkbtn = document.getElementById("dark");
const whitebtn = document.getElementById("light");
function dark() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
}
function white() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
}
darkbtn.addEventListener("click", dark);
whitebtn.addEventListener("click", white);
