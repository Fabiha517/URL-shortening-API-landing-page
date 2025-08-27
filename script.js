function showMenu() {
  const menu = document.querySelector(".menu");
  const menusvg = document.querySelector(".menusvg");
  const menuOp = document.createElement("div");
  menuOp.className = "menuOp";
  menuOp.style.display = "none";
  const clonedItems = menu.cloneNode(true);
  menusvg.addEventListener("click", () => {
    menuOp.style.display = "block";
  });
  menuOp.appendChild(clonedItems);
  document.body.appendChild(menuOp);
  window.addEventListener("scroll", () => {
    menuOp.style.display = "none";
  });
  document.addEventListener("click", (e) => {
    if (!menuOp.contains(e.target) && !menusvg.contains(e.target)) {
      menuOp.style.display = "none";
    }
  });
}
showMenu();
function EnterUrl() {
  const input = document.querySelector(".inputBox input");
  const ShortenBtn = document.querySelector(".shortenIt");
  const inputBox = document.querySelector(".inputBox");

  const alert = document.createElement("div")
  alert.className="alertMsg"
  alert.textContent="Please add a link"
  
  ShortenBtn.addEventListener("click", () => {
    if (input.value.trim() === "") {
      input.classList.add("error");
      input.style.border = "2px solid rgba(255, 20, 0, 0.9)";
      alert.style.display = "flex";
      input.insertAdjacentElement("afterend",alert)
    } else {
      input.classList.remove("error"); // resets to normal
      input.style.border = "";
    }
  });
}
EnterUrl();
