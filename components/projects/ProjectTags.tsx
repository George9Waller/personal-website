import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlogEntryWithImages } from "../../types/db";
import { getCategoryClasses, getProjectDate } from "../../utils/projects";

interface Props {
  project: BlogEntryWithImages;
}

export const ProjectTags = ({ project }: Props) => (
  <h3 className="flex flex-wrap gap-2">
    <span className="badge badge-accent gap-2">
      <FontAwesomeIcon icon={faCalendar} />
      {getProjectDate(project.date)}
    </span>
    {project.category.map((category, index) => (
      <div
        className={getCategoryClasses(category)}
        key={index}
      >
        {category}
      </div>
    ))}
  </h3>
)
