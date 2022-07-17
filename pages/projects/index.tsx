import { ReactElement, useEffect, useState } from "react";
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
import {
  getCategoryClasses,
  getCategoryQueryParam,
  ProjectCategories,
} from "../../utils/projects";
import classNames from "classnames";
import { useAppContext } from "../../components/context/AppContext";
import SubHeading from "../../components/common/SubHeading";
import Loading from "../../components/common/Loading";

const Projects = ({
  projects,
  totalProjectCount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [filteredTotalProjectCount, setFilteredTotalProjectCount] =
    useState(totalProjectCount);
  const { promiseInProgress } = usePromiseTracker();
  const { categories, addCategory, removeCategory } = useAppContext();

  const getMoreProjects = async () => {
    const res = await trackPromise(
      fetch(
        `/api/projects/list/?take=${PAGINATION_COUNT}&skip=${
          currentProjects.length
        }&${getCategoryQueryParam(categories)}`
      )
    );
    const newData = (await res.json()) as ProjectsListData;
    setCurrentProjects([...currentProjects, ...newData.projects]);
  };

  const categoryOnClick = (category: ProjectCategories) => {
    categories.includes(category)
      ? removeCategory(category)
      : addCategory(category);
  };

  useEffect(() => {
    const getProjects = async () => {
      const res = await trackPromise(
        fetch(
          `/api/projects/list/?take=${PAGINATION_COUNT}&${getCategoryQueryParam(
            categories
          )}`
        )
      );
      const newData = (await res.json()) as ProjectsListData;
      setCurrentProjects(newData.projects);
      setFilteredTotalProjectCount(newData.totalCount);
    };
    setCurrentProjects([]);
    if (categories.length > 0) {
      getProjects();
    } else {
      setFilteredTotalProjectCount(0);
    }
  }, [categories]);

  const getStatus = () => {
    if (
      promiseInProgress &&
      (categories.length === 0 || currentProjects.length == 0)
    ) {
      return <Loading />;
    } else if (categories.length === 0) {
      return <SubHeading>There are no categories selected</SubHeading>;
    } else if (currentProjects.length === 0) {
      return <SubHeading>Nothing here yet, more coming soon...</SubHeading>;
    }
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
      <Container className="mb-0 pb-2w">
        <p className="text-sm">Visible categories</p>
        <div className="flex flex-row gap-2 items-center overflow-scroll pb-2">
          {Object.entries(ProjectCategories).map(([key, category]) => {
            return (
              <button
                key={key}
                className={classNames(
                  "btn btn-sm",
                  getCategoryClasses(category),
                  !categories.includes(category) && "opacity-50"
                )}
                onClick={() => categoryOnClick(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </Container>
      <Container className="mt-4">
        <div className="mx-auto">{getStatus()}</div>
        <FlexGrid>
          {currentProjects.map((project: BlogEntryWithImages) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {promiseInProgress &&
            [
              ...Array(
                Math.min(
                  PAGINATION_COUNT,
                  filteredTotalProjectCount - currentProjects.length
                )
              ),
            ].map((e) => <ProjectCardPlaceholder key={e} />)}
        </FlexGrid>
        {filteredTotalProjectCount !== 0 && (
          <PaginationControls
            currentCount={currentProjects.length}
            maxCount={filteredTotalProjectCount}
            onClick={getMoreProjects}
          />
        )}
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
