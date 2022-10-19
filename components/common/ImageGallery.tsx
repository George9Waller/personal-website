import { Modal } from "@mui/material";
import { BlogImage } from "@prisma/client";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { selectTranslation } from "../../utils/common";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faClose,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { useScreen, useEventListener } from "usehooks-ts";
import classNames from "classnames";
import { sortImagesByTitle } from "../../utils/projects";
import axios from "axios";
import Link from "next/link";

interface Props {
  images: BlogImage[];
  sortByTitle?: boolean;
  linkToProject?: boolean;
  small?: boolean;
}

export const ImageGallery = ({ images, sortByTitle, linkToProject, small = false }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentImageTimeout, setCurrentImageTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [showLightbox, setShowLightbox] = useState(false);

  const rateImage = async (index: number) => {
    const image = images[index];
    await axios.get(`/api/projects/view/image/${image.id}`);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    currentImageTimeout && clearTimeout(currentImageTimeout);
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
    return setCurrentImageTimeout(setTimeout(rateImage, 3000, index));
  };

  const nextImage = () => {
    currentImageTimeout && clearTimeout(currentImageTimeout);
    if (showLightbox && currentImage < images.length - 1) {
      const index = currentImage + 1;
      setCurrentImage(index);
      return setCurrentImageTimeout(setTimeout(rateImage, 3000, index));
    }
  };

  const previousImage = () => {
    currentImageTimeout && clearTimeout(currentImageTimeout);
    if (showLightbox && currentImage > 0) {
      const index = currentImage - 1;
      setCurrentImage(index);
      return setCurrentImageTimeout(setTimeout(rateImage, 3000, index));
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (showLightbox) {
      if (event.keyCode === 37) {
        previousImage();
      } else if (event.keyCode === 39) {
        nextImage();
      }
    }
  };

  const getCarouselButtons = ({
    next,
    className,
    style,
  }: {
    onClick: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    className: string;
    style: React.CSSProperties;
    next: boolean;
  }) => {
    return (
      <div className="h-full flex items-center">
        <button
          className={classNames("btn btn-primary", className)}
          style={style}
          onClick={() => {
            next ? nextImage() : previousImage();
          }}
        >
          <FontAwesomeIcon icon={next ? faAngleRight : faAngleLeft} />
        </button>
      </div>
    );
  };

  const screen = useScreen();
  useEventListener("keydown", onKeyDown);

  const sortedImages = sortByTitle ? sortImagesByTitle(images) : images;

  return (
    <div className="pt-8">
      <div className={classNames("grid gap-4", small ? "md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2" : "grid-cols-3")}>
        {sortedImages.map((image, index) => (
          <GalleryPhoto
            key={image.id}
            image={image}
            openLightbox={() => openLightbox(index)}
            linkToProject={linkToProject}
          />
        ))}
      </div>
      <Modal
        open={showLightbox}
        onClose={() => closeLightbox()}
        keepMounted
        className="bg-neutral"
      >
        <div>
          <Carousel
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            height={screen && screen.height - 300}
            index={currentImage}
            NavButton={getCarouselButtons}
          >
            {images.map((image) => (
              <div key={image.id} className="w-full h-full">
                <Header
                  currentIndex={currentImage}
                  images={images}
                  close={() => closeLightbox()}
                />
                <div
                  className="relative"
                  style={{ height: "calc(100% - 48px)" }}
                >
                  <Image
                    src={image.imageUrl}
                    alt={selectTranslation(image.altText)}
                    layout="fill"
                    objectFit="contain"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>
    </div>
  );
};

interface HeaderProps {
  currentIndex: number;
  images: BlogImage[];
  close: () => void;
}

const Header = ({ currentIndex, images, close }: HeaderProps) => (
  <div className="bg-neutral-content mx-auto">
    <div className="max-w-screen-md flex row justify-between mx-auto px-8 py-2">
      <p className="text-neutral">
        {selectTranslation(images[currentIndex].title)}
      </p>
      <button
        className="btn btn-square btn-accent btn-sm float-right"
        onClick={close}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  </div>
);

interface LightboxPhotoProps {
  image: BlogImage;
  openLightbox: () => void;
  linkToProject?: boolean;
}

const GalleryPhoto = ({
  image,
  openLightbox,
  linkToProject,
}: LightboxPhotoProps) => {
  return (
    <div className="gallery-photo flex flex-col justify-center">
      <div className="bg-neutral h-full flex flex-col justify-between">
        <div className="image h-full flex items-center" onClick={openLightbox}>
          <Image
            src={image.imageUrl}
            width={image.width}
            height={image.height}
            alt={selectTranslation(image.altText)}
            objectFit="contain"
          />
        </div>
        <div className="text-neutral-content py-1 px-3 flex justify-between items-center">
          <p>{selectTranslation(image.title)}</p>
          <div className="flex items-center">
            <FontAwesomeIcon
              className="hover:text-accent"
              icon={faExpand}
              onClick={openLightbox}
            />
            {linkToProject && (
              <div className="view-detail">
                <Link href={`/projects/${image.blogEntryId}`}>
                  <a className="ml-2">
                    <FontAwesomeIcon
                      className="hover:text-accent"
                      icon={faArrowRight}
                    />
                    <span className="info">View Project</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
