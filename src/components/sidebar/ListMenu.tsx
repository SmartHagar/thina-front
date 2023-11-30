/** @format */
import { BsHouseDoorFill, BsLampFill, BsPeopleFill } from "react-icons/bs";
const createUrl = (path: string) => `/admin${path}`;
const ListMenu = [
  {
    name: "Home",
    href: createUrl("/"),
    icon: <BsHouseDoorFill />,
  },

  {
    name: "Tentang",
    href: createUrl("/tentang"),
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
        href: createUrl("/katalog?jenis=buku"),
      },
      {
        name: "Jurnal",
        href: createUrl("/katalog?jenis=jurnal"),
      },
      {
        name: "Tugas Akhir",
        href: createUrl("/katalog?jenis=tugas-akhir"),
      },
    ],
  },
];

export default ListMenu;
