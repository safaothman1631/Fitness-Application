import { redirect } from "next/navigation"

export default function RootPage() {
  // Updated to English path after route renaming
  redirect("/login")
}
