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

	const alert = document.createElement("div");
	alert.className = "alertMsg";
	alert.textContent = "Please add a link";

	ShortenBtn.addEventListener("click", () => {
		if (input.value.trim() === "") {
			input.classList.add("error");
			input.style.border = "2px solid rgba(255, 20, 0, 0.9)";
			alert.style.display = "flex";
			input.insertAdjacentElement("afterend", alert);
		} else {
			input.classList.remove("error"); // resets to normal
			input.style.border = "";
			alert.style.display = "none";
		}
	});
}
EnterUrl();

async function shortenUrl(longurl) {
	try {
		const proxy = "https://corsproxy.io/?";
		// The real API
		const apiUrl = "https://cleanuri.com/api/v1/shorten";
		// encodeURIComponent(API_URL) → makes the API URL safe to pass as a query string so that it does not gets mixed up with the proxy string
		const response = await fetch(proxy + encodeURIComponent(apiUrl), {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `url=${encodeURIComponent(longurl)}`,
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			return data;
		}
	} catch (error) {
		console.warn(`${proxy} failed:`, error);
		alert("Failed to shorten URL");
	}
}
function isAlreadyShortened(url) {
	return (
		url.includes("cleanuri.com") ||
		url.includes("bit.ly") ||
		url.includes("tinyurl.com")
	);
}
function CopyListener(btn, shortUrl) {
	btn.addEventListener("click", () => {
		navigator.clipboard.writeText(shortUrl).then(() => {
			btn.textContent = "Copied!";
			btn.style.background = "hsl(257, 27%, 26%)";
			setTimeout(() => {
				btn.textContent = "Copy";
				btn.style.background = "";
			}, 2000);
		});
	});
}
const shortenBtn = document
	.querySelector(".shortenIt")
	.addEventListener("click", async () => {
		const userInput = document.querySelector(".urlInput").value.trim();
		if (userInput === "") {
			return;
		}
		function validateURL(userInput) {
			try {
				new URL(userInput);
				return true; // valid URL
			} catch (e) {
				return false; // invalid URL
			}
		}
		if (!validateURL(userInput)) {
			alert("The URL you entered is not valid!");
		}
		if (isAlreadyShortened(userInput)) {
			alert("You can’t shorten an already shortened URL.");
			return;
		}

		const response = await shortenUrl(userInput);
		// result_url converts the object into string
		const shortUrl = response.result_url;

		// Save to Local Storage

		let stored = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
		stored.push({ original: userInput, shortened: shortUrl });
		localStorage.setItem("shortenedUrls", JSON.stringify(stored));

		const result = document.createElement("div");
		result.className = "result";
		result.innerHTML = ` 
    <div class="userInput">${userInput}</div>
    <div class="linkBtn"><div class="shortenedUrl"><a href="${shortUrl}" target="_blank">${shortUrl}</a> </div>
    <button class="copy">Copy</button>
		 <button class="delete">Delete</button>
		 </div>
    `;

		const resultBox = document.querySelector(".resultBox");
		resultBox.appendChild(result);
		const copyBtn = result.querySelector(".copy");
		CopyListener(copyBtn, shortUrl); // for newly created

		const deleteBtn = result.querySelector(".delete");
		deleteBtn.addEventListener("click", () => {
			let stored = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
			stored = stored.filter(
				(link) => link.shortened !== shortUrl || link.original !== userInput
			);
			localStorage.setItem("shortenedUrls", JSON.stringify(stored));
			result.remove();
		});
	});

// Restore shortened URLs on page load
window.addEventListener("DOMContentLoaded", () => {
	const resultBox = document.querySelector(".resultBox");
	const stored = JSON.parse(localStorage.getItem("shortenedUrls")) || [];

	stored.forEach((item) => {
		const result = document.createElement("div");
		result.className = "result";
		result.innerHTML = ` 
			<div class="userInput">${item.original}</div>
			<div class="linkBtn">
				<div class="shortenedUrl"><a href="${item.shortened}" target="_blank">${item.shortened}</a></div>
				<button class="copy">Copy</button>
				 <button class="delete">Delete</button>
			</div>
		`;

		resultBox.appendChild(result);

		const copyBtn = result.querySelector(".copy");
		CopyListener(copyBtn, item.shortened);

		const deleteBtn = result.querySelector(".delete");
		deleteBtn.addEventListener("click", () => {
			let stored = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
			stored = stored.filter(
				(link) =>
					link.shortened !== item.shortened || link.original !== item.original
			);
			localStorage.setItem("shortenedUrls", JSON.stringify(stored));
			result.remove();
		});
	});
});
