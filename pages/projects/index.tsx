import { ReactElement, useState } from "react";
import NavLayout from "../../components/layouts/NavLayout";
import { prisma } from "../../prisma/db";
import Container from "../../components/common/Container";
import FlexGrid from "../../components/common/FlexGrid";
import { InferGetStaticPropsType } from "next";
import { BlogEntryWithImages } from "../../types/db";
import ProjectCard, {
  ProjectCardPlaceholder,
} from "../../components/projects/ProjectCard";
import { ProjectsListData } from "../api/projects/list";
import PaginationControls from "../../components/common/PaginationControls";
import { PAGINATION_COUNT } from "../../utils/constants";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Head from "next/head";

const Projects = ({
  projects,
  totalProjectCount
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentProjects, setCurrentProjects] = useState(projects);
  const { promiseInProgress } = usePromiseTracker();

  const getMoreProjects = async () => {
    const res = await trackPromise(
      fetch(
        `/api/projects/list/?take=${PAGINATION_COUNT}&skip=${currentProjects.length}`
      )
    );
    const newProjects = (await res.json()) as ProjectsListData;
    setCurrentProjects([...currentProjects, ...newProjects.projects]);
  };

  const carouselStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: currentProjects.map(
      (project: BlogEntryWithImages, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.id}`,
      })
    ),
  };

  return (
    <>
      <Head>
        <title>George Waller | Projects</title>
        <meta
          name="description"
          content="These are the photography and coding projects I have undertaken recently."
        />
        <script type="application/ld+json">
          {JSON.stringify(carouselStructuredData)}
        </script>
      </Head>
      <Container>
        <FlexGrid>
          {currentProjects.map((project: BlogEntryWithImages) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {promiseInProgress &&
            [...Array(PAGINATION_COUNT)].map((e) => (
              <ProjectCardPlaceholder key={e} />
            ))}
        </FlexGrid>
        <PaginationControls
          currentCount={currentProjects.length}
          maxCount={totalProjectCount}
          onClick={getMoreProjects}
        />
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const [projects, count] = await prisma.$transaction([
    prisma.blogEntry.findMany({
      take: PAGINATION_COUNT,
      where: {
        draft: false,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        images: {
          where: {
            isCover: true,
          },
        },
      },
    }),
    prisma.blogEntry.count({
      where: {
        draft: false,
      },
    }),
  ]);
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      totalProjectCount: count,
    },
    revalidate: 60,
  };
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Projects;
