import { Modal } from "@mui/material";
import { BlogImage } from "@prisma/client";
import React, { MouseEventHandler, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { selectTranslation } from "../../utils/common";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faClose,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { useScreen, useEventListener } from "usehooks-ts";
import classNames from "classnames";

interface Props {
  images: BlogImage[];
}

export const ImageGallery = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (showLightbox) {
      if (event.keyCode === 37 && currentImage > 0) {
        return setCurrentImage(currentImage - 1);
      } else if (event.keyCode === 39 && currentImage < images.length - 1) {
        return setCurrentImage(currentImage + 1);
      }
    }
  };

  const getCarouselButtons = ({
    onClick,
    next,
    className,
    style,
    prev,
  }: {
    onClick: any;
    className: string;
    style: React.CSSProperties;
    next: boolean;
    prev: boolean;
  }) => {
    return (
      <div className="h-full flex items-center">
        <button
          className={classNames("btn btn-primary", className)}
          style={style}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={next ? faAngleRight : faAngleLeft} />
        </button>
      </div>
    );
  };

  const screen = useScreen();
  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-8">
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <GalleryPhoto
            key={image.id}
            image={image}
            openLightbox={() => openLightbox(index)}
          />
        ))}
      </div>
      <Modal
        open={showLightbox}
        onClose={() => setShowLightbox(false)}
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
                  close={() => setShowLightbox(false)}
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
}

const GalleryPhoto = ({ image, openLightbox }: LightboxPhotoProps) => {
  return (
    <div className="gallery-photo flex flex-col justify-center">
      <div
        className="bg-neutral flex flex-col justify-between"
        onClick={openLightbox}
      >
        <Image
          src={image.imageUrl}
          width={image.width}
          height={image.height}
          alt={selectTranslation(image.altText)}
        />
        <div className="text-neutral-content py-1 px-3 flex justify-between items-center">
          <p>{selectTranslation(image.title)}</p>
          <FontAwesomeIcon className="hover:text-accent" icon={faExpand} />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
