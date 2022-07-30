import Head from "next/head";
import Container from "../../components/common/Container";
import { ReactElement, useState } from "react";
import NavLayout from "../../components/layouts/NavLayout";
import { prisma } from "../../prisma/db";
import { BlogEntryWithImages } from "../../types/db";
import { selectTranslation } from "../../utils/common";
import { useRouter } from "next/router";
import { trackPromise } from "react-promise-tracker";
import { ProjectDetailData } from "../api/projects/[id]";
import { Skeleton } from "@mui/material";
import ProjectDetail from "../../components/projects/ProjectDetail";

interface Props {
  project: BlogEntryWithImages | null;
}

const ProjectDetailPage = ({ project }: Props) => {
  const router = useRouter();
  const [loadedProject, setLoadedProject] = useState(project);

  const getProjectDetail = async (id: string) => {
    const res = await trackPromise(fetch(`/api/projects/${id}`));
    const fetchedProject = ((await res.json()) as ProjectDetailData).project;
    setLoadedProject(fetchedProject);
  };

  const getArticleStructuredData = () => {
    const coverImage = loadedProject?.images.find((image) => image.isCover);
    return loadedProject
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: selectTranslation(loadedProject.title),
          image: coverImage && coverImage.imageUrl,
          datePublished: loadedProject.date,
          dateModified: loadedProject.updated,
          author: [
            {
              "@type": "Person",
              name: "George Waller",
              url: "https://www.georgewaller.com",
            },
          ],
          wordCount: selectTranslation(loadedProject.content).split(" ").length,
        }
      : {};
  };

  if ((router.isFallback || !project) && router.query.id) {
    router.query.id && getProjectDetail(router.query.id.toString());
  }

  const title = loadedProject ? selectTranslation(loadedProject.title) : "";

  return (
    <div>
      <Head>
        <title>George Waller | {title}</title>
        {loadedProject && (
          <>
            <meta
              name="description"
              content={selectTranslation(loadedProject.shortDescription)}
            />
            <script type="application/ld+json">
              {JSON.stringify(getArticleStructuredData())}
            </script>
          </>
        )}
      </Head>

      <Container>
        {loadedProject ? (
          <ProjectDetail project={loadedProject} />
        ) : (
          <>
            <Skeleton variant="rectangular" width={500} height={300} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </>
        )}
      </Container>
    </div>
  );
};

ProjectDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

interface UrlParams {
  params: {
    id: string;
  };
}

export const getStaticProps = async ({ params }: UrlParams) => {
  const project = await prisma.blogEntry.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      images: {
        orderBy: {
          title: "asc",
        },
      },
    },
  });

  if (!project || project.draft === true) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  return {
    props: { project: JSON.parse(JSON.stringify(project)) },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const projects = await prisma.blogEntry.findMany({
    where: { draft: false },
    select: { id: true },
  });
  return {
    paths: projects.map((project) => ({
      params: { id: project.id.toString() },
    })),
    fallback: true,
  };
};

export default ProjectDetailPage;
