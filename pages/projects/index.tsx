import { ReactElement } from "react";
import NavLayout from "../../components/layouts/NavLayout";
import { prisma } from "../../prisma/db";
import Container from "../../components/common/Container";
import FlexGrid from "../../components/common/FlexGrid";
import { InferGetStaticPropsType } from "next";
import { BlogEntryWithImages } from "../../types/db";
import ProjectCard from "../../components/projects/ProjectCard";
import { ProjectsListData } from "../api/projects/list";
import PaginationControls from "../../components/common/PaginationControls";
import { PAGINATION_COUNT } from "../../utils/constants";
import useSWRInfinite from "swr/infinite";
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
import { fetcher, getPaginationUrl } from "../../utils/common";

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { categories, addCategory, removeCategory } = useAppContext();

  const categoryOnClick = (category: ProjectCategories) => {
    categories.includes(category)
      ? removeCategory(category)
      : addCategory(category);
    mutate();
  };

  const getStatus = () => {
    if (categories.length === 0) {
      return <SubHeading>There are no categories selected</SubHeading>;
    } else if (data?.length === 0) {
      return <SubHeading>Nothing here yet, more coming soon...</SubHeading>;
    }
  };

  const getKey = (pageIndex: number, previousPageData: ProjectsListData) => {
    if (previousPageData && !previousPageData.projects.length) return null;
    return `${getPaginationUrl(
      "/api/projects/list/",
      pageIndex,
      true
    )}&${getCategoryQueryParam(categories)}`;
  };

  const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher, {
    revalidateAll: true,
  });

  let currentCount = 0;
  data?.forEach((page) => (currentCount += page.projects.length));

  const carouselStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map(
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
                  getCategoryClasses(category, true),
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
          {data ? (
            data.map((page) => {
              return page.projects.map((project: BlogEntryWithImages) => (
                <ProjectCard key={project.id} project={project} />
              ));
            })
          ) : (
            <Loading />
          )}
        </FlexGrid>
        {currentCount !== 0 && (
          <PaginationControls
            currentCount={currentCount}
            maxCount={data && data[0].totalCount}
            onClick={() => setSize(size + 1)}
          />
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const projects = await prisma.blogEntry.findMany({
    take: PAGINATION_COUNT,
    where: {
      draft: false,
      archieved: false,
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
  });
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 60,
  };
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Projects;
