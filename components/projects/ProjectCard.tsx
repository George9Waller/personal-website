import { Skeleton } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { BlogEntryWithImages } from "../../types/db";
import { selectTranslation } from "../../utils/common";
import { getCategoryClasses } from "../../utils/projects";
import { ProjectTags } from "./ProjectTags";

interface Props {
  project: BlogEntryWithImages;
}

export const ProjectCard = ({ project }: Props) => {
  const coverImage = project.images[0];
  return (
    <div className="indicator">
      <span
        className={classNames(
          "indicator-item badge",
          getCategoryClasses(project.category[0])
        )}
      ></span>
      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        {coverImage && (
          <figure>
            <Image
              src={coverImage.imageUrl}
              alt={selectTranslation(coverImage.altText)}
              placeholder="blur"
              blurDataURL={coverImage.imageUrl}
              width={384}
              height={216}
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title pb-0">
            {selectTranslation(project.title)}
          </h2>
          <ProjectTags project={project} />
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

export const ProjectCardPlaceholder = () => (
  <div>
    <Skeleton variant="rectangular" width={288} height={162} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton
      variant="rectangular"
      width={62}
      height={32}
      className="ml-auto mt-2"
    />
  </div>
);

export default ProjectCard;
