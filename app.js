/**
 * ACCION 360 — demo de login + catálogo de horas (memoria o Supabase)
 */
(function () {
  "use strict";

  const DEMO_PASSWORD = "demo1234";
  const MATRICULA_OK = /^\d{10}$/;
  const RECOVERY_CODE_OK = "123456";
  const TABLE = "service_activities";

  const EMAIL_OK =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const HORAS_ASIGNADAS = 150;

  /** @type {{ id: string, name: string, detail: string, hours: number, completed: boolean }[]} */
  let activities = [];

  let supabaseClient = null;
  /** @type {Promise<unknown> | null} */
  let supabasePromise = null;

  function $(id) {
    return document.getElementById(id);
  }

  function refreshIcons() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function setCatalogError(message) {
    const el = $("catalogError");
    if (!el) return;
    if (message) {
      el.textContent = message;
      el.hidden = false;
    } else {
      el.textContent = "";
      el.hidden = true;
    }
  }

  function mapRow(row) {
    const h = row.hours;
    return {
      id: row.id,
      name: row.name,
      detail: row.detail,
      hours: typeof h === "number" ? h : parseFloat(String(h), 10),
      completed: !!row.completed,
    };
  }

  /**
   * Cliente Supabase (clave publicable + URL del proyecto).
   * Si la clave nueva (`sb_publishable_…`) falla, en el panel usa la clave **anon** (JWT) en `config.js`.
   */
  async function getSupabase() {
    const url = window.SUPABASE_URL;
    const key = window.SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    if (supabaseClient) return supabaseClient;
    if (!supabasePromise) {
      supabasePromise = import("https://esm.sh/@supabase/supabase-js@2.49.1")
        .then(function (mod) {
          supabaseClient = mod.createClient(url, key, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          return supabaseClient;
        })
        .catch(function (err) {
          console.error(err);
          supabasePromise = null;
          return null;
        });
    }
    return supabasePromise;
  }

  async function loadActivitiesFromDb() {
    const grid = $("activityGrid");
    const client = await getSupabase();

    if (!client) {
      if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
        setCatalogError(
          "Supabase no configurado. Copia config.example.js a config.js con tu URL y clave publicable."
        );
      } else {
        setCatalogError("No se pudo inicializar Supabase. Revisa la consola o la clave anon (JWT) en el panel.");
      }
      renderActivities();
      return;
    }

    setCatalogError("");
    if (grid) {
      grid.innerHTML =
        '<p class="panel-hint" style="grid-column:1/-1;margin:0">Cargando actividades…</p>';
    }

    const { data, error } = await client
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setCatalogError(error.message || "No se pudieron cargar las actividades. ¿Ejecutaste supabase/schema.sql?");
      activities = [];
      renderActivities();
      return;
    }

    activities = (data || []).map(mapRow);
    renderActivities();
  }

  function showView(viewId) {
    document.querySelectorAll(".view").forEach(function (el) {
      el.hidden = el.id !== viewId;
    });
    refreshIcons();
  }

  /* ---------- Login ---------- */
  const loginForm = $("loginForm");
  const matriculaInput = $("matricula");
  const passwordInput = $("password");
  const errMatricula = $("errMatricula");
  const errPassword = $("errPassword");
  const togglePassword = $("togglePassword");

  function clearLoginErrors() {
    errMatricula.textContent = "";
    errPassword.textContent = "";
  }

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const eye = togglePassword.querySelector("i");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        if (eye) eye.setAttribute("data-lucide", "eye-off");
      } else {
        passwordInput.type = "password";
        if (eye) eye.setAttribute("data-lucide", "eye");
      }
      refreshIcons();
    });
  }

  function enterDashboard() {
    showView("view-dashboard");
    updateStats();
    loadActivitiesFromDb();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearLoginErrors();

      const mat = (matriculaInput && matriculaInput.value.trim()) || "";
      const pass = (passwordInput && passwordInput.value) || "";

      if (!mat) {
        errMatricula.textContent = "Ingresa tu matrícula.";
        return;
      }
      if (!pass) {
        errPassword.textContent = "Ingresa tu contraseña.";
        return;
      }

      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        showView("view-error-connection");
        return;
      }

      if (!MATRICULA_OK.test(mat)) {
        showView("view-error-matricula");
        return;
      }

      if (pass !== DEMO_PASSWORD) {
        errPassword.textContent = "CONTRASEÑA INCORRECTA";
        return;
      }

      loginForm.reset();
      clearLoginErrors();
      enterDashboard();
    });
  }

  document.querySelectorAll('[data-action="retry-matricula"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView("view-login");
    });
  });

  document.querySelectorAll('[data-action="retry-connection"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView("view-login");
    });
  });

  document.querySelectorAll('[data-action="retry-code"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      $("errCode").textContent = "";
      showView("view-recovery-code");
    });
  });

  document.querySelectorAll('[data-action="back-login"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView("view-login");
    });
  });

  document.querySelectorAll('[data-action="back-recovery-email"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView("view-recovery-email");
    });
  });

  const linkForgot = $("linkForgot");
  if (linkForgot) {
    linkForgot.addEventListener("click", function (e) {
      e.preventDefault();
      const recoveryEmail = $("recoveryEmail");
      const recoveryErr = $("recoveryEmailError");
      if (recoveryEmail) recoveryEmail.value = "";
      if (recoveryErr) recoveryErr.hidden = true;
      showView("view-recovery-email");
    });
  }

  /* ---------- Recuperación: correo ---------- */
  const recoveryEmailForm = $("recoveryEmailForm");
  const recoveryEmailInput = $("recoveryEmail");
  const recoveryEmailError = $("recoveryEmailError");
  const linkResetEmail = $("linkResetEmail");

  if (linkResetEmail) {
    linkResetEmail.addEventListener("click", function (e) {
      e.preventDefault();
      if (recoveryEmailInput) {
        recoveryEmailInput.value = "";
        recoveryEmailInput.focus();
      }
      if (recoveryEmailError) recoveryEmailError.hidden = true;
    });
  }

  if (recoveryEmailForm) {
    recoveryEmailForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = (recoveryEmailInput && recoveryEmailInput.value.trim()) || "";
      if (!email) {
        if (recoveryEmailError) recoveryEmailError.hidden = false;
        return;
      }
      if (!EMAIL_OK.test(email)) {
        if (recoveryEmailError) recoveryEmailError.hidden = false;
        return;
      }
      if (recoveryEmailError) recoveryEmailError.hidden = true;
      buildCodeInputs();
      showView("view-recovery-code");
    });
  }

  /* ---------- Código ---------- */
  const codeBoxes = $("codeBoxes");
  const errCode = $("errCode");
  const btnVerifyCode = $("btnVerifyCode");

  function buildCodeInputs() {
    if (!codeBoxes) return;
    codeBoxes.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "numeric";
      input.maxLength = 1;
      input.setAttribute("aria-label", "Dígito " + (i + 1));
      input.addEventListener("input", function () {
        if (input.value.length === 1 && input.nextElementSibling) {
          input.nextElementSibling.focus();
        }
      });
      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Backspace" && !input.value && input.previousElementSibling) {
          input.previousElementSibling.focus();
        }
      });
      codeBoxes.appendChild(input);
    }
    const first = codeBoxes.querySelector("input");
    if (first) first.focus();
    refreshIcons();
  }

  if (codeBoxes) {
    codeBoxes.addEventListener("paste", function (ev) {
      ev.preventDefault();
      const paste = (ev.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "");
      const inputs = codeBoxes.querySelectorAll("input");
      if (!inputs.length) return;
      paste.split("").forEach(function (ch, idx) {
        if (inputs[idx]) inputs[idx].value = ch;
      });
      const last = Math.min(paste.length, inputs.length) - 1;
      if (last >= 0 && inputs[last]) inputs[last].focus();
    });
  }

  function getCodeValue() {
    if (!codeBoxes) return "";
    return Array.from(codeBoxes.querySelectorAll("input"))
      .map(function (inp) {
        return inp.value;
      })
      .join("");
  }

  if (btnVerifyCode) {
    btnVerifyCode.addEventListener("click", function () {
      const code = getCodeValue();
      if (!errCode) return;
      errCode.textContent = "";
      if (code.length !== 6) {
        errCode.textContent = "Ingresa los 6 dígitos del código.";
        return;
      }
      if (code !== RECOVERY_CODE_OK) {
        showView("view-error-code");
        return;
      }
      enterDashboard();
    });
  }

  /* ---------- Dashboard: estadísticas ---------- */
  function sumHours() {
    return activities.reduce(function (s, a) {
      return s + a.hours;
    }, 0);
  }

  function updateStats() {
    const realizadas = sumHours();
    const pendientes = Math.max(0, HORAS_ASIGNADAS - realizadas);
    const elA = $("statAsignadas");
    const elR = $("statRealizadas");
    const elP = $("statPendientes");
    if (elA) elA.textContent = String(HORAS_ASIGNADAS);
    if (elR) elR.textContent = Number.isInteger(realizadas) ? String(realizadas) : realizadas.toFixed(2);
    if (elP) elP.textContent = Number.isInteger(pendientes) ? String(pendientes) : pendientes.toFixed(2);
  }

  const btnRefresh = $("btnRefresh");
  if (btnRefresh) {
    btnRefresh.addEventListener("click", function () {
      loadActivitiesFromDb();
    });
  }

  /* ---------- Actividades ---------- */
  const activityForm = $("activityForm");
  const nameInput = $("activityName");
  const detailInput = $("activityDetail");
  const hoursInput = $("activityHours");
  const grid = $("activityGrid");
  const emptyState = $("emptyState");
  const searchInput = $("searchInput");

  const errActName = $("errActName");
  const errActDetail = $("errActDetail");
  const errActHours = $("errActHours");

  function clearActErrors() {
    if (errActName) errActName.textContent = "";
    if (errActDetail) errActDetail.textContent = "";
    if (errActHours) errActHours.textContent = "";
  }

  function validateActivity() {
    clearActErrors();
    let ok = true;
    const name = nameInput ? nameInput.value.trim() : "";
    const detail = detailInput ? detailInput.value.trim() : "";
    const hoursRaw = hoursInput ? hoursInput.value.trim() : "";

    if (!name) {
      if (errActName) errActName.textContent = "Indica el nombre de la actividad.";
      ok = false;
    }
    if (!detail) {
      if (errActDetail) errActDetail.textContent = "Describe el detalle de la actividad.";
      ok = false;
    }
    if (!hoursRaw) {
      if (errActHours) errActHours.textContent = "Indica las horas.";
      ok = false;
    } else {
      const h = Number(hoursRaw);
      if (Number.isNaN(h) || h < 0) {
        if (errActHours) errActHours.textContent = "Las horas deben ser un número válido (≥ 0).";
        ok = false;
      }
    }
    return ok;
  }

  function getFiltered() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (!q) return activities;
    return activities.filter(function (a) {
      return a.name.toLowerCase().includes(q);
    });
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function formatHours(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2);
  }

  function renderActivities() {
    if (!grid || !emptyState) return;

    const list = getFiltered();
    const showEmpty = activities.length === 0;

    emptyState.hidden = !showEmpty;
    grid.innerHTML = "";

    if (showEmpty) {
      updateStats();
      refreshIcons();
      return;
    }

    if (list.length === 0 && activities.length > 0) {
      grid.innerHTML =
        '<p class="panel-hint" style="grid-column:1/-1;margin:0">No hay actividades que coincidan con la búsqueda.</p>';
      updateStats();
      refreshIcons();
      return;
    }

    list.forEach(function (a) {
      const card = document.createElement("article");
      card.className = "activity-card" + (a.completed ? " completed" : "");
      card.dataset.id = a.id;
      card.setAttribute("role", "listitem");

      card.innerHTML =
        '<div class="activity-card-header">' +
        '<h3 class="activity-name">' +
        escapeHtml(a.name) +
        "</h3>" +
        '<div class="activity-actions">' +
        '<button type="button" class="btn-icon" data-action="delete" title="Eliminar actividad" aria-label="Eliminar">' +
        '<i data-lucide="trash-2"></i>' +
        "</button>" +
        "</div>" +
        "</div>" +
        '<p class="activity-desc">' +
        escapeHtml(a.detail) +
        "</p>" +
        '<div class="activity-meta">' +
        '<span class="hours-badge"><i data-lucide="timer"></i> ' +
        formatHours(a.hours) +
        " h</span>" +
        '<label class="complete-toggle">' +
        '<input type="checkbox" data-action="toggle" ' +
        (a.completed ? "checked" : "") +
        " /> Completada" +
        "</label>" +
        "</div>";

      grid.appendChild(card);
    });

    updateStats();
    refreshIcons();
  }

  if (activityForm) {
    activityForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!validateActivity()) return;

      const name = nameInput.value.trim();
      const detail = detailInput.value.trim();
      const hours = Number(hoursInput.value);

      const client = await getSupabase();

      if (!client) {
        activities.push({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + String(Math.random()),
          name: name,
          detail: detail,
          hours: hours,
          completed: false,
        });
        activityForm.reset();
        clearActErrors();
        renderActivities();
        return;
      }

      const { data, error } = await client
        .from(TABLE)
        .insert({ name: name, detail: detail, hours: hours, completed: false })
        .select()
        .single();

      if (error) {
        setCatalogError(error.message || "No se pudo guardar la actividad.");
        return;
      }

      setCatalogError("");
      activityForm.reset();
      clearActErrors();
      activities.unshift(mapRow(data));
      renderActivities();
    });
  }

  if (grid) {
    grid.addEventListener("click", async function (e) {
      const delBtn = e.target.closest('[data-action="delete"]');
      if (!delBtn) return;
      const card = delBtn.closest(".activity-card");
      const id = card && card.dataset.id;
      if (!id) return;

      const client = await getSupabase();
      if (!client) {
        activities = activities.filter(function (a) {
          return a.id !== id;
        });
        renderActivities();
        return;
      }

      const { error } = await client.from(TABLE).delete().eq("id", id);
      if (error) {
        setCatalogError(error.message || "No se pudo eliminar.");
        return;
      }

      setCatalogError("");
      activities = activities.filter(function (a) {
        return a.id !== id;
      });
      renderActivities();
    });

    grid.addEventListener("change", async function (e) {
      const cb = e.target;
      if (!cb.matches || !cb.matches('input[data-action="toggle"]')) return;
      const card = cb.closest(".activity-card");
      const id = card && card.dataset.id;
      if (!id) return;

      let act = null;
      for (let i = 0; i < activities.length; i++) {
        if (activities[i].id === id) {
          act = activities[i];
          break;
        }
      }
      if (!act) return;

      const completed = cb.checked;
      const client = await getSupabase();

      if (!client) {
        act.completed = completed;
        card.classList.toggle("completed", completed);
        return;
      }

      const { error } = await client.from(TABLE).update({ completed: completed }).eq("id", id);
      if (error) {
        cb.checked = !completed;
        setCatalogError(error.message || "No se pudo actualizar.");
        return;
      }

      setCatalogError("");
      act.completed = completed;
      card.classList.toggle("completed", completed);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderActivities);
  }

  showView("view-login");
  refreshIcons();
})();
