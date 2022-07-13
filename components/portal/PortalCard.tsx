import classNames from "classnames";
import Link from "next/link";
import { PortalApp } from "../../utils/portal";
import SubHeading from "../common/SubHeading";

interface Props {
  app: PortalApp
}

export const PortalCard = ({ app }: Props) => (
  <Link href={app.href}>
    <div className={classNames("w-full mx-auto flex flex-col justify-between p-4 rounded-xl items-center gap-4 text-gray-800", app.colour)}>
      <SubHeading>{app.title}</SubHeading>
        <a className="btn btn-sm w-16">Enter</a>
    </div>
  </Link>
);

export default PortalCard;
