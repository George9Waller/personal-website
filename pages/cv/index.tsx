import {
  faGithub,
  faHtml5,
  faJs,
  faLinkedin,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAt,
  faLanguage,
  faLocationDot,
  faMortarBoard,
  faPersonBiking,
  faPhone,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ReactElement } from "react";
import { prisma } from "../../prisma/db";
import { ProjectCategories } from "../../utils/projects";
import Container from "../../components/common/Container";
import Divider from "../../components/common/Divider";
import ExternalLink from "../../components/common/ExternalLink";
import FlexGrid from "../../components/common/FlexGrid";
import Heading from "../../components/common/Heading";
import SubHeading from "../../components/common/SubHeading";
import CvExperience from "../../components/cv/CvExperience";
import CvSection from "../../components/cv/CvSection";
import CvSkill from "../../components/cv/CvSkill";
import CvStat from "../../components/cv/CvStat";
import NavLayout from "../../components/layouts/NavLayout";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  RECENT_ITEMS_COUNT,
} from "../../utils/constants";
import { InferGetStaticPropsType } from "next";
import { BlogEntryWithImages } from "../../types/db";
import ProjectCard from "../../components/projects/ProjectCard";
import Head from "next/head";
import ContactMethods from "../../components/common/ContactMethods";

const CV = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>George Waller | CV</title>
        <meta name="description" content="My CV, experience and education" />
      </Head>
      <Container>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 lg:col-span-2">
            <Heading className="">George Waller</Heading>
            <SubHeading className="mt-2 font-thin text-primary">
              Web Developer
            </SubHeading>
            <CvSection title="About">
              <p>
                I am a python web developer and a computer science enthusiast
                with skills in full stack python web development. During the
                lockdown I developed my skills in coding due to my extra time
                and would consider myself to be able to code at a professional
                standard and I am now employed as a web developer. I regard
                myself as language ambivalent and I enjoy exploring new
                technologies.
              </p>
            </CvSection>
            <Divider />
            <CvSection title="Experience">
              <FlexGrid>
                <CvExperience
                  title="Dabapps"
                  icon={faTerminal}
                  fromDate={new Date("2021-07-05")}
                  link={{
                    href: "https://dabapps.com",
                    displayText: "Dabapps Website",
                  }}
                  description="I worked as a web developer using a Django React stack deploying to Heroku. As an agency business I worked on a variety of different projects helping me to build a range of skill across the apps I worked on."
                  roles={[
                    {
                      fromDate: new Date("2022-07-05"),
                      title: "Engineer",
                      children: (
                        <>
                          <p>
                            I led the development of new features across a range
                            of projects including:
                          </p>
                          <ul>
                            <li>
                              Integrating Stripe payment collection for a new
                              feature
                            </li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      fromDate: new Date("2021-07-05"),
                      toDate: new Date("2022-07-05"),
                      title: "Associate Engineer",
                      children: (
                        <>
                          <p>
                            I worked on building and maintaining client projects
                            as a full stack developer responsible for:
                          </p>
                          <ul>
                            <li>
                              Being part of a team upgrading and improving an
                              ageing code base
                            </li>
                            <li>
                              Building the API for a new behaviour tracking
                              feature
                            </li>
                            <li>
                              Implementing internationalisation for Arabic on a
                              big project
                            </li>
                          </ul>
                        </>
                      ),
                    },
                  ]}
                />
                <CvExperience
                  icon={faPersonBiking}
                  fromDate={new Date("2021-02-01")}
                  toDate={new Date("2021-07-01")}
                  roles={[
                    {
                      fromDate: new Date("2021-07-05"),
                      toDate: new Date("2022-07-05"),
                      title: "Food Delivery Rider",
                      children: (
                        <p>
                          I worked delivering takeaways for Deliveroo and Uber
                          Eats in my free time. This helped me to improve my
                          time management and customer service while working
                          under pressure.
                        </p>
                      ),
                    },
                  ]}
                />
              </FlexGrid>
            </CvSection>
            <Divider />
            <CvSection title="Education">
              <FlexGrid>
                <CvExperience
                  icon={faMortarBoard}
                  fromDate={new Date("2021-09-01")}
                  toDate={new Date("2022-07-01")}
                  roles={[
                    {
                      fromDate: new Date("2021-09-01"),
                      toDate: new Date("2022-07-01"),
                      title: "University of Chichester | Software Engineering",
                      children: (
                        <p>
                          I started a degree in Digital and Technology Solutions
                          (Software Engineering) but after 1 year did not feel
                          that this was the course for me. I was not enjoying
                          the style of learning and wanted to focus on more
                          practical methods. Instead I have chosen to do some
                          more specific courses in areas of interest to
                          supplement my skills in the workplace.
                        </p>
                      ),
                    },
                  ]}
                  link={{
                    href: "https://www.chi.ac.uk/degree-apprenticeships/course/digital-and-technology-solutions-professional-software-engineer-degree-apprenticeship/",
                    displayText:
                      "Digital and Technology Solutions at the University of Chichester",
                  }}
                />
                <CvExperience
                  title="Brighton College"
                  icon={faMortarBoard}
                  fromDate={new Date("2019-09-01")}
                  toDate={new Date("2021-06-01")}
                  roles={[
                    {
                      fromDate: new Date("2019-09-01"),
                      toDate: new Date("2021-06-01"),
                      title: "A Levels",
                      children: (
                        <p>
                          I studied 3 A-Levels in Computer Science, Photography
                          and Theatre Studies achieving A*A*A* at the UK’s
                          independent school of the decade.
                        </p>
                      ),
                    },
                    {
                      fromDate: new Date("2016-09-01"),
                      toDate: new Date("2019-06-01"),
                      title: "GCSEs",
                      children: (
                        <p>
                          I achieved 4x9s, 2x8s, 1xA*, 1xA, 2x6s in French,
                          Chemistry, Physics, Maths, Biology, Spanish, Computer
                          Science, Further Maths, English Language, English
                          Literature.
                        </p>
                      ),
                    },
                  ]}
                  link={{
                    href: "https://www.brightoncollege.org.uk/",
                    displayText: "Brighton College",
                  }}
                />
              </FlexGrid>
            </CvSection>
          </div>
          <div className="col-span-3 lg:col-span-1 rounded grid grid-cols-3 lg:grid-cols-1 gap-8 items-center auto-rows-max justify-center bg-gradient-to-r lg:bg-gradient-to-b from-green-400 to-blue-500 px-4 p-4 lg:py-12 text-gray-100">
            <div className="avatar mx-auto">
              <div className="w-48 rounded">
                <Image
                  src="https://georgewaller.s3.amazonaws.com/media/IMG_20211008_000309_08611.jpg"
                  width={200}
                  height={200}
                  alt="Headshot of George Waller"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mx-auto">
              <CvStat icon={faLocationDot}>
                <ExternalLink
                  href="https://goo.gl/maps/UcSYxgsGvgzCpvef8"
                  displayText="Brighton, UK"
                  className="link-hover"
                />
              </CvStat>
              <ContactMethods />
              <CvStat icon={faGithub}>
                <ExternalLink
                  href={GITHUB_URL}
                  displayText="George9Waller"
                  className="link-hover"
                />
              </CvStat>
              <CvStat icon={faLinkedin}>
                <ExternalLink
                  href={LINKEDIN_URL}
                  displayText="George Waller"
                  className="link-hover"
                />
              </CvStat>
              <CvStat icon={faLanguage}>
                <div className="flex flex-col">
                  <span>English | Native</span>
                  <span>French | Conversational</span>
                </div>
              </CvStat>
            </div>
            <div className="mx-auto">
              <SubHeading className="text-center mb-2">Skills</SubHeading>
              <div className="flex flex-wrap gap-2 justify-evenly">
                <CvSkill icon={faPython} name="Python" />
                <CvSkill icon={faJs} name="Javascript" />
                <CvSkill name="Typescript" />
                <CvSkill icon={faHtml5} name="HTML" />
                <CvSkill name="CSS" />
                <CvSkill name="Heroku" />
                <CvSkill name="React" />
                <CvSkill name="Django" />
                <CvSkill name="REST APIs" />
                <CvSkill name="Internationalisation" />
                <CvSkill name="Tailwind" />
                <CvSkill name="NextJS" />
                <CvSkill name="Version Control" />
                <CvSkill name="Responsive Design" />
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <CvSection title="Recent coding projects">
          <FlexGrid>
            {projects.map((project: BlogEntryWithImages) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </FlexGrid>
        </CvSection>
      </Container>
    </>
  );
};

CV.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export const getStaticProps = async () => {
  const projects = await prisma.blogEntry.findMany({
    where: { draft: false, archieved: false, category: { has: ProjectCategories.CODING } },
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

export default CV;
