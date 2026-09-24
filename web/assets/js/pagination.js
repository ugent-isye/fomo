(() => {
  const PAGE_SIZE = 10;

  const init = () => {
    const table = document.querySelector("main table");
    if (!table || !table.tBodies.length) return;
    const rows = Array.from(table.tBodies[0].rows);
    if (rows.length <= PAGE_SIZE) return;

    const pageCount = Math.ceil(rows.length / PAGE_SIZE);
    let page = 0;

    const nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "Ontology table pages");

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "Previous";

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next";

    const status = document.createElement("span");
    status.className = "pager-status";
    status.setAttribute("aria-live", "polite");

    const render = () => {
      rows.forEach((row, i) => {
        row.classList.toggle("paged-out", Math.floor(i / PAGE_SIZE) !== page);
      });
      prev.disabled = page === 0;
      next.disabled = page === pageCount - 1;
      status.textContent = `Page ${page + 1} of ${pageCount}`;
    };

    prev.addEventListener("click", () => {
      page -= 1;
      render();
    });
    next.addEventListener("click", () => {
      page += 1;
      render();
    });

    nav.append(prev, status, next);
    table.insertAdjacentElement("afterend", nav);
    render();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
