import classNames from "classnames";
import React, { useState } from "react";
import FlexGrid from "../common/FlexGrid";
import Loading from "../common/Loading";

function PagePagination<ItemType>(props: {
  items: ItemType[];
  getPage: (page: number) => void;
  renderChild: (item: ItemType) => React.ReactNode;
  totalPageNumber: number;
}) {
  const [pageNumber, setPageNumber] = useState(1);

  const advancePage = () => {
    props.getPage(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const decreasePage = () => {
    props.getPage(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  }

  return (
    <>
      {props.items ? (
        <>
          <FlexGrid>
            {props.items.map((item) => props.renderChild(item))}
          </FlexGrid>
          <div className="btn-group">
            <button
              className={classNames("btn", pageNumber <= 1 && "btn-disabled")}
              onClick={() => decreasePage()}
            >
              «
            </button>
            <button className="btn no-animation">
              Page {pageNumber}
              <span className="opacity-70 ml-1">
                of {props.totalPageNumber}
              </span>
            </button>
            <button
              className={classNames(
                "btn",
                pageNumber >= props.totalPageNumber && "btn-disabled"
              )}
              onClick={() => advancePage()}
            >
              »
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default PagePagination;
