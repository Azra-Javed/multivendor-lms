import Link from "next/link";

interface Props {
  isMobile: boolean;
  activeItem: number;
  setOpenSidebar?: (open: boolean) => void;
}

// nav items
export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

const NavItems = ({ activeItem, isMobile, setOpenSidebar }: Props) => {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={item.url}>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[#136861] font-bold"
                  : "dark:text-white text-black"
              } text-[18px] font-Poppins px-6 font-normal`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* MOBILE */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          {navItemsData.map((item, index) => (
            <Link
              href={item.url}
              key={item.url}
              onClick={() => setOpenSidebar?.(false)}
            >
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } block py-5 text-[18px] font-Poppins px-6 font-normal`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
