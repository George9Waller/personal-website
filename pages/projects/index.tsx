import { ReactElement } from "react";
import NavLayout from "../../components/layouts/NavLayout";
import { prisma } from "../../prisma/db";
import { InferGetStaticPropsType } from "next";
import { PAGINATION_COUNT } from "../../utils/constants";
import { ProjectListPage } from "../../components/projects/ProjectListPage";

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProjectListPage projects={projects} />;
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
