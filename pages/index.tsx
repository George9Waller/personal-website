import Head from "next/head";
import Link from "next/link";
import Container from "../components/common/Container";
import { ReactElement } from "react";
import NavLayout from "../components/layouts/NavLayout";
import { prisma } from "../prisma/db";
import { InferGetStaticPropsType } from "next";
import ProjectCard from "../components/projects/ProjectCard";
import { BlogEntryWithImages } from "../types/db";

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>George Waller</title>
        <meta
          name="description"
          content="I am a full stack web developer and also a photographer specialising in aerial and landscape. I am experienced in React and Django and work and enjoying problem solving."
        />
      </Head>

      <main>
        <Container>
          <h1 className="text-2xl">George Waller</h1>
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
              <span className="btn btn-xs">Contact Me</span>
            </Link>{" "}
            page or my email:{" "}
            <Link href="mailto:george@georgewaller.com">
              <a className="link link-secondary">george@georgewaller.com</a>
            </Link>
          </p>
        </Container>
        <Container>
          <h1 className="text-xl mb-4">Recent Projects</h1>
          <div className="flex flex-wrap justify-around gap-8">
            {projects.map((project: BlogEntryWithImages) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export const getStaticProps = async () => {
  const projects = await prisma.blogEntry.findMany({
    where: { draft: false },
    orderBy: { date: "desc" },
    take: 3,
    include: {
      images: {
        where: {
          isCover: true
        }
      }
    }
  });

  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) },
    revalidate: 60,
  };
};

export default Home;
