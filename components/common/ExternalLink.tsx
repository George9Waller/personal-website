import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";

type ExternalLinkProps = {
  href: string;
  displayText: string;
  className?: string;
};

export const ExternalLink = ({ href, displayText, className }: ExternalLinkProps) => (
  <Link href={href}>
    <a target="_blank" rel="noreferrer" className={classNames("link block", className)}>{displayText}<FontAwesomeIcon icon={faExternalLink} className="ml-1"/></a>
  </Link>
);

export default ExternalLink;
