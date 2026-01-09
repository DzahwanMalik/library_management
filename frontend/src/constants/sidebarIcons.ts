import { History, House, LibraryBig, UserRound } from "lucide-react";
import type { SidebarIcon } from "../types/SidebarIcon.type";

export const sidebarIcon: SidebarIcon[] = [
  {
    label: "Beranda",
    icon: House,
    path: "/",
  },
  {
    label: "Daftar Anggota",
    icon: UserRound,
    path: "/users",
  },
  {
    label: "Daftar Buku",
    icon: LibraryBig,
    path: "/books",
  },
  {
    label: "History",
    icon: History,
    path: "/history",
  },
];
