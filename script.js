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
        cell.style.backgroundColor = "#396ea0ff";
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
  const table = document.querySelector("main table");
  if (table) {
    // wrapper & input
    const wrapper = document.createElement("div");
    wrapper.className = "retailer-search-wrapper";
    wrapper.style.margin = "12px 0";
    wrapper.style.position = "relative";
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.placeholder = "Search retailers...";
    searchInput.style.padding = "8px";
    searchInput.style.width = "250px";
    searchInput.style.maxWidth = "90%";
    searchInput.setAttribute("aria-label", "Search retailers");
    wrapper.appendChild(searchInput);

    // suggestions dropdown
    const sugg = document.createElement("ul");
    sugg.className = "retailer-suggestions";
    sugg.style.listStyle = "none";
    sugg.style.padding = "6px";
    sugg.style.margin = "6px 0 0 0";
    sugg.style.border = "1px solid #ccc";
    sugg.style.background = "#fff";
    sugg.style.maxHeight = "160px";
    sugg.style.overflowY = "auto";
    sugg.style.width = "250px";
    sugg.style.maxWidth = "90%";
    sugg.style.display = "none";
    sugg.style.position = "absolute";
    sugg.style.zIndex = "1000";
    wrapper.appendChild(sugg);

    // display chosen / matched name
    const display = document.createElement("div");
    display.className = "retailer-selected";
    display.style.marginTop = "8px";
    display.style.fontWeight = "600";
    wrapper.appendChild(display);

    table.parentNode.insertBefore(wrapper, table);

    // collect retailer names from table cells
    const rows = Array.from(table.querySelectorAll("tr"));
    const dataRows = rows.filter((r, i) => !(i === 0 && r.querySelectorAll("th").length > 0));
    const names = Array.from(
      new Set(
        dataRows.map((r) => {
          const b = r.querySelector("td b");
          if (b && b.textContent.trim()) return b.textContent.trim();
          const firstTd = r.querySelector("td");
          return firstTd ? firstTd.textContent.trim().split("\n")[0].trim() : r.textContent.trim();
        })
      )
    ).filter(Boolean);

    // helper to render suggestions
    const renderSuggestions = (q) => {
      sugg.innerHTML = "";
      if (!q) {
        sugg.style.display = "none";
        return;
      }
      const ql = q.toLowerCase();
      const matches = names.filter((n) => n.toLowerCase().includes(ql));
      if (matches.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No matches";
        li.style.padding = "6px";
        sugg.appendChild(li);
        sugg.style.display = "block";
        return;
      }
      matches.forEach((m) => {
        const li = document.createElement("li");
        li.textContent = m;
        li.style.padding = "6px";
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          searchInput.value = m;
          sugg.style.display = "none";
          display.textContent = m; // show chosen name
          filterRows(); // apply filter to table
        });
        li.addEventListener("mouseenter", () => (li.style.background = "#f0f0f0"));
        li.addEventListener("mouseleave", () => (li.style.background = "transparent"));
        sugg.appendChild(li);
      });
      sugg.style.display = "block";
    };

    // filtering function: shows/hides rows based on input value
    const filterRows = () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q === "") {
        dataRows.forEach((r) => (r.style.display = ""));
        display.textContent = "";
        return;
      }
      let firstMatch = "";
      dataRows.forEach((r) => {
        const text = r.textContent.trim().toLowerCase();
        const show = text.includes(q);
        r.style.display = show ? "" : "none";
        if (show && !firstMatch) {
          // extract display name for the first matching row
          const b = r.querySelector("td b");
          firstMatch = (b && b.textContent.trim()) || (r.querySelector("td") && r.querySelector("td").textContent.trim());
        }
      });
      display.textContent = firstMatch || ""; // show first matched retailer name
    };

    // input handlers
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      renderSuggestions(q);
      filterRows();
    });

    // keyboard behaviors: Enter selects first suggestion, Escape clears
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        sugg.style.display = "none";
        filterRows();
      } else if (e.key === "Enter") {
        // if suggestions visible, pick the first one
        const first = sugg.querySelector("li");
        if (first && first.textContent !== "No matches") {
          e.preventDefault();
          const val = first.textContent;
          searchInput.value = val;
          display.textContent = val;
          sugg.style.display = "none";
          filterRows();
        }
      }
    });

    // click outside to close suggestions
    document.addEventListener("click", (ev) => {
      if (!wrapper.contains(ev.target)) sugg.style.display = "none";
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
