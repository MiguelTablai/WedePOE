// Helper: Detect current page by filename
const currentPage = window.location.pathname.split("/").pop();

/* ========= 1. Homepage Enhancements ========= */
// Dynamic Greeting based on time of day
if (currentPage === "index.html" || currentPage === "") {
  const header = document.querySelector("header h1");
  if (header) {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon, time for a cold brew?";
    else greeting = "Good Evening, unwind with FrostFlow.";

    const greetingEl = document.createElement("p");
    greetingEl.textContent = greeting;
    greetingEl.style.fontSize = "1.2rem";
    greetingEl.style.marginTop = "10px";
    header.appendChild(greetingEl);
  }
}

/* ========= 2. Products Page Enhancements ========= */
if (currentPage === "products.html") {
  const table = document.querySelector("main table");
  if (table) {
    const cells = table.querySelectorAll("td");
    cells.forEach((cell) => {
      // set transitions once (background-color + transform)
      cell.style.transition = "background-color 0.25s ease, transform 0.15s ease";
      cell.style.transformOrigin = "center center";

      cell.addEventListener("mouseenter", () => {
        cell.style.backgroundColor = "#f5f5f5";
        cell.style.transform = "scale(1.05)"; // slight enlargement
      });

      cell.addEventListener("mouseleave", () => {
        cell.style.backgroundColor = "transparent";
        cell.style.transform = "none"; // reset scale
      });
    });
  }
}

/* ========= 3. Retailers Page Enhancements ========= */
if (currentPage === "retailers.html") {
  const table = document.querySelector("table");
  if (table) {
    // Create a search bar
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search retailers...";
    searchInput.style.marginBottom = "10px";
    searchInput.style.padding = "8px";
    searchInput.style.width = "250px";      // <-- set desired width
    searchInput.style.maxWidth = "90%";     // <-- keeps it responsive on small screens
    table.parentNode.insertBefore(searchInput, table);

    // Filter retailers
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      const rows = table.querySelectorAll("tr");

      rows.forEach((row, i) => {
        if (i === 0) return; 
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
    }
}

/* ========= 4. Blog Page Enhancements ========= */
if (currentPage === "blog.html") {
  const paragraphs = document.querySelectorAll("article p");
  paragraphs.forEach((p, idx) => {
    // don't re-process a paragraph
    if (p.dataset.enhanced === "true") return;

    const fullHTML = p.innerHTML.trim();
    const fullText = p.textContent.trim();
    const maxLen = 120; // adjust preview length

    // if short already, no toggle needed
    if (fullText.length <= maxLen) {
      p.dataset.enhanced = "true";
      return;
    }

    // create a plain-text truncated preview
    const truncatedText = fullText.slice(0, maxLen).trim() + "...";

    // store originals safely in data attributes
    p.dataset.original = fullHTML;
    p.dataset.truncated = truncatedText;
    p.dataset.expanded = "false";
    p.dataset.enhanced = "true";

    // ensure the paragraph has an id for aria-controls
    if (!p.id) p.id = `blog-paragraph-${idx + 1}`;

    // replace paragraph content with truncated preview (as text)
    p.textContent = truncatedText;

    // create accessible toggle button
    const button = document.createElement("button");
    button.type = "button";
    button.className = "read-toggle";
    button.textContent = "Read more";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", p.id);

    // insert the button after the paragraph
    p.after(button);

    // toggle handler restores or collapses content
    button.addEventListener("click", () => {
      const expanded = p.dataset.expanded === "true";
      if (expanded) {
        // collapse
        p.textContent = p.dataset.truncated;
        button.textContent = "Read more";
        button.setAttribute("aria-expanded", "false");
        p.dataset.expanded = "false";
      } else {
        // expand (restore original HTML)
        p.innerHTML = p.dataset.original;
        button.textContent = "Show less";
        button.setAttribute("aria-expanded", "true");
        p.dataset.expanded = "true";
      }
    });
  });
}

/* ========= 5. Contact Page Enhancements ========= */
if (currentPage === "contact.html") {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Display confirmation
      form.innerHTML = `<p>✅ Thank you, ${name}! Your message has been received.</p>`;
    });
  }
}

/* ========= 6. Footer Enhancement (Applies to All Pages) ========= */
const footer = document.querySelector("footer");
if (footer) {
  const year = new Date().getFullYear();

  let copy = footer.querySelector(".copyright");
  if (!copy) {
    copy = document.createElement("p");
    copy.className = "copyright";
    footer.appendChild(copy); // append, does not overwrite other footer content
  }

  copy.textContent = `© ${year} FrostFlow Cold Brew Co. | All Rights Reserved.`;
}
