/** @format */
import { BsBandaid, BsHouseDoor, BsLamp, BsPeople } from "react-icons/bs";
const createUrl = (path: string) => `/admin${path}`;
const createUrlPegawai = (path: string) => `/pegawai${path}`;
const ListMenu = [
  {
    name: "Home",
    href: createUrl("/"),
    icon: <BsHouseDoor />,
  },

  {
    name: "Bidang",
    href: createUrl("/bidang"),
    icon: <BsBandaid />,
  },

  {
    name: "Pegawai",
    href: createUrl("/pegawai"),
    icon: <BsPeople />,
  },

  {
    name: "Pertanyaan",
    href: createUrl("/pertanyaan"),
    icon: <BsLamp />,
  },

  {
    name: "Jawaban",
    href: createUrl("/jawaban"),
    icon: <BsHouseDoor />,
  },
];

const pegawaiMenu = [
  {
    name: "Home",
    href: createUrlPegawai("/"),
    icon: <BsHouseDoor />,
  },
  {
    name: "Jawaban",
    href: createUrlPegawai("/jawaban"),
    icon: <BsPeople />,
  },
];

export default ListMenu;

export { pegawaiMenu };
