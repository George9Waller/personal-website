import Head from "next/head";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { prisma } from "../prisma/db";
import Container from "../components/common/Container";
import Heading from "../components/common/Heading";
import NavLayout from "../components/layouts/NavLayout";
import { InferGetStaticPropsType } from "next";
import FlexGrid from "../components/common/FlexGrid";
import { RECENT_ITEMS_COUNT } from "../utils/constants";
import ImageGallery from "../components/common/ImageGallery";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export const Prints = ({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>George Waller | Prints</title>
      <meta
        name="description"
        content="Prints of all my images are available to purchase. We can work together
        to find something that's unique and meets your style."
      />
      <meta
        name="keywords"
        content="prints, frame, framing, images, fine-art"
      />
    </Head>

    <div>
      <Container>
        <Heading>Prints</Heading>

        <p>
          Prints of all my images are available for purchase, below are some of
          my most popular images. We can work together to find something
          that&apos;s unique and meets your style.
        </p>

        <p>
          Whether it be framed and mounted, shadowbox or just a print I&apos;m
          sure we can find something for you.
        </p>

        <p>
          I would recommend using one of my two local print shops{" "}
          <Link href="https://www.colourstream.net/" target="_blank">
            <a className="link link-secondary">
              Colourstream
              <FontAwesomeIcon icon={faExternalLink} className="ml-1" />
            </a>
          </Link>{" "}
          or{" "}
          <Link href="https://spectrumphoto.co.uk/" target="_blank">
            <a className="link link-secondary">
              Spectrum Photographic
              <FontAwesomeIcon icon={faExternalLink} className="ml-1" />
            </a>
          </Link>{" "}
          as I have have good results with them and they have a wide variety of
          formats available.
        </p>

        <p>
          If you would like more information or to make an order please use the{" "}
          <Link href="/contact-me">
            <a className="btn btn-accent btn-xs">contact me</a>
          </Link>{" "}
          page.
        </p>

        <FlexGrid className="items-stretch">
          <ImageGallery images={images} linkToProject />
        </FlexGrid>
      </Container>
    </div>
  </>
);

export const getStaticProps = async () => {
  const images = await prisma.blogImage.findMany({
    take: RECENT_ITEMS_COUNT * 2,
    orderBy: {
      views: "desc",
    },
  });

  return {
    props: {
      images: JSON.parse(JSON.stringify(images)),
    },
    revalidate: 60,
  };
};

Prints.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Prints;
