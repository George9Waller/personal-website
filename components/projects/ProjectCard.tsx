import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { BlogEntryWithImages } from "../../types/db";
import { selectTranslation } from "../../utils/common";
import { getCategoryClasses } from "../../utils/projects";

interface Props {
  project: BlogEntryWithImages;
}

export const ProjectCard = ({ project }: Props) => {
  console.log(project);
  const date = new Date(project.date).toLocaleDateString("en", {
    month: "short",
    year: "numeric",
  });
  console.log(date);
  const coverImage = project.images[0];
  return (
    <div className="indicator">
      <span
        className={classNames(
          "indicator-item",
          getCategoryClasses(project.category[0], "badge")
        )}
      ></span>
      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={coverImage.imageUrl}
            alt={selectTranslation(coverImage.altText)}
            width={384}
            height={216}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title pb-0">
            {selectTranslation(project.title)}
          </h2>
          <h3 className="flex gap-2">
            <span className="badge badge-accent gap-2">
              <FontAwesomeIcon icon={faCalendar} />
              {date}
            </span>
            {project.category.map((category, index) => (
              <div
                className={getCategoryClasses(category, "badge")}
                key={index}
              >
                {category}
              </div>
            ))}
          </h3>
          <p>{selectTranslation(project.shortDescription)}</p>
          <div className="card-actions justify-end">
            <Link href={`/projects/${project.id}`}>
              <a className="btn btn-sm btn-primary">View</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
