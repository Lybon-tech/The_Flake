/* ===========================================================
   THE FLAKE — APPLICATION LOGIC
   Vanilla JS SPA shell. Renders role-scoped views from the
   FLAKE_DATA mock dataset. No build step required.
=========================================================== */

(function () {
  const D = FLAKE_DATA;
  const byId = (arr, id) => arr.find(x => x.id === id);
  const learnerById = id => byId(D.learners, id);
  const fmt = n => (n === null || n === undefined ? "—" : n);
  const todayISO = "2026-09-03";

  const icon = (path, vb = "0 0 24 24") =>
    `<svg viewBox="${vb}" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

  const ICONS = {
    dashboard: icon('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
    calendar: icon('<rect x="3" y="4.5" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/>'),
    timetable: icon('<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="4" x2="9" y2="21"/><line x1="15" y1="4" x2="15" y2="21"/>'),
    schoolwork: icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>'),
    marks: icon('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>'),
    attendance: icon('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    support: icon('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    intervention: icon('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'),
    resources: icon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
    messages: icon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    notifications: icon('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
    reports: icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/>'),
    admin: icon('<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/>'),
    profile: icon('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>'),
    plus: icon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    check: icon('<polyline points="20 6 9 17 4 12"/>'),
    trendUp: icon('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),
    trendDown: icon('<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>'),
    trendFlat: icon('<line x1="2" y1="12" x2="22" y2="12"/>'),
    search: icon('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    send: icon('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'),
    x: icon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    award: icon('<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>')
  };

  /* ============ ROLE CONFIG ============ */
  const ROLES = [
    { id: "learner", name: "Lindiwe Baloyi", label: "Learner", avatar: "LB", userId: "L001",
      desc: "See your marks, schoolwork, timetable and support in one place." },
    { id: "parent", name: "Mr & Mrs Baloyi", label: "Parent / Guardian", avatar: "PB", userId: "P001",
      desc: "Follow your children's progress, attendance and communication with teachers." },
    { id: "teacher", name: "T. Jooste", label: "Teacher", avatar: "TJ", userId: "TCH1",
      desc: "Manage classes, mark work, and act on early-warning indicators." },
    { id: "admin", name: "S. van Wyk", label: "School Administrator", avatar: "SV", userId: "ADM1",
      desc: "Configure learners, staff, classes and system-wide settings." },
    { id: "principal", name: "Dr. P. Khumalo", label: "Principal", avatar: "PK", userId: "PRI1",
      desc: "A school-wide view of performance, attendance and support outcomes." }
  ];

  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard, roles: ["learner","parent","teacher","admin","principal"] },
    { id: "calendar", label: "Calendar", icon: ICONS.calendar, roles: ["learner","parent","teacher","admin"] },
    { id: "timetable", label: "Timetable", icon: ICONS.timetable, roles: ["learner","teacher"] },
    { id: "schoolwork", label: "Schoolwork", icon: ICONS.schoolwork, roles: ["learner","parent","teacher"] },
    { id: "marks", label: "Assessments & Progress", icon: ICONS.marks, roles: ["learner","parent","teacher"] },
    { id: "attendance", label: "Attendance", icon: ICONS.attendance, roles: ["learner","parent","teacher"] },
    { id: "support", label: "Alerts & Support", icon: ICONS.support, roles: ["learner","parent","teacher","principal"] },
    { id: "interventions", label: "Interventions", icon: ICONS.intervention, roles: ["teacher","principal"] },
    { id: "resources", label: "Learning Resources", icon: ICONS.resources, roles: ["learner","teacher","admin"] },
    { id: "messages", label: "Messages", icon: ICONS.messages, roles: ["learner","parent","teacher"] },
    { id: "notifications", label: "Notifications", icon: ICONS.notifications, roles: ["learner","parent","teacher","admin","principal"] },
    { id: "reports", label: "Reports", icon: ICONS.reports, roles: ["parent","teacher","admin","principal"] },
    { id: "admin", label: "School Administration", icon: ICONS.admin, roles: ["admin"] },
    { id: "profile", label: "Profile & Settings", icon: ICONS.profile, roles: ["learner","parent","teacher","admin","principal"] }
  ];

  const VIEW_META = {
    dashboard: { title: "Dashboard", sub: "How is everything looking right now?" },
    calendar: { title: "Calendar", sub: "Deadlines, assessments and school events" },
    timetable: { title: "Timetable", sub: "This week's classes" },
    schoolwork: { title: "Schoolwork", sub: "Homework, assignments and projects" },
    marks: { title: "Assessments & Progress", sub: "Results over time, not just one mark" },
    attendance: { title: "Attendance", sub: "Presence over time" },
    support: { title: "Alerts & Support", sub: "Early, clear, coordinated support" },
    interventions: { title: "Interventions", sub: "What we're doing, and whether it's working" },
    resources: { title: "Learning Resources", sub: "Approved material, matched to need" },
    messages: { title: "Messages", sub: "Secure communication" },
    notifications: { title: "Notifications", sub: "What needs your attention" },
    reports: { title: "Reports", sub: "Generate a summary to share or keep" },
    admin: { title: "School Administration", sub: "People, structure and system settings" },
    profile: { title: "Profile & Settings", sub: "Your account" }
  };

  /* ============ STATE ============ */
  const state = {
    role: null,
    view: "dashboard",
    selectedLearnerId: null,   // "focused" learner for scoped views
    selectedClassId: D.teacherClasses[0].id,
    calMonthOffset: 0,
    calFilter: "all",
    swTab: "outstanding",
    activeThread: D.messages[0].id,
    notifPrefs: { assignment: true, support: true, message: true, achievement: true, attendance: true },
    charts: {}
  };

  /* ============ SCOPE HELPERS ============ */
  function scopedLearners() {
    if (state.role === "learner") return [learnerById("L001")];
    if (state.role === "parent") return D.parentLinks["P001"].map(learnerById);
    if (state.role === "teacher") return byId(D.teacherClasses, state.selectedClassId).learnerIds.map(learnerById);
    return D.learners; // admin / principal
  }
  function focusLearner() {
    const scope = scopedLearners();
    if (!state.selectedLearnerId || !scope.find(l => l.id === state.selectedLearnerId)) {
      state.selectedLearnerId = scope[0].id;
    }
    return learnerById(state.selectedLearnerId);
  }

  /* ============ TOAST ============ */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ============ LOGIN ============ */
  function renderLogin() {
    const grid = document.getElementById("roleGrid");
    grid.innerHTML = ROLES.map(r => `
      <button class="role-card" data-role="${r.id}">
        <span class="role-icon">${ICONS[r.id === "admin" ? "admin" : r.id === "principal" ? "reports" : r.id]}</span>
        <strong>${r.label}</strong>
        <span>${r.desc}</span>
      </button>`).join("");
    grid.querySelectorAll(".role-card").forEach(btn => {
      btn.addEventListener("click", () => enterApp(btn.dataset.role));
    });
  }

  function enterApp(roleId) {
    state.role = roleId;
    state.view = "dashboard";
    state.selectedLearnerId = null;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    const role = ROLES.find(r => r.id === roleId);
    document.getElementById("avatarInitials").textContent = role.avatar;
    document.getElementById("profileName").textContent = role.name;
    document.getElementById("profileRole").textContent = role.label;
    renderNav();
    renderContextSwitch();
    navigate("dashboard");
  }

  /* ============ NAV ============ */
  function renderNav() {
    const list = document.getElementById("navList");
    const items = NAV.filter(n => n.roles.includes(state.role));
    list.innerHTML = items.map(n => `
      <button class="nav-item" data-view="${n.id}">${n.icon}<span>${n.label}</span></button>
    `).join("");
    list.querySelectorAll(".nav-item").forEach(btn => {
      btn.addEventListener("click", () => navigate(btn.dataset.view));
    });
  }

  function renderContextSwitch() {
    const box = document.getElementById("contextSwitch");
    if (state.role === "parent") {
      const kids = D.parentLinks["P001"].map(learnerById);
      box.innerHTML = `<select class="search-input" id="ctxSelect" style="background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.18)">
        ${kids.map(k => `<option value="${k.id}">${k.name} — ${k.grade}</option>`).join("")}
      </select>`;
      document.getElementById("ctxSelect").addEventListener("change", e => {
        state.selectedLearnerId = e.target.value; render();
      });
    } else if (state.role === "teacher") {
      box.innerHTML = `<select class="search-input" id="ctxSelect" style="background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.18)">
        ${D.teacherClasses.map(c => `<option value="${c.id}">${c.label}</option>`).join("")}
      </select>`;
      document.getElementById("ctxSelect").addEventListener("change", e => {
        state.selectedClassId = e.target.value; state.selectedLearnerId = null; render();
      });
    } else {
      box.innerHTML = "";
    }
  }

  function navigate(viewId) {
    state.view = viewId;
    document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === viewId));
    document.getElementById("sidebar").classList.remove("open");
    render();
  }

  /* ============ MASTER RENDER ============ */
  function render() {
    const meta = VIEW_META[state.view];
    document.getElementById("viewTitle").textContent = meta.title;
    document.getElementById("viewSubtitle").textContent = meta.sub;
    const c = document.getElementById("viewContainer");
    c.innerHTML = `<div class="view" id="viewInner"></div>`;
    const inner = document.getElementById("viewInner");

    const renderers = {
      dashboard: renderDashboard, calendar: renderCalendar, timetable: renderTimetable,
      schoolwork: renderSchoolwork, marks: renderMarks, attendance: renderAttendance,
      support: renderSupport, interventions: renderInterventions, resources: renderResources,
      messages: renderMessages, notifications: renderNotifications, reports: renderReports,
      admin: renderAdmin, profile: renderProfile
    };
    (renderers[state.view] || (() => {}))(inner);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============ SUBJECT TREND -> CHIP ============ */
  function trendChip(series) {
    if (!series || series.length < 3) return { cls: "stable", label: "Stable", icon: ICONS.trendFlat };
    const recent = series.slice(-3);
    const delta = recent[recent.length - 1] - recent[0];
    if (delta >= 8) return { cls: "improving", label: "Improving", icon: ICONS.trendUp };
    if (delta <= -8) return { cls: "attention", label: "Attention Required", icon: ICONS.trendDown };
    if (delta <= -4) return { cls: "support", label: "Support Recommended", icon: ICONS.trendDown };
    if (delta < -1) return { cls: "monitor", label: "Monitor", icon: ICONS.trendFlat };
    return { cls: "stable", label: "Stable", icon: ICONS.trendFlat };
  }

  /* ===========================================================
     DASHBOARD
  =========================================================== */
  function renderDashboard(el) {
    if (state.role === "learner" || state.role === "parent") return renderPersonDashboard(el, focusLearner());
    if (state.role === "teacher") return renderTeacherDashboard(el);
    if (state.role === "principal") return renderPrincipalDashboard(el);
    if (state.role === "admin") return renderAdminDashboard(el);
  }

  function renderPersonDashboard(el, learner) {
    const isParent = state.role === "parent";
    const overallTrend = trendChip(Object.values(learner.subjectMarks)[0]);
    const sw = D.schoolwork.filter(s => s.learnerId === learner.id);
    const outstanding = sw.filter(s => s.status === "outstanding" || s.status === "overdue").length;
    const upcoming = D.calendarEvents.filter(ev => ev.learnerIds && ev.learnerIds.includes(learner.id) && ev.date >= todayISO).slice(0, 3);
    const alerts = D.alerts.filter(a => a.learnerId === learner.id && a.status !== "Resolved");
    const worstSubject = Object.entries(learner.subjectMarks).sort((a, b) => trendChip(a[1]).cls.localeCompare(trendChip(b[1]).cls))
      .find(([, series]) => ["attention", "support"].includes(trendChip(series).cls));

    el.innerHTML = `
      ${isParent ? `<div class="section-head"><div><h2>${learner.name}</h2><p>${learner.grade}</p></div></div>` : ""}
      <div class="stat-row">
        <div class="stat-card hero">
          <div class="stat-label">Overall average</div>
          <div class="stat-value">${learner.overallAverage}%</div>
          <div class="stat-sub">${trendChip(Object.values(learner.subjectMarks)[0]).label} across recent assessments</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Attendance</div>
          <div class="stat-value">${learner.attendance}%</div>
          <div class="stat-sub">This term</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Outstanding work</div>
          <div class="stat-value">${outstanding}</div>
          <div class="stat-sub">${outstanding === 0 ? "All caught up" : "assignment" + (outstanding > 1 ? "s" : "") + " to submit"}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Progress</div>
          <div class="stat-value" style="font-size:1.3rem;margin-top:10px;">
            <span class="chip ${overallTrend.cls}"><span class="chip-dot"></span>${overallTrend.label}</span>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="section-head"><div><h2>Subject performance</h2><p>Last six assessments per subject</p></div></div>
          <div class="chart-box"><canvas id="chartSubjects"></canvas></div>
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Attention</h2><p>What's worth a look right now</p></div></div>
          ${alerts.length ? alerts.map(a => `
            <div class="alert-card sev-${a.severity === "monitor" ? "monitor" : "attention"}" style="margin-bottom:10px;">
              <div class="alert-top"><span class="who">${a.subject}</span><span class="chip ${a.severity === "monitor" ? "monitor" : "support"}"><span class="chip-dot"></span>${a.status}</span></div>
              <div class="alert-summary">${a.summary}</div>
            </div>`).join("")
            : `<div class="empty-state" style="padding:20px 10px;">${ICONS.check}<strong>Nothing needs attention</strong><p>No open support indicators right now.</p></div>`}
          ${worstSubject ? `<p class="alert-recommend">${worstSubject[0]} requires monitoring.</p>` : ""}
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px;">
        <div class="panel">
          <div class="section-head"><div><h2>Upcoming</h2><p>Next deadlines and assessments</p></div>
            <button class="btn btn-ghost btn-sm" onclick="FlakeApp.navigate('calendar')">View calendar</button></div>
          ${upcoming.length ? upcoming.map(ev => `
            <div class="list-row">
              <div class="row-icon">${ev.type === "assessment" ? ICONS.marks : ev.type === "homework" ? ICONS.schoolwork : ICONS.calendar}</div>
              <div class="row-body"><div class="row-title">${ev.title}</div><div class="row-meta">${ev.subject} · ${formatDate(ev.date)}</div></div>
            </div>`).join("") : `<div class="empty-state">${ICONS.calendar}<strong>Nothing scheduled</strong><p>No upcoming deadlines found.</p></div>`}
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Recognition</h2><p>Positive progress worth celebrating</p></div></div>
          ${learner.achievements.map(a => `
            <div class="achievement-card">
              <div class="row-icon">${ICONS.award}</div>
              <div><strong>${a.title}</strong><p>${a.detail}</p></div>
            </div>`).join("")}
        </div>
      </div>
    `;
    drawLineChart("chartSubjects", learner.terms, Object.entries(learner.subjectMarks).slice(0, 4).map(([name, series], i) => ({
      label: name, data: series, color: [ "#1C6E8C", "#3FB6C4", "#D06A2C", "#2F9E63" ][i]
    })));
  }

  function renderTeacherDashboard(el) {
    const cls = byId(D.teacherClasses, state.selectedClassId);
    const learners = cls.learnerIds.map(learnerById);
    const classAvg = Math.round(learners.reduce((s, l) => s + l.overallAverage, 0) / learners.length);
    const classAttendance = Math.round(learners.reduce((s, l) => s + l.attendance, 0) / learners.length);
    const needAttention = learners.filter(l => D.alerts.some(a => a.learnerId === l.id && a.status !== "Resolved"));
    const outstandingTotal = D.schoolwork.filter(s => cls.learnerIds.includes(s.learnerId) && s.status !== "completed").length;

    el.innerHTML = `
      <div class="stat-row">
        <div class="stat-card hero"><div class="stat-label">${cls.label}</div><div class="stat-value">${classAvg}%</div><div class="stat-sub">Class average</div></div>
        <div class="stat-card"><div class="stat-label">Attendance</div><div class="stat-value">${classAttendance}%</div><div class="stat-sub">Class average</div></div>
        <div class="stat-card"><div class="stat-label">Need attention</div><div class="stat-value">${needAttention.length}</div><div class="stat-sub">learner${needAttention.length !== 1 ? "s" : ""} with open indicators</div></div>
        <div class="stat-card"><div class="stat-label">Outstanding work</div><div class="stat-value">${outstandingTotal}</div><div class="stat-sub">items across the class</div></div>
      </div>

      <div class="panel" style="margin-bottom:16px;">
        <div class="section-head"><div><h2>Learners requiring attention</h2><p>System-generated, always reviewed by a teacher</p></div>
          <button class="btn btn-ghost btn-sm" onclick="FlakeApp.navigate('support')">Open alerts</button></div>
        ${needAttention.length ? needAttention.map(l => {
          const a = D.alerts.find(al => al.learnerId === l.id && al.status !== "Resolved");
          return `<div class="list-row" style="cursor:pointer" onclick="FlakeApp.focusAndGo('${l.id}','support')">
            <div class="row-icon">${ICONS.support}</div>
            <div class="row-body"><div class="row-title">${l.name}</div><div class="row-meta">${a.subject} · ${a.summary}</div></div>
            <span class="chip ${a.severity === "monitor" ? "monitor" : "support"}"><span class="chip-dot"></span>${a.status}</span>
          </div>`;
        }).join("") : `<div class="empty-state">${ICONS.check}<strong>All clear</strong><p>No open indicators for this class.</p></div>`}
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="section-head"><div><h2>Class performance</h2><p>Average by subject, most recent assessment</p></div></div>
          <div class="chart-box"><canvas id="chartClassBar"></canvas></div>
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Roster</h2><p>${cls.label}</p></div></div>
          <table class="table">
            <thead><tr><th>Learner</th><th>Average</th><th>Attendance</th><th>Trend</th></tr></thead>
            <tbody>${learners.map(l => {
              const t = trendChip(Object.values(l.subjectMarks)[0]);
              return `<tr style="cursor:pointer" onclick="FlakeApp.focusAndGo('${l.id}','marks')">
                <td>${l.name}</td><td>${l.overallAverage}%</td><td>${l.attendance}%</td>
                <td><span class="chip ${t.cls}"><span class="chip-dot"></span>${t.label}</span></td></tr>`;
            }).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
    const subjSet = D.subjects.filter(s => learners.some(l => l.subjectMarks[s]));
    drawBarChart("chartClassBar", subjSet, subjSet.map(s => Math.round(learners.reduce((sum, l) => sum + (l.subjectMarks[s] ? l.subjectMarks[s].slice(-1)[0] : 0), 0) / learners.length)));
  }

  function renderPrincipalDashboard(el) {
    const st = D.schoolStats;
    el.innerHTML = `
      <div class="stat-row">
        <div class="stat-card hero"><div class="stat-label">School average</div><div class="stat-value">${st.avgPerformance}%</div><div class="stat-sub">${st.totalLearners} learners across ${st.totalClasses} classes</div></div>
        <div class="stat-card"><div class="stat-label">Attendance</div><div class="stat-value">${st.avgAttendance}%</div><div class="stat-sub">School-wide average</div></div>
        <div class="stat-card"><div class="stat-label">Open support indicators</div><div class="stat-value">${st.supportIndicators.new + st.supportIndicators.reviewed + st.supportIndicators.monitoring}</div><div class="stat-sub">across all grades</div></div>
        <div class="stat-card"><div class="stat-label">Active interventions</div><div class="stat-value">${st.supportIndicators.intervention}</div><div class="stat-sub">${st.interventionOutcomes.improved} showing improvement</div></div>
      </div>
      <div class="grid-2">
        <div class="panel">
          <div class="section-head"><div><h2>Performance by grade</h2><p>Current term average</p></div></div>
          <div class="chart-box"><canvas id="chartGrades"></canvas></div>
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Support pipeline</h2><p>Where learners sit in the alert lifecycle</p></div></div>
          <div class="chart-box"><canvas id="chartPipeline"></canvas></div>
        </div>
      </div>
      <div class="grid-2" style="margin-top:16px;">
        <div class="panel">
          <div class="section-head"><div><h2>Intervention outcomes</h2><p>Did the support work?</p></div></div>
          <div class="chart-box sm"><canvas id="chartOutcomes"></canvas></div>
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Teacher activity</h2><p>Objective workload indicators — not a ranking</p></div></div>
          <table class="table">
            <thead><tr><th>Teacher</th><th>Marks entered</th><th>Alerts reviewed</th><th>Interventions led</th></tr></thead>
            <tbody>${st.teacherActivity.map(t => `<tr><td>${t.name}<br><small style="color:var(--muted)">${t.subject}</small></td><td>${t.marksEntered}</td><td>${t.alertsReviewed}</td><td>${t.interventions}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
    drawBarChart("chartGrades", Object.keys(st.performanceByGrade), Object.values(st.performanceByGrade));
    drawBarChart("chartPipeline", ["New", "Reviewed", "Monitoring", "Intervention", "Resolved"],
      [st.supportIndicators.new, st.supportIndicators.reviewed, st.supportIndicators.monitoring, st.supportIndicators.intervention, st.supportIndicators.resolved],
      ["#C6403F", "#C98A1E", "#3B7FC4", "#D06A2C", "#2F9E63"]);
    drawDoughnut("chartOutcomes", ["Improved", "Stable", "Still needs support", "Escalated"],
      [st.interventionOutcomes.improved, st.interventionOutcomes.stable, st.interventionOutcomes.stillSupport, st.interventionOutcomes.escalated],
      ["#2F9E63", "#3B7FC4", "#C98A1E", "#C6403F"]);
  }

  function renderAdminDashboard(el) {
    const st = D.schoolStats;
    el.innerHTML = `
      <div class="stat-row">
        <div class="stat-card hero"><div class="stat-label">Total learners</div><div class="stat-value">${st.totalLearners}</div><div class="stat-sub">Active enrolments</div></div>
        <div class="stat-card"><div class="stat-label">Teachers</div><div class="stat-value">${st.totalTeachers}</div><div class="stat-sub">Across all departments</div></div>
        <div class="stat-card"><div class="stat-label">Classes</div><div class="stat-value">${st.totalClasses}</div><div class="stat-sub">Grade 8 – 12</div></div>
        <div class="stat-card"><div class="stat-label">Attendance</div><div class="stat-value">${st.avgAttendance}%</div><div class="stat-sub">School-wide average</div></div>
      </div>
      <div class="panel">
        <div class="section-head"><div><h2>Quick access</h2><p>Jump into school administration</p></div></div>
        <div class="grid-3">
          ${["Learners","Parents & guardians","Teachers","Subjects & classes","Timetables","System settings"].map(t => `
            <div class="list-row" style="cursor:pointer" onclick="FlakeApp.navigate('admin')">
              <div class="row-icon">${ICONS.admin}</div>
              <div class="row-body"><div class="row-title">Manage ${t.toLowerCase()}</div><div class="row-meta">Configure and import data</div></div>
            </div>`).join("")}
        </div>
      </div>
    `;
  }

  window.FlakeApp = window.FlakeApp || {};
  FlakeApp.navigate = navigate;
  FlakeApp.focusAndGo = (learnerId, view) => { state.selectedLearnerId = learnerId; navigate(view); };

  /* ===========================================================
     CALENDAR
  =========================================================== */
  function renderCalendar(el) {
    const scope = scopedLearners().map(l => l.id);
    const base = new Date(2026, 8, 1); // September 2026
    base.setMonth(base.getMonth() + state.calMonthOffset);
    const monthLabel = base.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
    const firstDay = new Date(base.getFullYear(), base.getMonth(), 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();

    const filters = ["all", "assessment", "homework", "event"];
    el.innerHTML = `
      <div class="calendar-toolbar">
        <button class="btn btn-ghost btn-sm" id="calPrev">‹ Prev</button>
        <h2 style="min-width:180px;text-align:center;">${monthLabel}</h2>
        <button class="btn btn-ghost btn-sm" id="calNext">Next ›</button>
        <div class="filters">
          ${filters.map(f => `<button class="filter-chip ${state.calFilter === f ? "active" : ""}" data-f="${f}">${f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}</button>`).join("")}
        </div>
      </div>
      <div class="cal-grid">
        ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => `<div class="cal-dow">${d}</div>`).join("")}
        ${Array.from({ length: startOffset }).map(() => `<div class="cal-cell muted"></div>`).join("")}
        ${Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const iso = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday = iso === todayISO;
          const events = D.calendarEvents.filter(ev => ev.date === iso && (state.calFilter === "all" || ev.type === state.calFilter)
            && (!ev.learnerIds || ev.learnerIds.some(id => scope.includes(id))));
          return `<div class="cal-cell ${isToday ? "today" : ""}">
            <span class="cal-date">${day}</span>
            ${events.map(ev => `<span class="cal-event ${ev.type}" title="${ev.title}">${ev.title}</span>`).join("")}
          </div>`;
        }).join("")}
      </div>
    `;
    document.getElementById("calPrev").onclick = () => { state.calMonthOffset--; renderCalendar(el); };
    document.getElementById("calNext").onclick = () => { state.calMonthOffset++; renderCalendar(el); };
    el.querySelectorAll(".filter-chip").forEach(b => b.onclick = () => { state.calFilter = b.dataset.f; renderCalendar(el); });
  }

  /* ===========================================================
     TIMETABLE
  =========================================================== */
  function renderTimetable(el) {
    el.innerHTML = `
      <div class="panel">
        <div class="section-head"><div><h2>${state.role === "teacher" ? byId(D.teacherClasses, state.selectedClassId).label : "This week"}</h2><p>Monday – Friday</p></div></div>
        <div class="timetable-wrap">
          <div class="timetable">
            ${D.timetable.map(day => `
              <div class="tt-day">
                <h3>${day.day}</h3>
                ${day.slots.map(s => `
                  <div class="tt-slot">
                    <div class="tt-time">${s.time}</div>
                    <div class="tt-subject">${s.subject}</div>
                    <div class="tt-meta">${s.teacher} · ${s.room}</div>
                  </div>`).join("")}
              </div>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  /* ===========================================================
     SCHOOLWORK
  =========================================================== */
  function renderSchoolwork(el) {
    const learner = focusLearner();
    const isTeacher = state.role === "teacher";
    const scope = scopedLearners();
    const items = isTeacher ? D.schoolwork.filter(s => scope.some(l => l.id === s.learnerId)) : D.schoolwork.filter(s => s.learnerId === learner.id);
    const tabs = ["outstanding", "overdue", "completed", "all"];
    const filtered = state.swTab === "all" ? items : items.filter(i => i.status === state.swTab);

    el.innerHTML = `
      ${scope.length > 1 && !isTeacher ? learnerPicker(scope) : ""}
      <div class="section-head">
        <div></div>
        ${isTeacher ? `<button class="btn btn-primary btn-sm" id="newSwBtn">${ICONS.plus} New task</button>` : ""}
      </div>
      <div class="tabs">${tabs.map(t => `<button class="tab-btn ${state.swTab === t ? "active" : ""}" data-t="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join("")}</div>
      <div id="swList">
        ${filtered.length ? filtered.map(i => `
          <div class="list-row">
            <div class="row-icon">${ICONS.schoolwork}</div>
            <div class="row-body">
              <div class="row-title">${i.title}${isTeacher ? ` <span style="font-weight:400;color:var(--muted)">— ${learnerById(i.learnerId).name}</span>` : ""}</div>
              <div class="row-meta">${i.subject} · ${i.type} · Due ${formatDate(i.due)}</div>
            </div>
            <span class="chip ${i.status === "completed" ? "improving" : i.status === "overdue" ? "attention" : "monitor"}"><span class="chip-dot"></span>${i.status.charAt(0).toUpperCase() + i.status.slice(1)}</span>
          </div>`).join("") : `<div class="empty-state">${ICONS.check}<strong>Nothing here</strong><p>No items match this view.</p></div>`}
      </div>
    `;
    if (scope.length > 1 && !isTeacher) bindLearnerPicker(el, () => renderSchoolwork(el));
    el.querySelectorAll(".tab-btn").forEach(b => b.onclick = () => { state.swTab = b.dataset.t; renderSchoolwork(el); });
    if (isTeacher) document.getElementById("newSwBtn").onclick = () => openTaskModal();
  }

  function openTaskModal() {
    openModal(`
      <h3>Create schoolwork</h3>
      <p class="hint">Visible to learners and parents in this class once saved.</p>
      <div class="form-group"><label>Title</label><input id="mTitle" placeholder="e.g. Chapter 4 revision worksheet"></div>
      <div class="form-group"><label>Type</label><select id="mType"><option>Homework</option><option>Assignment</option><option>Project</option><option>Classwork</option></select></div>
      <div class="form-group"><label>Due date</label><input id="mDue" type="date" value="2026-09-10"></div>
      <div class="form-group"><label>Instructions</label><textarea id="mDesc" rows="3" placeholder="Optional instructions for learners"></textarea></div>
    `, () => {
      toast("Schoolwork created and published to the class.");
    }, "Create task");
  }

  /* ===========================================================
     MARKS & PROGRESS
  =========================================================== */
  function renderMarks(el) {
    const learner = focusLearner();
    const scope = scopedLearners();
    const subjects = Object.keys(learner.subjectMarks);
    el.innerHTML = `
      ${scope.length > 1 ? learnerPicker(scope) : ""}
      <div class="stat-row">
        <div class="stat-card hero"><div class="stat-label">${learner.name}</div><div class="stat-value">${learner.overallAverage}%</div><div class="stat-sub">Overall average</div></div>
        ${subjects.slice(0, 3).map(s => {
          const t = trendChip(learner.subjectMarks[s]);
          return `<div class="stat-card"><div class="stat-label">${s}</div><div class="stat-value">${learner.subjectMarks[s].slice(-1)[0]}%</div>
            <div class="stat-sub"><span class="chip ${t.cls}"><span class="chip-dot"></span>${t.label}</span></div></div>`;
        }).join("")}
      </div>
      <div class="panel" style="margin-bottom:16px;">
        <div class="section-head"><div><h2>Performance over time</h2><p>Assessment-by-assessment, per subject — a single mark never triggers an alert on its own</p></div></div>
        <div class="chart-box"><canvas id="chartMarksTrend"></canvas></div>
      </div>
      <div class="panel">
        <div class="section-head"><div><h2>Assessment record</h2><p>${learner.terms.length} recorded assessments</p></div></div>
        <table class="table">
          <thead><tr><th>Subject</th>${learner.terms.map(t => `<th>${t}</th>`).join("")}<th>Trend</th></tr></thead>
          <tbody>${subjects.map(s => {
            const t = trendChip(learner.subjectMarks[s]);
            return `<tr><td>${s}</td>${learner.subjectMarks[s].map(m => `<td>${m}%</td>`).join("")}<td><span class="chip ${t.cls}"><span class="chip-dot"></span>${t.label}</span></td></tr>`;
          }).join("")}</tbody>
        </table>
      </div>
    `;
    if (scope.length > 1) bindLearnerPicker(el, () => renderMarks(el));
    drawLineChart("chartMarksTrend", learner.terms, subjects.map((s, i) => ({
      label: s, data: learner.subjectMarks[s], color: palette(i)
    })));
  }

  /* ===========================================================
     ATTENDANCE
  =========================================================== */
  function renderAttendance(el) {
    const learner = focusLearner();
    const scope = scopedLearners();
    const log = D.attendanceLog[learner.id];
    el.innerHTML = `
      ${scope.length > 1 ? learnerPicker(scope) : ""}
      <div class="stat-row">
        <div class="stat-card hero"><div class="stat-label">Attendance</div><div class="stat-value">${learner.attendance}%</div><div class="stat-sub">This term</div></div>
        <div class="stat-card"><div class="stat-label">Present days</div><div class="stat-value">${log.present}</div></div>
        <div class="stat-card"><div class="stat-label">Absences</div><div class="stat-value">${log.absent}</div><div class="stat-sub">${log.excused} excused</div></div>
        <div class="stat-card"><div class="stat-label">Late arrivals</div><div class="stat-value">${log.late}</div></div>
      </div>
      <div class="panel">
        <div class="section-head"><div><h2>Attendance trend</h2><p>Weekly attendance rate — patterns are flagged for human review, not assumed to explain marks</p></div></div>
        <div class="chart-box"><canvas id="chartAttendance"></canvas></div>
      </div>
    `;
    if (scope.length > 1) bindLearnerPicker(el, () => renderAttendance(el));
    drawLineChart("chartAttendance", ["Wk1","Wk2","Wk3","Wk4","Wk5","Wk6"], [{ label: "Attendance %", data: log.weekly, color: "#1C6E8C" }], true);
  }

  /* ===========================================================
     SUPPORT / ALERTS
  =========================================================== */
  const LIFECYCLE = ["New", "Reviewed", "Action Planned", "Intervention", "Monitoring", "Resolved"];

  function renderSupport(el) {
    if (state.role === "principal") return renderSupportOverview(el);
    const scope = scopedLearners();
    const learnerAlerts = D.alerts.filter(a => scope.some(l => l.id === a.learnerId));
    const canManage = state.role === "teacher";

    el.innerHTML = `
      <div class="section-head"><div><h2>${learnerAlerts.filter(a=>a.status!=='Resolved').length} open indicator${learnerAlerts.filter(a=>a.status!=='Resolved').length!==1?'s':''}</h2>
      <p>Every alert explains why it was generated — never a prediction of failure</p></div></div>
      <div id="alertList">
        ${learnerAlerts.length ? learnerAlerts.map(a => renderAlertCard(a, canManage)).join("") : `<div class="empty-state">${ICONS.check}<strong>Nothing needs attention</strong><p>No support indicators on record.</p></div>`}
      </div>
    `;
    if (canManage) bindAlertActions(el);
  }

  function renderAlertCard(a, canManage) {
    const learner = learnerById(a.learnerId);
    const sevClass = a.status === "Resolved" ? "resolved" : a.severity === "monitor" ? "monitor" : "attention";
    return `
      <div class="alert-card sev-${sevClass}" data-alert="${a.id}">
        <div class="alert-top">
          <span class="who">${learner.name} · ${a.subject}</span>
          <span class="chip ${a.severity === "monitor" ? "monitor" : "support"}"><span class="chip-dot"></span>${a.status}</span>
        </div>
        <div class="alert-summary">${a.summary}</div>
        <details class="alert-why"><summary>Why am I seeing this?</summary>
          <ul>${a.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        </details>
        <p class="alert-recommend">${a.recommendation}</p>
        ${canManage ? `
          <div class="alert-actions">
            ${a.status !== "Resolved" ? `<button class="btn btn-ghost btn-sm advance-btn" data-id="${a.id}">Advance status →</button>` : ""}
            <button class="btn btn-ghost btn-sm intervene-btn" data-id="${a.id}">Create intervention</button>
            ${a.status !== "Resolved" ? `<button class="btn btn-ghost btn-sm dismiss-btn" data-id="${a.id}">Dismiss</button>` : ""}
          </div>` : ""}
      </div>`;
  }

  function bindAlertActions(el) {
    el.querySelectorAll(".advance-btn").forEach(b => b.onclick = () => {
      const a = byId(D.alerts, b.dataset.id);
      const idx = LIFECYCLE.indexOf(a.status);
      if (idx < LIFECYCLE.length - 1) { a.status = LIFECYCLE[idx + 1]; a.history.push({ status: a.status, date: todayISO, note: "Updated by teacher." }); }
      toast(`Alert moved to "${a.status}"`);
      renderSupport(document.getElementById("viewInner"));
    });
    el.querySelectorAll(".dismiss-btn").forEach(b => b.onclick = () => {
      const a = byId(D.alerts, b.dataset.id);
      a.status = "Resolved"; a.history.push({ status: "Resolved", date: todayISO, note: "Dismissed — determined not to require action." });
      toast("Alert dismissed.");
      renderSupport(document.getElementById("viewInner"));
    });
    el.querySelectorAll(".intervene-btn").forEach(b => b.onclick = () => {
      const a = byId(D.alerts, b.dataset.id);
      openInterventionModal(a);
    });
  }

  function renderSupportOverview(el) {
    const st = D.schoolStats.supportIndicators;
    el.innerHTML = `
      <div class="stat-row">
        <div class="stat-card"><div class="stat-label">New</div><div class="stat-value">${st.new}</div></div>
        <div class="stat-card"><div class="stat-label">Reviewed</div><div class="stat-value">${st.reviewed}</div></div>
        <div class="stat-card"><div class="stat-label">Monitoring</div><div class="stat-value">${st.monitoring}</div></div>
        <div class="stat-card"><div class="stat-label">Intervention</div><div class="stat-value">${st.intervention}</div></div>
        <div class="stat-card"><div class="stat-label">Resolved</div><div class="stat-value">${st.resolved}</div></div>
      </div>
      <div class="panel">
        <div class="section-head"><div><h2>All open indicators</h2><p>School-wide, read-only — action is taken by class teachers</p></div></div>
        ${D.alerts.map(a => renderAlertCard(a, false)).join("")}
      </div>
    `;
  }

  /* ===========================================================
     INTERVENTIONS
  =========================================================== */
  function renderInterventions(el) {
    const isPrincipal = state.role === "principal";
    const scope = isPrincipal ? D.learners : scopedLearners();
    const list = D.interventions.filter(iv => scope.some(l => l.id === iv.learnerId));

    el.innerHTML = `
      <div class="section-head"><div><h2>${list.length} intervention${list.length !== 1 ? "s" : ""} on record</h2><p>Measuring whether support actually helped</p></div>
        ${!isPrincipal ? `<button class="btn btn-primary btn-sm" id="newIvBtn">${ICONS.plus} New intervention</button>` : ""}
      </div>
      ${list.length ? list.map(iv => {
        const learner = learnerById(iv.learnerId);
        const before = iv.before.slice(-1)[0];
        const after = iv.after.length ? iv.after.slice(-1)[0] : null;
        const improved = after !== null && after > before;
        return `
        <div class="intervention-card">
          <div class="intervention-head">
            <div><strong style="font-family:'Outfit',sans-serif;font-size:1rem;">${learner.name}</strong><div style="color:var(--muted);font-size:.82rem;">${iv.area}</div></div>
            <span class="chip ${iv.status === "In progress" ? "monitor" : "improving"}"><span class="chip-dot"></span>${iv.status}</span>
          </div>
          <div class="intervention-meta">
            <div><strong>Type</strong><span>${iv.type}</span></div>
            <div><strong>Responsible</strong><span>${iv.responsible}</span></div>
            <div><strong>Started</strong><span>${formatDate(iv.start)}</span></div>
            <div><strong>Follow-up</strong><span>${formatDate(iv.followUp)}</span></div>
          </div>
          <p style="font-size:.84rem;color:var(--ink-soft);line-height:1.5;">${iv.notes}</p>
          <div class="chart-box sm" style="margin-top:10px;"><canvas id="ivChart-${iv.id}"></canvas></div>
          ${after !== null ? `<p class="alert-recommend" style="color:${improved ? "#1F6E45" : "var(--muted)"}">${improved ? "📈 Positive improvement following intervention" : "Outcome still developing"}</p>` : `<p class="alert-recommend" style="color:var(--muted)">Awaiting next assessment to measure effect</p>`}
        </div>`;
      }).join("") : `<div class="empty-state">${ICONS.check}<strong>No interventions yet</strong><p>Create one from an alert in Alerts & Support.</p></div>`}
    `;
    list.forEach(iv => {
      const labels = iv.before.map((_, i) => `Before ${i + 1}`).concat(iv.after.map((_, i) => `After ${i + 1}`));
      drawLineChart(`ivChart-${iv.id}`, labels, [{ label: "Mark", data: [...iv.before, ...iv.after], color: "#1C6E8C" }], true, iv.before.length - 1);
    });
    if (!isPrincipal) {
      const btn = document.getElementById("newIvBtn");
      if (btn) btn.onclick = () => openInterventionModal(null);
    }
  }

  function openInterventionModal(fromAlert) {
    const scope = scopedLearners();
    openModal(`
      <h3>Create intervention</h3>
      <p class="hint">${fromAlert ? `Linked to the "${fromAlert.subject}" alert for ${learnerById(fromAlert.learnerId).name}.` : "Log the support being put in place."}</p>
      <div class="form-group"><label>Learner</label><select id="ivLearner">${scope.map(l => `<option value="${l.id}" ${fromAlert && l.id === fromAlert.learnerId ? "selected" : ""}>${l.name}</option>`).join("")}</select></div>
      <div class="form-group"><label>Area of concern</label><input id="ivArea" value="${fromAlert ? fromAlert.subject + " — " + fromAlert.summary.split(".")[0] : ""}"></div>
      <div class="form-group"><label>Intervention type</label><input id="ivType" placeholder="e.g. Additional revision + learning resources"></div>
      <div class="form-group"><label>Follow-up date</label><input id="ivFollow" type="date" value="2026-09-24"></div>
      <div class="form-group"><label>Notes</label><textarea id="ivNotes" rows="3" placeholder="What support is being provided"></textarea></div>
    `, () => {
      toast("Intervention created and linked to the learner's record.");
    }, "Create intervention");
  }

  /* ===========================================================
     RESOURCES
  =========================================================== */
  function renderResources(el) {
    el.innerHTML = `
      <div class="resource-toolbar">
        <input class="search-input" id="resSearch" placeholder="Search resources…">
        <select class="search-input" id="resSubject"><option value="">All subjects</option>${D.subjects.map(s => `<option>${s}</option>`).join("")}</select>
        <select class="search-input" id="resType"><option value="">All types</option>${[...new Set(D.resources.map(r => r.type))].map(t => `<option>${t}</option>`).join("")}</select>
      </div>
      <div class="resource-grid" id="resGrid"></div>
    `;
    const draw = () => {
      const q = document.getElementById("resSearch").value.toLowerCase();
      const subj = document.getElementById("resSubject").value;
      const type = document.getElementById("resType").value;
      const filtered = D.resources.filter(r =>
        (!q || r.title.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q)) &&
        (!subj || r.subject === subj) && (!type || r.type === type));
      document.getElementById("resGrid").innerHTML = filtered.length ? filtered.map(r => `
        <div class="resource-card">
          <span class="rtype">${r.type}</span>
          <h4>${r.title}</h4>
          <div class="rmeta">${r.subject} · ${r.topic}<br>${r.grade} · ${r.difficulty}</div>
        </div>`).join("") : `<div class="empty-state" style="grid-column:1/-1;">${ICONS.search}<strong>No resources found</strong><p>Try a different search or filter.</p></div>`;
    };
    ["resSearch", "resSubject", "resType"].forEach(id => document.getElementById(id).addEventListener("input", draw));
    draw();
  }

  /* ===========================================================
     MESSAGES
  =========================================================== */
  function renderMessages(el) {
    const thread = byId(D.messages, state.activeThread);
    el.innerHTML = `
      <div class="messages-layout">
        <div class="thread-list">
          ${D.messages.map(t => `
            <div class="thread-item ${t.id === state.activeThread ? "active" : ""}" data-t="${t.id}">
              ${t.unread ? '<span class="unread-dot"></span>' : '<span style="width:8px"></span>'}
              <div style="min-width:0;"><div class="thread-title">${t.thread}</div><div class="thread-preview">${t.messages.slice(-1)[0].text}</div></div>
            </div>`).join("")}
        </div>
        <div class="conversation">
          <div class="conversation-head">${thread.thread}</div>
          <div class="conversation-body" id="convoBody">
            ${thread.messages.map(m => `<div class="bubble ${m.from === "me" ? "me" : "them"}">${m.text}<div class="bubble-time">${m.time}</div></div>`).join("")}
          </div>
          <div class="conversation-input">
            <input id="msgInput" placeholder="Write a message…">
            <button class="icon-btn" id="msgSend">${ICONS.send}</button>
          </div>
        </div>
      </div>
    `;
    el.querySelectorAll(".thread-item").forEach(t => t.onclick = () => {
      state.activeThread = t.dataset.t;
      byId(D.messages, t.dataset.t).unread = false;
      renderMessages(el);
    });
    const send = () => {
      const input = document.getElementById("msgInput");
      if (!input.value.trim()) return;
      thread.messages.push({ from: "me", text: input.value.trim(), time: "Now" });
      input.value = "";
      renderMessages(el);
      const body = document.getElementById("convoBody");
      if (body) body.scrollTop = body.scrollHeight;
    };
    document.getElementById("msgSend").onclick = send;
    document.getElementById("msgInput").addEventListener("keydown", e => { if (e.key === "Enter") send(); });
  }

  /* ===========================================================
     NOTIFICATIONS
  =========================================================== */
  const NOTIF_ICON = { support: ICONS.support, assignment: ICONS.schoolwork, achievement: ICONS.award, message: ICONS.messages, attendance: ICONS.attendance };

  function renderNotifications(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="panel">
          <div class="section-head"><div><h2>Recent</h2></div>
            <button class="btn btn-ghost btn-sm" id="markAllRead">Mark all as read</button></div>
          ${D.notifications.map(n => `
            <div class="notif-row ${n.read ? "" : "unread"}" data-id="${n.id}">
              <div class="row-icon">${NOTIF_ICON[n.type] || ICONS.notifications}</div>
              <div class="row-body"><div class="row-title">${n.title}</div><div class="row-meta">${n.detail}</div></div>
              <span style="font-size:.72rem;color:var(--muted);white-space:nowrap;">${n.time}</span>
            </div>`).join("")}
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Preferences</h2><p>Choose what you're notified about</p></div></div>
          ${Object.entries({ assignment: "Schoolwork & deadlines", support: "Support indicators", message: "Messages", achievement: "Achievements", attendance: "Attendance" }).map(([k, label]) => `
            <div class="pref-row"><span>${label}</span>
              <label class="switch"><input type="checkbox" data-pref="${k}" ${state.notifPrefs[k] ? "checked" : ""}><span class="track"></span></label>
            </div>`).join("")}
        </div>
      </div>
    `;
    el.querySelectorAll(".notif-row").forEach(r => r.onclick = () => {
      byId(D.notifications, r.dataset.id).read = true;
      r.classList.remove("unread");
      updateNotifBadge();
    });
    document.getElementById("markAllRead").onclick = () => {
      D.notifications.forEach(n => n.read = true);
      renderNotifications(el); updateNotifBadge();
    };
    el.querySelectorAll("[data-pref]").forEach(cb => cb.onchange = () => {
      state.notifPrefs[cb.dataset.pref] = cb.checked;
      toast(`Preference updated`);
    });
  }

  function updateNotifBadge() {
    const n = D.notifications.filter(x => !x.read).length;
    const badge = document.getElementById("notifBadge");
    badge.textContent = n;
    badge.style.display = n ? "flex" : "none";
  }

  /* ===========================================================
     REPORTS
  =========================================================== */
  const REPORT_SETS = {
    parent: ["Academic progress report", "Attendance summary", "Schoolwork completion", "Support & intervention update"],
    teacher: ["Class performance report", "Subject performance report", "Learners requiring attention", "Schoolwork completion", "Intervention log"],
    admin: ["School enrolment summary", "Staff activity report", "Attendance summary", "Learning resource usage"],
    principal: ["School performance report", "Grade & subject performance", "Attendance trends", "Support indicator summary", "Intervention outcomes"]
  };

  function renderReports(el) {
    const set = REPORT_SETS[state.role] || [];
    el.innerHTML = `
      <div class="section-head"><div><h2>Available reports</h2><p>Preview instantly; export coming to a future release</p></div></div>
      <div class="grid-3">
        ${set.map(r => `
          <div class="report-card">
            <div class="row-icon">${ICONS.reports}</div>
            <h4 style="font-size:.92rem;margin-bottom:6px;">${r}</h4>
            <p style="font-size:.8rem;color:var(--muted);margin-bottom:14px;">Generated from current data, current term.</p>
            <button class="btn btn-ghost btn-sm btn-block gen-btn" data-name="${r}">Generate preview</button>
          </div>`).join("")}
      </div>
    `;
    el.querySelectorAll(".gen-btn").forEach(b => b.onclick = () => toast(`"${b.dataset.name}" generated — ready to view.`));
  }

  /* ===========================================================
     ADMIN
  =========================================================== */
  function renderAdmin(el) {
    const panels = [
      { title: "Learners", count: D.schoolStats.totalLearners, desc: "Manage learner profiles and grade placement" },
      { title: "Parents & guardians", count: 587, desc: "Manage accounts and learner links" },
      { title: "Teachers", count: D.schoolStats.totalTeachers, desc: "Manage staff accounts and subject assignments" },
      { title: "Subjects & classes", count: D.schoolStats.totalClasses, desc: "Configure subjects, grades and class lists" },
      { title: "Academic years & terms", count: 4, desc: "Manage the current academic calendar" },
      { title: "Timetables", count: D.schoolStats.totalClasses, desc: "Build and publish class timetables" },
      { title: "Early-warning thresholds", count: null, desc: "Configure the rules behind support indicators" },
      { title: "Data import", count: null, desc: "Bulk-import learner and academic records" }
    ];
    el.innerHTML = `
      <div class="grid-3">
        ${panels.map(p => `
          <div class="panel" style="cursor:pointer;transition:box-shadow .18s var(--ease)" onmouseover="this.style.boxShadow='var(--shadow-hover)'" onmouseout="this.style.boxShadow='none'" onclick="FlakeApp.adminClick('${p.title}')">
            <div class="stat-label">${p.title}</div>
            ${p.count !== null ? `<div class="stat-value" style="font-size:1.5rem;margin-top:6px;">${p.count}</div>` : `<div style="height:8px"></div>`}
            <p style="font-size:.8rem;color:var(--muted);margin-top:6px;">${p.desc}</p>
          </div>`).join("")}
      </div>
    `;
  }
  FlakeApp.adminClick = (title) => toast(`Opening "${title}" management — full CRUD in the production build.`);

  /* ===========================================================
     PROFILE
  =========================================================== */
  function renderProfile(el) {
    const role = ROLES.find(r => r.id === state.role);
    el.innerHTML = `
      <div class="grid-2">
        <div class="panel">
          <div class="profile-header">
            <span class="avatar">${role.avatar}</span>
            <div><h2>${role.name}</h2><p style="color:var(--muted);font-size:.85rem;">${role.label}</p></div>
          </div>
          <div class="field-row"><label>Role</label><span>${role.label}</span></div>
          <div class="field-row"><label>School</label><span>Belgium Campus High School</span></div>
          <div class="field-row"><label>Email</label><span>${role.id}@theflake.school</span></div>
          <div class="field-row"><label>Password</label><span>••••••••••</span></div>
          <div class="field-row"><label>Two-factor auth</label><span><label class="switch"><input type="checkbox" checked><span class="track"></span></label></span></div>
        </div>
        <div class="panel">
          <div class="section-head"><div><h2>Privacy & access</h2></div></div>
          <p style="font-size:.85rem;color:var(--muted);line-height:1.6;">
            Access to learner information is role-based and school-isolated. Parents only see linked children;
            teachers only see assigned classes and subjects; learners only see their own record. All access is
            logged. Built with South African privacy requirements (POPIA) in mind — legal compliance should be
            professionally reviewed before production use.
          </p>
          <div style="margin-top:16px;">
            <button class="btn btn-ghost btn-block" onclick="FlakeApp.logout()">Sign out</button>
          </div>
        </div>
      </div>
    `;
  }
  FlakeApp.logout = () => {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
  };

  /* ===========================================================
     SHARED UI HELPERS
  =========================================================== */
  function learnerPicker(scope) {
    return `<div class="tabs" id="learnerPicker">${scope.map(l => `<button class="tab-btn ${state.selectedLearnerId === l.id || (!state.selectedLearnerId && l === scope[0]) ? "active" : ""}" data-l="${l.id}">${l.name.split(" ")[0]}</button>`).join("")}</div>`;
  }
  function bindLearnerPicker(el, cb) {
    const box = el.querySelector("#learnerPicker");
    if (!box) return;
    box.querySelectorAll("button").forEach(b => b.onclick = () => { state.selectedLearnerId = b.dataset.l; cb(); });
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
  }

  function palette(i) { return ["#1C6E8C", "#3FB6C4", "#D06A2C", "#2F9E63", "#C98A1E", "#8956C4"][i % 6]; }

  /* ============ MODAL ============ */
  function openModal(bodyHtml, onSave, saveLabel) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `<div class="modal">${bodyHtml}
      <div class="modal-actions">
        <button class="btn btn-ghost" id="modalCancel">Cancel</button>
        <button class="btn btn-primary" id="modalSave">${saveLabel}</button>
      </div></div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#modalCancel").onclick = () => overlay.remove();
    overlay.querySelector("#modalSave").onclick = () => { onSave(); overlay.remove(); };
  }

  /* ===========================================================
     CHART HELPERS (Chart.js)
  =========================================================== */
  function destroyChart(id) { if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; } }

  function drawLineChart(canvasId, labels, series, showArea = false, markerIndex = null) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    destroyChart(canvasId);
    state.charts[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: series.map(s => ({
          label: s.label, data: s.data, borderColor: s.color, backgroundColor: s.color + "22",
          fill: showArea, tension: .35, pointRadius: 3, pointBackgroundColor: s.color, borderWidth: 2.4
        }))
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: { legend: { display: series.length > 1, position: "bottom", labels: { boxWidth: 8, usePointStyle: true, font: { family: "Inter", size: 11 } } },
          tooltip: { backgroundColor: "#0F2438", padding: 10, cornerRadius: 8, titleFont: { family: "Outfit" }, bodyFont: { family: "Inter" } } },
        scales: {
          y: { grid: { color: "#EAF0F3" }, ticks: { font: { family: "Inter", size: 10 }, color: "#5C7488" } },
          x: { grid: { display: false }, ticks: { font: { family: "Inter", size: 10 }, color: "#5C7488" } }
        }
      }
    });
  }

  function drawBarChart(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    destroyChart(canvasId);
    state.charts[canvasId] = new Chart(ctx, {
      type: "bar",
      data: { labels, datasets: [{ data, backgroundColor: colors || "#1C6E8C", borderRadius: 6, maxBarThickness: 40 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: "#0F2438", padding: 10, cornerRadius: 8 } },
        scales: {
          y: { grid: { color: "#EAF0F3" }, ticks: { font: { family: "Inter", size: 10 }, color: "#5C7488" } },
          x: { grid: { display: false }, ticks: { font: { family: "Inter", size: 10 }, color: "#5C7488" } }
        }
      }
    });
  }

  function drawDoughnut(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    destroyChart(canvasId);
    state.charts[canvasId] = new Chart(ctx, {
      type: "doughnut",
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 3, borderColor: "#fff" }] },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "62%",
        plugins: { legend: { position: "bottom", labels: { boxWidth: 8, usePointStyle: true, font: { family: "Inter", size: 11 } } } }
      }
    });
  }

  /* ============ GLOBAL UI WIRES ============ */
  document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
  document.getElementById("switchRoleBtn").addEventListener("click", () => {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
  });
  document.getElementById("notifBtn").addEventListener("click", () => navigate("notifications"));
  document.getElementById("profileChip").addEventListener("click", () => navigate("profile"));

  renderLogin();
  updateNotifBadge();
})();
