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
    // console.warn(`${proxy} failed:`, error);
    alert("❌ Failed to shorten URL");
  }
}

const shortenBtn = document
  .querySelector(".shortenIt")
  .addEventListener("click", async () => {
    const userInput = document.querySelector(".urlInput").value.trim();

    const response = await shortenUrl(userInput);
    // result_url converts the object into string
    const shortUrl = response.result_url;

    const result = document.createElement("div");
    result.className = "result";
    result.innerHTML = ` 
    <div class="userInput">${userInput}</div>
    <div class="linkBtn"><div class="shortenedUrl"><a href="${shortUrl}" target="_blank">${shortUrl}</a> </div>
    <button class="copy">Copy</button></div>

    
    `;

    const resultBox = document.querySelector(".resultBox");
    resultBox.appendChild(result);
  });
