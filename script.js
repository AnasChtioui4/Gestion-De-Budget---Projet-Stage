let projets = [];

const filterBtn = document.getElementById("filter");
const filterOption = document.querySelector(".filter_op");
const addProjectBtn = document.getElementById("add_prj");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelProjet = document.getElementById("cancelBtn");
const overlay = document.getElementById("overlay");
const projetsSection = document.querySelector(".projets");
let totalProjetDisplay = document.getElementById("total_prj");

// Form Variables
const titleDisplay = document.getElementById("title-preview");
const title = document.getElementById("projet-title");
const budget = document.getElementById("budget");
const resourceList = document.getElementById("resourceList");
const emptyList = document.getElementById("emptyList");
const totalResourceDisplay = document.getElementById("totalResource");
const barFill = document.getElementById("barFill");
const restValueDisplay = document.getElementById("restValue");
const statusBadge = document.getElementById("statusBadge");
const saveBtn = document.getElementById("saveBtn");

// ============ OPEN / CLOSE MODAL ============

function closeModal() {
  overlay.classList.add("hidden");
  resetForm();
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

addProjectBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", closeModal);

cancelProjet.addEventListener("click", closeModal);

function updateTitle() {
  const val = title.value.trim();
  titleDisplay.textContent = val || "Nouveau Projet";
}

// ============ FILTER DROPDOWN ============

filterBtn.addEventListener("click", () => {
  filterOption.classList.toggle("hidden");
});

// ============ RESOURCE ROWS ============

function addResource() {
  const row = document.createElement("div");
  row.className = "resource-row";
  row.innerHTML = `<input
                  type="text"
                  class="rname"
                  placeholder="Nom de la ressource"
                  oninput="recalculate()"
                />
                <input
                  type="number"
                  class="rprice"
                  min="0"
                  placeholder="Prix (MAD)"
                  oninput="recalculate()"
                />
                <button class="remove-btn" onclick="removeRow(this)">✕</button>`;
  resourceList.appendChild(row);
  emptyList.classList.add("hidden");
  recalculate();
}

function removeRow(btn) {
  btn.closest(".resource-row").remove();
  if (resourceList.querySelectorAll(".resource-row").length === 0) {
    emptyList.classList.remove("hidden");
  }
  recalculate();
}

// ============ CALCULATIONS ============

function getStats(budgetValue, resources) {
  const spent = resources.reduce((sum, r) => sum + r.prix, 0);
  const rest = budgetValue - spent;
  let status = "ok";
  if (rest < 0) status = "over";
  else if (budgetValue > 0 && rest / budgetValue < 0.2) status = "warn";
  return { spent, rest, status };
}

function recalculate() {
  const budgetValue = parseFloat(budget.value) || 0;

  const resources = Array.from(resourceList.querySelectorAll(".resource-row")).map((row) => ({
    prix: parseFloat(row.querySelector(".rprice").value) || 0,
  }));

  const { spent, rest, status } = getStats(budgetValue, resources);

  totalResourceDisplay.textContent = spent.toFixed(2) + " MAD";
  restValueDisplay.textContent = rest.toFixed(2) + " MAD";

  const pct = budgetValue > 0 ? Math.min(100, (spent / budgetValue) * 100) : 0;
  barFill.style.width = pct + "%";

  restValueDisplay.classList.remove("ok", "warn", "over");
  statusBadge.classList.remove("ok", "warn", "over");
  restValueDisplay.classList.add(status);
  statusBadge.classList.add(status);

  if (status === "over") {
    statusBadge.textContent = "Depasse !";
    barFill.style.background = "#EF3E36";
  } else if (status === "warn") {
    statusBadge.textContent = "Attention";
    barFill.style.background = "#E8A93A";
  } else {
    statusBadge.textContent = "Bien !";
    barFill.style.background = "#3FBE8E";
  }

  saveBtn.disabled = rest < 0 || budgetValue <= 0;
}

// updateBudget is referenced by your HTML's oninput, keep it as an alias
function updateBudget() {
  recalculate();
}

// ============ RESET FORM ============

function resetForm() {
  title.value = "";
  budget.value = "";
  titleDisplay.textContent = "Nouveau Projet";
  resourceList.innerHTML = "";
  emptyList.classList.remove("hidden");
  addResource();
}

// ============ SAVE PROJECT ============

saveBtn.addEventListener("click", () => {
  const nom = title.value.trim() || "Projet sans nom";
  const budgetValue = parseFloat(budget.value) || 0;

  const resources = Array.from(resourceList.querySelectorAll(".resource-row")).map((row) => ({
    nom: row.querySelector(".rname").value || "Ressource",
    prix: parseFloat(row.querySelector(".rprice").value) || 0,
  }));

  const newProjet = { id: Date.now(), nom, budget: budgetValue, resources };
  projets.push(newProjet);

  renderProjects();
  closeModal();
});

// ============ RENDER PROJECTS ON MAIN PAGE ============

function renderProjects() {
  // remove every existing .projet card, but keep the "+" button
  projetsSection.querySelectorAll(".projet").forEach((card) => card.remove());

  projets.forEach((projet) => {
    const { rest, status } = getStats(projet.budget, projet.resources);
    const statusLabel = status === "over" ? "Depasse !" : status === "warn" ? "Attention" : "Bien !";

    const card = document.createElement("div");
    card.className = "projet";
    card.innerHTML = `
      <h2>${projet.nom}</h2>
      <p>Budget: <span class="budget-value">${projet.budget.toFixed(2)} dh</span></p>
      <p>Statut: <span class="statut-badge ${status}">${statusLabel}</span></p>
    `;

    // insert before the "+" button so it always stays last
    projetsSection.insertBefore(card, addProjectBtn);
  });

  totalProjetDisplay.textContent = projetsSection.querySelectorAll(".projet").length;
}

// ============ INIT ============

totalProjetDisplay.textContent = projetsSection.querySelectorAll(".projet").length;