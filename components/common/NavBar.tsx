import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeSwitch } from "./ThemeSwitch";

interface NavLinkProps {
  pathName: string;
}

const getNavButtonClasses = (path: string, pathName: string) => {
  let selectedClassNames = "btn-ghost";
  if (
    (path !== "/" && pathName.includes(path)) ||
    (path === "/" && pathName === "/")
  ) {
    selectedClassNames = "btn-primary btn-outline";
  }

  return classNames("btn", selectedClassNames);
};

const NavLinks = ({ pathName }: NavLinkProps) => {
  return (
    <>
      <li>
        <Link href="/">
          <a className={getNavButtonClasses("/", pathName)}>About Me</a>
        </Link>
      </li>
      <li>
        <Link href="/cv">
          <a className={getNavButtonClasses("/cv", pathName)}>CV</a>
        </Link>
      </li>
      <li>
        <Link href="/projects">
          <a className={getNavButtonClasses("/projects", pathName)}>Projects</a>
        </Link>
      </li>
    </>
  );
};

export const NavBar = () => {
  const pathName = useRouter().pathname;
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks pathName={pathName} />
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">George Waller</a>
        </Link>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <NavLinks pathName={pathName} />
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <FontAwesomeIcon icon={faPalette} />
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-auto w-60 overflow-y-auto shadow-2xl mt-16 pl-0"
            >
              <ThemeSwitch />
            </ul>
          </div>
          <Link href="/contact-me">
            <a className="btn">Contact Me</a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
