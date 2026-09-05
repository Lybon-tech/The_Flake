/* ===========================================================
   THE FLAKE — MOCK DATA LAYER
   Self-contained demo dataset. In production this would be
   served by the school's SIS / API, scoped by role & school.
=========================================================== */

const FLAKE_DATA = (function () {

  const subjects = ["Mathematics", "English", "Life Sciences", "Physical Sciences", "Geography", "Accounting"];

  const learners = [
    {
      id: "L001", name: "Lindiwe Baloyi", grade: "Grade 10A", avatar: "LB",
      overallAverage: 72, attendance: 94, trend: "up",
      subjectMarks: {
        Mathematics: [68, 65, 63, 61, 58, 55],
        English:     [70, 71, 73, 74, 75, 76],
        "Life Sciences": [64, 66, 65, 68, 70, 72],
        "Physical Sciences": [59, 61, 60, 63, 64, 66],
        Geography: [77, 78, 76, 79, 80, 81],
        Accounting: [55, 58, 60, 62, 65, 67]
      },
      terms: ["Term 1 - A1", "Term 1 - A2", "Term 1 - A3", "Term 2 - A1", "Term 2 - A2", "Term 2 - A3"],
      outstandingWork: 2,
      achievements: [
        { title: "Personal Best", detail: "Highest Geography mark this term — 81%.", date: "2026-08-28" },
        { title: "Great Progress", detail: "English average improved by 6 percentage points.", date: "2026-08-20" }
      ]
    },
    {
      id: "L002", name: "Sipho Nkosi", grade: "Grade 10A", avatar: "SN",
      overallAverage: 64, attendance: 87, trend: "down",
      subjectMarks: {
        Mathematics: [49, 56, 62, 66, 69, 71],
        English:     [66, 65, 64, 63, 62, 61],
        "Life Sciences": [70, 69, 71, 70, 72, 73],
        "Physical Sciences": [58, 57, 59, 58, 60, 59],
        Geography: [61, 60, 62, 63, 61, 60],
        Accounting: [72, 71, 70, 69, 68, 67]
      },
      terms: ["Term 1 - A1", "Term 1 - A2", "Term 1 - A3", "Term 2 - A1", "Term 2 - A2", "Term 2 - A3"],
      outstandingWork: 4,
      achievements: [
        { title: "Personal Best", detail: "Highest Mathematics mark this year — 71%, following extra revision.", date: "2026-08-30" }
      ]
    },
    {
      id: "L003", name: "Amahle Dlamini", grade: "Grade 10B", avatar: "AD",
      overallAverage: 81, attendance: 98, trend: "stable",
      subjectMarks: {
        Mathematics: [80, 82, 79, 81, 83, 82],
        English:     [85, 84, 86, 85, 87, 86],
        "Life Sciences": [78, 79, 80, 79, 81, 80],
        "Physical Sciences": [76, 77, 75, 78, 77, 79],
        Geography: [83, 84, 82, 85, 84, 86],
        Accounting: [79, 80, 81, 80, 82, 81]
      },
      terms: ["Term 1 - A1", "Term 1 - A2", "Term 1 - A3", "Term 2 - A1", "Term 2 - A2", "Term 2 - A3"],
      outstandingWork: 0,
      achievements: [
        { title: "Consistent Effort", detail: "All schoolwork submitted on time for six consecutive weeks.", date: "2026-08-25" }
      ]
    }
  ];

  const parentLinks = { "P001": ["L001", "L002"] };

  const teacherClasses = [
    { id: "10A-MATH", label: "Grade 10A · Mathematics", learnerIds: ["L001", "L002"] },
    { id: "10B-MATH", label: "Grade 10B · Mathematics", learnerIds: ["L003"] }
  ];

  const timetable = [
    { day: "Monday", slots: [
      { time: "07:45–08:30", subject: "Mathematics", teacher: "Mr. T. Jooste", room: "B12" },
      { time: "08:30–09:15", subject: "English", teacher: "Mrs. N. Mbense", room: "A04" },
      { time: "09:35–10:20", subject: "Life Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 2" },
      { time: "10:20–11:05", subject: "Geography", teacher: "Mr. D. Mokwele", room: "A09" }
    ]},
    { day: "Tuesday", slots: [
      { time: "07:45–08:30", subject: "Physical Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 1" },
      { time: "08:30–09:15", subject: "Accounting", teacher: "Mr. M. Kumar", room: "A11" },
      { time: "09:35–10:20", subject: "Mathematics", teacher: "Mr. T. Jooste", room: "B12" },
      { time: "10:20–11:05", subject: "English", teacher: "Mrs. N. Mbense", room: "A04" }
    ]},
    { day: "Wednesday", slots: [
      { time: "07:45–08:30", subject: "Geography", teacher: "Mr. D. Mokwele", room: "A09" },
      { time: "08:30–09:15", subject: "Mathematics", teacher: "Mr. T. Jooste", room: "B12" },
      { time: "09:35–10:20", subject: "Life Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 2" },
      { time: "10:20–11:05", subject: "Physical Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 1" }
    ]},
    { day: "Thursday", slots: [
      { time: "07:45–08:30", subject: "English", teacher: "Mrs. N. Mbense", room: "A04" },
      { time: "08:30–09:15", subject: "Accounting", teacher: "Mr. M. Kumar", room: "A11" },
      { time: "09:35–10:20", subject: "Geography", teacher: "Mr. D. Mokwele", room: "A09" },
      { time: "10:20–11:05", subject: "Mathematics", teacher: "Mr. T. Jooste", room: "B12" }
    ]},
    { day: "Friday", slots: [
      { time: "07:45–08:30", subject: "Life Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 2" },
      { time: "08:30–09:15", subject: "Physical Sciences", teacher: "Ms. R. Mlotshwa", room: "Lab 1" },
      { time: "09:35–10:20", subject: "English", teacher: "Mrs. N. Mbense", room: "A04" },
      { time: "10:20–11:05", subject: "Form period", teacher: "Mr. T. Jooste", room: "B12" }
    ]}
  ];

  const calendarEvents = [
    { date: "2026-09-04", type: "assessment", subject: "Mathematics", title: "Trigonometry Test", learnerIds: ["L001","L002"] },
    { date: "2026-09-05", type: "homework", subject: "English", title: "Essay draft due", learnerIds: ["L001","L002","L003"] },
    { date: "2026-09-08", type: "assessment", subject: "Life Sciences", title: "Practical assessment (SBA)", learnerIds: ["L001","L002","L003"] },
    { date: "2026-09-10", type: "event", subject: "School", title: "Grade 10 Parents' Evening" },
    { date: "2026-09-12", type: "assessment", subject: "Physical Sciences", title: "Term 3 Exam", learnerIds: ["L001","L002","L003"] },
    { date: "2026-09-15", type: "homework", subject: "Geography", title: "Map work exercise due", learnerIds: ["L001","L002"] },
    { date: "2026-09-18", type: "assessment", subject: "Accounting", title: "Project submission", learnerIds: ["L002","L003"] },
    { date: "2026-09-22", type: "event", subject: "School", title: "Heritage Day (school closed)" }
  ];

  const schoolwork = [
    { id: "SW1", learnerId: "L001", subject: "Mathematics", title: "Trigonometric identities worksheet", type: "Homework", due: "2026-09-04", status: "outstanding" },
    { id: "SW2", learnerId: "L001", subject: "English", title: "Descriptive essay — first draft", type: "Assignment", due: "2026-09-05", status: "outstanding" },
    { id: "SW3", learnerId: "L001", subject: "Geography", title: "Contour map exercise", type: "Homework", due: "2026-08-29", status: "completed" },
    { id: "SW4", learnerId: "L001", subject: "Life Sciences", title: "Cell structure quiz", type: "Classwork", due: "2026-08-27", status: "completed" },
    { id: "SW5", learnerId: "L002", subject: "Mathematics", title: "Trigonometric identities worksheet", type: "Homework", due: "2026-09-04", status: "outstanding" },
    { id: "SW6", learnerId: "L002", subject: "Accounting", title: "Ledger project", type: "Project", due: "2026-08-30", status: "overdue" },
    { id: "SW7", learnerId: "L002", subject: "English", title: "Descriptive essay — first draft", type: "Assignment", due: "2026-09-05", status: "outstanding" },
    { id: "SW8", learnerId: "L002", subject: "Geography", title: "Map work exercise", type: "Homework", due: "2026-08-22", status: "overdue" },
    { id: "SW9", learnerId: "L003", subject: "Mathematics", title: "Trigonometric identities worksheet", type: "Homework", due: "2026-09-04", status: "completed" },
    { id: "SW10", learnerId: "L003", subject: "Life Sciences", title: "Cell structure quiz", type: "Classwork", due: "2026-08-27", status: "completed" }
  ];

  const attendanceLog = {
    L001: { present: 91, absent: 3, late: 4, excused: 2, weekly: [96, 95, 93, 94, 92, 94] },
    L002: { present: 82, absent: 9, late: 6, excused: 3, weekly: [93, 91, 88, 86, 84, 87] },
    L003: { present: 96, absent: 1, late: 1, excused: 1, weekly: [98, 97, 98, 99, 97, 98] }
  };

  const alerts = [
    {
      id: "AL1", learnerId: "L002", status: "New", severity: "support",
      subject: "Mathematics",
      summary: "Mathematics performance has declined across recent assessments. Attendance has also dipped this month.",
      reasons: [
        "Mathematics average moved from 68% to 55% over the last three assessments",
        "2 pieces of schoolwork are outstanding, 1 overdue",
        "Attendance decreased from 96% to 87% over the past month"
      ],
      recommendation: "Teacher review recommended.",
      generated: "2026-09-01",
      history: [{ status: "New", date: "2026-09-01", note: "Auto-generated by early-warning rules." }]
    },
    {
      id: "AL2", learnerId: "L002", status: "Reviewed", severity: "monitor",
      subject: "Accounting",
      summary: "One project submission is overdue and the previous submission was also late.",
      reasons: ["Ledger project overdue since 30 Aug", "Previous Accounting assignment submitted 2 days late"],
      recommendation: "Check in with learner about workload.",
      generated: "2026-08-30",
      history: [
        { status: "New", date: "2026-08-30", note: "Auto-generated by early-warning rules." },
        { status: "Reviewed", date: "2026-08-31", note: "Reviewed by Mr. M. Kumar — will follow up in class." }
      ]
    },
    {
      id: "AL3", learnerId: "L001", status: "Monitoring", severity: "monitor",
      subject: "Mathematics",
      summary: "A gradual decline across the last four Mathematics assessments, though still within the class range.",
      reasons: ["Mathematics average moved from 68% to 55% across four assessments", "No missed schoolwork recorded"],
      recommendation: "Continue monitoring next two assessments before further action.",
      generated: "2026-08-22",
      history: [
        { status: "New", date: "2026-08-22", note: "Auto-generated by early-warning rules." },
        { status: "Reviewed", date: "2026-08-23", note: "Reviewed by Mr. T. Jooste." },
        { status: "Monitoring", date: "2026-08-25", note: "No intervention needed yet — monitoring next assessments." }
      ]
    }
  ];

  const interventions = [
    {
      id: "IV1", learnerId: "L002", area: "Mathematics — declining performance",
      type: "Additional revision + learning resources", responsible: "Mr. T. Jooste",
      start: "2026-08-05", followUp: "2026-09-05", status: "In progress",
      notes: "Weekly 20-minute revision slot added before class; assigned fractions & trig worksheets.",
      before: [49, 56, 62], after: [66, 71], outcome: "Improved"
    },
    {
      id: "IV2", learnerId: "L001", area: "Mathematics — gradual decline",
      type: "Peer study group + resource pack", responsible: "Mr. T. Jooste",
      start: "2026-08-26", followUp: "2026-09-16", status: "In progress",
      notes: "Joined Tuesday peer study group; issued Grade 10 trigonometry revision pack.",
      before: [68, 65, 63], after: [], outcome: "Pending"
    }
  ];

  const resources = [
    { id: "R1", title: "Grade 10 Trigonometry — Revision Worksheet", subject: "Mathematics", topic: "Trigonometric Identities", grade: "Grade 10", type: "Worksheet", difficulty: "Core" },
    { id: "R2", title: "Fractions Refresher Pack", subject: "Mathematics", topic: "Fractions", grade: "Grade 9–10", type: "Worksheet", difficulty: "Foundation" },
    { id: "R3", title: "Essay Structuring Guide", subject: "English", topic: "Descriptive Writing", grade: "Grade 10", type: "Study Guide", difficulty: "Core" },
    { id: "R4", title: "Cell Structure — Video Walkthrough", subject: "Life Sciences", topic: "Cell Biology", grade: "Grade 10", type: "Video", difficulty: "Core" },
    { id: "R5", title: "Map Work Practice Set", subject: "Geography", topic: "Contour Maps", grade: "Grade 10", type: "Past Paper", difficulty: "Core" },
    { id: "R6", title: "Ledger Accounts — Quick Quiz", subject: "Accounting", topic: "General Ledger", grade: "Grade 10", type: "Quiz", difficulty: "Core" },
    { id: "R7", title: "Newton's Laws — Concept Notes", subject: "Physical Sciences", topic: "Mechanics", grade: "Grade 10", type: "Notes", difficulty: "Extension" }
  ];

  const messages = [
    { id: "M1", thread: "Mr. T. Jooste — Mathematics", withRole: "teacher", unread: true, messages: [
      { from: "teacher", text: "Hi, I'd like to check in about the recent Maths results and set up a short revision plan.", time: "09:02" },
      { from: "me", text: "Thank you for flagging this — happy to support at home, what would help most?", time: "09:20" }
    ]},
    { id: "M2", thread: "Mrs. N. Mbense — English", withRole: "teacher", unread: false, messages: [
      { from: "teacher", text: "Great improvement on the last essay draft — well done!", time: "Yesterday" }
    ]}
  ];

  const notifications = [
    { id: "N1", type: "support", title: "Support indicator raised", detail: "Mathematics — Sipho Nkosi requires teacher review.", time: "2h ago", read: false },
    { id: "N2", type: "assignment", title: "Assignment due soon", detail: "English essay draft due tomorrow.", time: "5h ago", read: false },
    { id: "N3", type: "achievement", title: "Personal best 🎉", detail: "Highest Mathematics mark this year — 71%.", time: "1d ago", read: false },
    { id: "N4", type: "message", title: "New message", detail: "Mr. T. Jooste sent you a message.", time: "1d ago", read: true },
    { id: "N5", type: "attendance", title: "Attendance concern", detail: "Attendance has declined over the past month.", time: "3d ago", read: true }
  ];

  const schoolStats = {
    totalLearners: 612, totalTeachers: 38, totalClasses: 24,
    avgAttendance: 92, avgPerformance: 68,
    performanceByGrade: { "Grade 8": 71, "Grade 9": 69, "Grade 10": 66, "Grade 11": 64, "Grade 12": 70 },
    supportIndicators: { new: 6, reviewed: 9, monitoring: 11, intervention: 5, resolved: 22 },
    interventionOutcomes: { improved: 14, stable: 6, stillSupport: 3, escalated: 1 },
    teacherActivity: [
      { name: "Mr. T. Jooste", subject: "Mathematics", marksEntered: 142, alertsReviewed: 5, interventions: 3 },
      { name: "Mrs. N. Mbense", subject: "English", marksEntered: 138, alertsReviewed: 2, interventions: 1 },
      { name: "Ms. R. Mlotshwa", subject: "Sciences", marksEntered: 156, alertsReviewed: 4, interventions: 2 },
      { name: "Mr. D. Mokwele", subject: "Geography", marksEntered: 119, alertsReviewed: 1, interventions: 0 },
      { name: "Mr. M. Kumar", subject: "Accounting", marksEntered: 107, alertsReviewed: 3, interventions: 1 }
    ]
  };

  return {
    subjects, learners, parentLinks, teacherClasses, timetable, calendarEvents,
    schoolwork, attendanceLog, alerts, interventions, resources, messages,
    notifications, schoolStats
  };
})();
