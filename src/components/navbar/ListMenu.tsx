/** @format */
import { BsHouseDoorFill, BsLampFill, BsPeopleFill } from "react-icons/bs";
const ListMenu = [
  {
    name: "Home",
    href: "/",
    icon: <BsHouseDoorFill />,
  },

  {
    name: "Tentang",
    href: "/tentang",
    icon: <BsHouseDoorFill />,
  },

  {
    name: "Katalog",
    href: "#",
    slug: "katalog",
    icon: <BsPeopleFill />,
    subMenus: [
      {
        name: "Buku",
        href: "/katalog?jenis=buku",
      },
      {
        name: "Jurnal",
        href: "/katalog?jenis=jurnal",
      },
      {
        name: "Tugas Akhir",
        href: "/katalog?jenis=tugas akhir",
      },
    ],
  },
];

export default ListMenu;
