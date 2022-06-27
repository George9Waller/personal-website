import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Footer = () => {
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
          <Link href="/projects/photography">
            <a className="link link-hover">Photography</a>
          </Link>
          <Link href="/projects/coding">
            <a className="link link-hover">Coding</a>
          </Link>
        </div>
        <div>
          <span className="footer-title">Stay up to date</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">
                Enter your email address to receive updates whenever I post
                something new
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
              />
              <button className="btn btn-accent absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
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
            <Link href="https://github.com/George9Waller">
              <a target="_blank">
                <FontAwesomeIcon icon={faGithub} className="text-2xl link" />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
