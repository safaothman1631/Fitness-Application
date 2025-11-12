export type AppRole = "user" | "physiotherapist" | "trainer" | "superadmin" | "admin" | "owner"

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
      { key: "profile", path: "/user-dashboard/profile", icon: "User" },
      { key: "notifications", path: "/user-dashboard/notifications", icon: "Bell" },
      { key: "settings", path: "/user-dashboard/settings", icon: "Settings" },
  // Help removed
    ],
  },
  physiotherapist: {
    main: [
      { key: "dashboard", path: "/physiotherapist", icon: "Home" },
      { key: "patients", path: "/physiotherapist/patients", icon: "Users" },
      { key: "activities", path: "/physiotherapist/activities", icon: "TrendingUp" },
    ],
    menu: [
      { key: "profile", path: "/physiotherapist/profile", icon: "User" },
      { key: "notifications", path: "/physiotherapist/notifications", icon: "Bell" },
      { key: "settings", path: "/physiotherapist/settings", icon: "Settings" },
  // Help removed
    ],
  },
  trainer: {
    main: [
      { key: "dashboard", path: "/trainer", icon: "Home" },
      { key: "trainees", path: "/trainer", icon: "Users" },
      { key: "workouts", path: "/workouts", icon: "Dumbbell" },
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
  admin: {
    main: [
      { key: "dashboard", path: "/admin", icon: "Home" },
      { key: "management", path: "/admin", icon: "Settings" },
      { key: "reports", path: "/reports", icon: "TrendingUp" },
    ],
    menu: [
      { key: "profile", path: "/admin/profile", icon: "User" },
      { key: "notifications", path: "/admin/notifications", icon: "Bell" },
      { key: "settings", path: "/admin/settings", icon: "Settings" },
  // Help removed
    ],
  },
  owner: {
    main: [
      { key: "dashboard", path: "/owner", icon: "Home" },
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
