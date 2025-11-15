import Link from "next/link";
import React from "react";

interface Props {
  isMobile: Boolean;
  activeItem: number;
}

//nav items
export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },

  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
const NavItems = ({ activeItem, isMobile }: Props) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] font-Poppins px-6 font-normal`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-medium text-black dark:text-white`}
              passHref
            >
              Azra Javed
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={"/"} passHref>
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
