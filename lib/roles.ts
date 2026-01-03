export type AppRole = "user" | "physiotherapist" | "admin-physiotherapist" | "trainer" | "superadmin" | "owner"

// Navigation keys correspond to translation keys used in layout
export interface RoleConfig {
  main: { key: string; path: string; icon: string }[]
  menu: { key: string; path: string; icon: string }[]
}

// Icons are referenced by name to keep this file UI-agnostic
export const roleConfigs: Record<AppRole, RoleConfig> = {
  user: {
    main: [
      { key: "dashboard", path: "/user-dashboard", icon: "Home" },
      { key: "workouts", path: "/workouts", icon: "Dumbbell" },
      { key: "progress", path: "/progress", icon: "TrendingUp" },
    ],
    menu: [
      { key: "profile", path: "/profile", icon: "User" },
      { key: "notifications", path: "/user-dashboard/notifications", icon: "Bell" },
      { key: "settings", path: "/user-dashboard/settings", icon: "Settings" },
  // Help removed
    ],
  },
  physiotherapist: {
    main: [
      { key: "dashboard", path: "/physiotherapist", icon: "Home" },
      { key: "requests", path: "/physiotherapist/requests", icon: "Bell" },
      { key: "patients", path: "/physiotherapist/patients", icon: "Users" },
      { key: "appointments", path: "/physiotherapist/appointments", icon: "Dumbbell" },
      { key: "anatomy3D", path: "/physiotherapist/anatomy", icon: "Bone" },
      { key: "progress", path: "/physiotherapist/progress", icon: "TrendingUp" },
    ],
    menu: [
      { key: "profile", path: "/physiotherapist/profile", icon: "User" },
      { key: "notifications", path: "/physiotherapist/notifications", icon: "Bell" },
      { key: "settings", path: "/physiotherapist/settings", icon: "Settings" },
  // Help removed
    ],
  },
  "admin-physiotherapist": {
    main: [
      { key: "dashboard", path: "/physiotherapist", icon: "Home" },
      { key: "requests", path: "/physiotherapist/requests", icon: "Bell" },
      { key: "patients", path: "/physiotherapist/patients", icon: "Users" },
      { key: "appointments", path: "/physiotherapist/appointments", icon: "Dumbbell" },
      { key: "anatomy3D", path: "/physiotherapist/anatomy", icon: "Bone" },
      { key: "progress", path: "/physiotherapist/progress", icon: "TrendingUp" },
      { key: "allPhysiotherapists", path: "/admin-physiotherapist/manage", icon: "UserCog" },
      { key: "systemSettings", path: "/admin-physiotherapist/settings", icon: "Settings" },
      { key: "analytics", path: "/admin-physiotherapist/analytics", icon: "BarChart3" },
    ],
    menu: [
      { key: "profile", path: "/physiotherapist/profile", icon: "User" },
      { key: "notifications", path: "/physiotherapist/notifications", icon: "Bell" },
      { key: "settings", path: "/physiotherapist/settings", icon: "Settings" },
      { key: "activityLogs", path: "/admin-physiotherapist/logs", icon: "Activity" },
    ],
  },
  trainer: {
    main: [
      { key: "dashboard", path: "/trainer", icon: "Home" },
      { key: "trainees", path: "/trainer/trainees", icon: "Users" },
      { key: "traineeWorkouts", path: "/trainer/workouts", icon: "Dumbbell" },
    ],
    menu: [
      { key: "profile", path: "/trainer/profile", icon: "User" },
      { key: "notifications", path: "/trainer/notifications", icon: "Bell" },
      { key: "settings", path: "/trainer/settings", icon: "Settings" },
  // Help removed
    ],
  },
  superadmin: {
    main: [
      { key: "dashboard", path: "/superadmin", icon: "Home" },
      { key: "registrationRequests", path: "/superadmin/registration-requests", icon: "FileText" },
      { key: "adsManagement", path: "/superadmin/ads", icon: "Sparkles" },
      { key: "systemSettings", path: "/superadmin", icon: "Settings" },
      { key: "analytics", path: "/analytics", icon: "TrendingUp" },
    ],
    menu: [
      { key: "profile", path: "/superadmin/profile", icon: "User" },
      { key: "notifications", path: "/superadmin/notifications", icon: "Bell" },
      { key: "systemSettings", path: "/superadmin/settings", icon: "Settings" },
  // Help removed
    ],
  },
  owner: {
    main: [
      { key: "dashboard", path: "/owner", icon: "Home" },
      { key: "activityLogs", path: "/owner/activity-logs", icon: "Activity" },
      { key: "management", path: "/owner", icon: "Settings" },
    ],
    menu: [
      { key: "profile", path: "/owner/profile", icon: "User" },
      { key: "notifications", path: "/owner/notifications", icon: "Bell" },
      { key: "settings", path: "/owner/settings", icon: "Settings" },
  // Help removed
    ],
  },
}

export function getRoleConfig(role: AppRole): RoleConfig {
  return roleConfigs[role] || roleConfigs.user
}
