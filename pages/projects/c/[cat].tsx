import { ReactElement } from "react";
import NavLayout from "../../../components/layouts/NavLayout";
import { prisma } from "../../../prisma/db";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PAGINATION_COUNT } from "../../../utils/constants";
import { ProjectListPage } from "../../../components/projects/ProjectListPage";
import { useAppContext } from "../../../components/context/AppContext";
import {
  CATEGORY_URL_SLUGS,
  getCategoryOrUndefined,
} from "../../../utils/projects";
import { useRouter } from "next/router";
import Loading from "../../../components/common/Loading";

const CategoryProjects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addSingularCategory } = useAppContext();
  const router = useRouter();
  const { cat } = router.query;

  const filteredCategory = getCategoryOrUndefined(cat);
  filteredCategory && addSingularCategory(filteredCategory);

  if (projects) {
    return <ProjectListPage projects={projects} />;
  } else {
    return <Loading />;
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const filteredCategory = getCategoryOrUndefined(context.params?.cat);
  const projects = await prisma.blogEntry.findMany({
    take: PAGINATION_COUNT,
    where: {
      draft: false,
      archieved: false,
      category: filteredCategory ? { hasSome: [filteredCategory] } : undefined,
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

CategoryProjects.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export const getStaticPaths = async () => {
  return {
    paths: Object.values(CATEGORY_URL_SLUGS).map((slug) => ({
      params: { cat: slug },
    })),
    fallback: true,
  };
};

export default CategoryProjects;
