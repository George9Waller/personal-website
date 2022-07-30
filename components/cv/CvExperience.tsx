import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProjectDate } from "../../utils/projects";
import ExternalLink from "../common/ExternalLink";
import ThirdHeading from "../common/ThirdHeading";

type Role = {
  fromDate: Date;
  toDate?: Date;
  title: string;
  children: React.ReactNode;
};

type ExperienceLink = {
  href: string;
  displayText: string;
};

type CvExperienceProps = {
  icon: IconDefinition;
  fromDate: Date;
  roles: Role[];
  description?: string;
  title?: string;
  toDate?: Date;
  link?: ExperienceLink;
};

const getDateRange = (fromDate: Date, toDate?: Date) =>
  `${getProjectDate(fromDate)} - ${
    toDate ? getProjectDate(toDate) : "present"
  }`;

const experienceEntry = (role: Role) => (
  <div className="my-2 text-left">
    <ThirdHeading>
      {role.title}
      <div className="ml-2 badge badge-sm badge-accent">
        {getDateRange(role.fromDate, role.toDate)}
      </div>
    </ThirdHeading>
    <div className="opacity-80 text-sm">{role.children}</div>
  </div>
);

export const CvExperience = (props: CvExperienceProps) => (
  <div className="indicator inline-block w-full">
    <span className="indicator-item indicator-center badge badge-accent w-max text-accent-content">
      {getDateRange(props.fromDate, props.toDate)}
    </span>
    <div className="bg-base-200 p-2 rounded flex flex-col gap-2">
      <ThirdHeading className="mt-2">
        <FontAwesomeIcon icon={props.icon} className="text-primary" />
        <span className="ml-2">
          {props.roles.length === 1 ? props.roles[0].title : props.title}
        </span>
      </ThirdHeading>
      {props.description && <p>{props.description}</p>}
      {props.roles.length === 1 ? (
        props.roles[0].children
      ) : (
        <ul className="steps steps-vertical">
          {props.roles.map((role, index) => (
            <li key={index} data-content="" className="step step-primary">
              {experienceEntry(role)}
            </li>
          ))}
        </ul>
      )}
      {props.link && (
        <ExternalLink
          href={props.link.href}
          displayText={props.link.displayText}
        />
      )}
    </div>
  </div>
);

export default CvExperience;
