import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL } from "../../utils/constants";

export const Footer = () => {
  const { data: session } = useSession();
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <span className="footer-title">Info</span>
          <Link href="/">
            <a className="link link-hover">About Me</a>
          </Link>
          <Link href="/cv">
            <a className="link link-hover">CV</a>
          </Link>
          <Link href="/projects">
            <a className="link link-hover">Projects</a>
          </Link>
        </div>
        <div>
          <span className="footer-title">Projects</span>
          <Link href="/projects">
            <a className="link link-hover">All Projects</a>
          </Link>
        </div>
        <div>
          <span className="footer-title">Portal</span>
          {session && (
            <Link href="/portal">
              <a className="link link-hover">Enter Portal</a>
            </Link>
          )}
          {session ? (
            <Link href="/api/auth/signout">
              <a
                className="link link-hover"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Logout
              </a>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <a
                className="link link-hover"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Login
              </a>
            </Link>
          )}
          <Link href="https://stats.uptimerobot.com/V9mM0t28rR">
            <a className="link link-hover">Status</a>
          </Link>
        </div>
        <div>
          <span className="footer-title">Stay up to date</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">
                Enter your email address to receive updates when I post
                something new
              </span>
            </label>
            <Link href="/newsletter">
              <a className="btn btn-accent">Subscribe</a>
            </Link>
          </div>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>
            <span className="font-bold">George Waller</span> {year}
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link href={GITHUB_URL}>
              <a target="_blank">
                <FontAwesomeIcon icon={faGithub} className="text-2xl link" />
                <p className="sr-only">Go to my GitHub page</p>
              </a>
            </Link>
            <Link href={LINKEDIN_URL}>
              <a target="_blank">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl link" />
                <p className="sr-only">Go to my LinkedIn page</p>
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
