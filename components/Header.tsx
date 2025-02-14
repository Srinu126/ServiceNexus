"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NavigationMenuDemo } from "./HeaderNavigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// import Link from "next/link";

// <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
//   <div className="flex items-center space-x-4 ml-4">
//     <Link href="/">
//       <div className="text-2xl font-bold text-blue-600">ServiceNexus</div>
//     </Link>

//     <nav className="hidden md:flex space-x-6">
//       <NavigationMenuDemo />
//     </nav>
//   </div>
//   <div className="flex items-center space-x-4 mr-4">
//     {!session ? (
//       <Button onClick={() => signIn("google")} variant="default">
//         Sign In
//       </Button>
//     ) : (
//       <div className="flex items-center space-x-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Image
//               src={session.user?.image || "/default-avatar.png"}
//               alt="User Avatar"
//               className="rounded-full cursor-pointer"
//               width={40}
//               height={40}
//             />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem onClick={() => router.push("/profile")}>
//               View Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
//               Sign Out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     )}
//   </div>
// </header>
import { useState } from "react";
import Link from "next/link";

const SignInFunc = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex text-white mt-0 sm:mt-2.5 items-center flex-end space-x-4 mr-4">
      {!session ? (
        <Button onClick={() => signIn("google")} variant="default">
          Sign In
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt="User Avatar"
                className="rounded-full cursor-pointer"
                width={40}
                height={40}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link href="/">
        <img src="/logo.svg" alt="hoobank" className="w-[220px] h-[64px]" />
      </Link>

      <ul className="list-none sm:flex hidden mt-2.5 justify-start items-center flex-1">
        <NavigationMenuDemo />
      </ul>
      <div className="hidden sm:flex">
        <SignInFunc />
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <SignInFunc />
        <img
          src={toggle ? "/close.svg" : "/menu.svg"}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
