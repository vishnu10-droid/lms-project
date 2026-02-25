// src/modules/roles/PermissionGroups.js

export const PERMISSION_GROUPS = {
  Dashboard: ["View Dashboard"],

  Courses: [
    "Create Course",
    "Edit Course",
    "Delete Course",
    "Publish Course",
    "Manage Course Content",
    "Manage Videos",
    "Manage Resources",
    "View Courses"
  ],

  Students: [
    "View Students",
    "Enroll Students",
    "Remove Students",
    "Manage Student Profiles",
    "View Student Progress",
    "Grade Assignments"
  ],

  Instructors: [
    "View Instructors",
    "Add Instructor",
    "Edit Instructor",
    "Remove Instructor",
    "Assign Courses to Instructor"
  ],

  Batches: [
    "Create Batch",
    "Edit Batch",
    "Delete Batch",
    "Manage Batch Timing",
    "Manage Batch Students"
  ],

  Assignments: [
    "Create Assignments",
    "Edit Assignments",
    "Delete Assignments",
    "Evaluate Assignments"
  ],

  Exams: [
    "Create Exams",
    "Edit Exams",
    "Delete Exams",
    "Manage Exam Results",
  ],

  Attendance: [
    "Mark Attendance",
    "Edit Attendance",
    "View Attendance Reports",
  ],

  Chats: [
    "View Chats",
    "Send Messages",
    "Delete Chats",
    "Manage Support Tickets",
  ],

  Notifications: [
    "Send Notifications",
    "Delete Notifications",
    "View Notifications",
  ],

  Payment: [
    "View Payments",
    "Process Refunds",
    "Manage Invoices",
    "View Financial Reports",
  ],

  Reports: [
    "View Reports",
    "Export Reports",
    "Download Analytics",
  ],

  Roles: [
    "Create Roles",
    "Edit Roles",
    "Delete Roles",
    "View Roles"
  ],

  Settings: [
    "Update Platform Settings",
    "Update Branding",
    "Manage Integrations",
    "Manage API Keys",
  ],
};  