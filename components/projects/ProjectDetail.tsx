import { BlogEntryWithImages } from "../../types/db";
import Image from "next/image";
import { selectTranslation } from "../../utils/common";
import { ProjectTags } from "./ProjectTags";
import ReactMarkdown from "react-markdown";
import ImageGallery from "../common/ImageGallery";
import { ProjectCategories } from "../../utils/projects";
import { PrintsAvailableBanner } from "./PrintsAvailableBanner";

interface Props {
  project: BlogEntryWithImages;
}

const ProjectDetail = ({ project }: Props) => {
  const coverImage = project.images.find((image) => image.isCover);
  return (
    <div className="card">
      {coverImage && (
        <figure className="relative h-64 rounded">
          <Image
            src={coverImage.imageUrl}
            alt={selectTranslation(coverImage.altText)}
            layout="fill"
            objectFit="cover"
          />
        </figure>
      )}
      <div className="card-title grid grid-cols-1 mt-4">
        <h1 className="text-4xl">{selectTranslation(project.title)}</h1>
        <ProjectTags project={project} />
      </div>
      <div className="card-body px-0">
        <ReactMarkdown className="rendered-markdown">
          {selectTranslation(project.content)}
        </ReactMarkdown>
        {project.category.includes(ProjectCategories.FINE_ART) && (
          <PrintsAvailableBanner />
        )}
        <ImageGallery images={project.images} sortByTitle />
      </div>
    </div>
  );
};

export default ProjectDetail;
