import { ReactElement } from "react";
import NavLayout from "../../components/layouts/NavLayout";
import Head from "next/head";
import Container from "../../components/common/Container";
import useSWRInfinite from "swr/infinite";
import { fetcher, getPaginationUrl } from "../../utils/common";
import { GalleryListData } from "../api/gallery/list";
import PaginationControls from "../../components/common/PaginationControls";
import ImageGallery from "../../components/common/ImageGallery";
import {
  BlogImageOrdering,
  IMAGE_PAGINATION_COUNT,
} from "../../utils/constants";
import Loading from "../../components/common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarMinus,
  faCalendarPlus,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { useAppContext } from "../../components/context/AppContext";

interface FilterOptionProps {
  icon: IconProp;
  text: string;
  sortKey: keyof BlogImageOrdering;
}

const GalleryList = () => {
  const { sort, setSort } = useAppContext();

  const getKey = (pageIndex: number, previousPageData: GalleryListData) => {
    if (previousPageData && !previousPageData.images.length) return null;
    return `${getPaginationUrl(
      "/api/gallery/list/",
      pageIndex,
      true,
      IMAGE_PAGINATION_COUNT
    )}&order_by=${sort}`;
  };

  const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher, {
    revalidateAll: true,
  });

  let currentCount = 0;
  data?.forEach((page) => (currentCount += page.images.length));

  const images = data && data.flatMap((page) => page.images);

  const FilterOption = ({ icon, text, sortKey }: FilterOptionProps) => {
    return (
      <button
        className={classNames(
          "btn btn-sm btn-primary",
          sort === sortKey ? "btn-active" : "btn-outline"
        )}
        onClick={() => {
          setSort(sortKey);
          mutate();
        }}
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {text}
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>George Waller | Gallery</title>
        <meta
          name="description"
          content="A gallery of my fine-art images and aerial works"
        />
        <meta
          name="keywords"
          content="gallery photography images photos fine-art fineart aerial photography"
        />
      </Head>
      <main>
        <Container>
          <p className="text-md">Sort by</p>
          <div className="flex gap-2 items-center">
            <FilterOption
              icon={faFire}
              text="Popularity"
              sortKey="VIEWS_DESC"
            />
            <FilterOption
              icon={faCalendarMinus}
              text="Newest first"
              sortKey="DATE_DESC"
            />
            <FilterOption
              icon={faCalendarPlus}
              text="Oldest first"
              sortKey="DATE_ASC"
            />
          </div>
        </Container>
        <Container>
          {images ? (
            <ImageGallery images={images} linkToProject small />
          ) : (
            <Loading />
          )}
          {currentCount !== 0 && (
            <PaginationControls
              currentCount={currentCount}
              maxCount={data && data[0].totalCount}
              onClick={() => setSize(size + 1)}
            />
          )}
        </Container>
      </main>
    </>
  );
};

GalleryList.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default GalleryList;
