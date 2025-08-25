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
