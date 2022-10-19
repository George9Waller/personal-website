import Head from "next/head";
import Link from "next/link";
import Container from "../components/common/Container";
import { ReactElement } from "react";
import NavLayout from "../components/layouts/NavLayout";
import { prisma } from "../prisma/db";
import { InferGetStaticPropsType } from "next";
import ProjectCard from "../components/projects/ProjectCard";
import { BlogEntryWithImages } from "../types/db";
import { RECENT_ITEMS_COUNT } from "../utils/constants";
import Heading from "../components/common/Heading";
import SubHeading from "../components/common/SubHeading";
import FlexGrid from "../components/common/FlexGrid";

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>George Waller</title>
        <meta
          name="description"
          content="I am a full stack web developer and also a photographer specialising in aerial and landscape. I am experienced in React and Django and work and enjoying problem solving."
        />
        <meta
          name="keywords"
          content="georgewaller George Waller web developer software engineer photography photo aerial photography fineart fine-art"
        />
      </Head>

      <div>
        <Container>
          <Heading>George Waller</Heading>
          <p>
            I am a software engineer, working in web development but also do
            photography and design focusing mainly on perspective and texture.
            My work includes fine-art aerial photography, wildlife and
            landscapes but I am open to all kinds of projects. My recent work is
            available on the{" "}
            <Link href="/projects">
              <a className="btn btn-primary btn-xs">projects</a>
            </Link>{" "}
            section of this site.
          </p>
          <p>
            More information about my experience can be found in{" "}
            <Link href="/cv">
              <a className="btn btn-primary btn-xs">my CV</a>
            </Link>
          </p>
          <p>
            For further information, print inquires and photographic work please
            contact me via the{" "}
            <Link href="/contact-me">
              <a className="btn btn-xs">Contact Me</a>
            </Link>{" "}
            page or my email:{" "}
            <Link href="mailto:george@georgewaller.com">
              <a className="link link-secondary">george@georgewaller.com</a>
            </Link>
          </p>
        </Container>
        <Container>
          <SubHeading className="mb-4">Recent Projects</SubHeading>
          <FlexGrid className="recent-projects">
            {projects.map((project: BlogEntryWithImages) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export const getStaticProps = async () => {
  const projects = await prisma.blogEntry.findMany({
    where: { draft: false, archieved: false },
    orderBy: { date: "desc" },
    take: RECENT_ITEMS_COUNT,
    include: {
      images: {
        where: {
          isCover: true,
        },
      },
    },
  });

  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) },
    revalidate: 60,
  };
};

export default Home;
