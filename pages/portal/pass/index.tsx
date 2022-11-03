import { faAdd, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Error from "../../../components/common/Error";
import Loading from "../../../components/common/Loading";
import PaginationControls from "../../../components/common/PaginationControls";
import { useAppContext } from "../../../components/context/AppContext";
import { AssetCreateModal } from "../../../components/pass/AssetCreateModal";
import { AssetEditModal } from "../../../components/pass/AssetEditModal";
import { AssetItem } from "../../../components/pass/AssetItem";
import { SecurePasswordLoginModal } from "../../../components/pass/SecurePasswordLoginModal";
import { AssetWithDetail } from "../../../types/db";
import { getPaginationUrl } from "../../../utils/common";
import { useSWRInfiniteLoading, useSWRLoading } from "../../../utils/hooks";
import { PasswordListData } from "../../api/portal/pass/list";

export type TagData = [string, number, string][];

export const PasswordManager = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [assetInEdit, setAssetInEdit] = useState<AssetWithDetail>();
  const [securePassModalOpen, setSecurePassModalOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { getUserSecurePassword } = useAppContext();
  const { mutate: globalMutate } = useSWRConfig();

  const securePass = getUserSecurePassword();

  useEffect(() => {
    !securePass && setSecurePassModalOpen(true);
    securePass && setSecurePassModalOpen(false);
  }, [securePass]);

  const tagsFetch = useSWRLoading("/api/portal/pass/tags", true);
  const tags: TagData = tagsFetch.data?.tags || [];

  useEffect(() => {
    globalMutate("/api/portal/pass/tags");
  }, [assetInEdit, globalMutate]);

  const getKey = (pageIndex: number, previousPageData: PasswordListData) => {
    if (previousPageData && !previousPageData.assets.length) return null;
    return `${getPaginationUrl(
      "/api/portal/pass/list/",
      pageIndex,
      true,
      search,
      36
    )}${selectedTags.map((tag) => `&tag=${tag}`).join("")}`;
  };

  const { data, isError, isLoading, size, setSize, mutate } =
    useSWRInfiniteLoading(getKey);
  let currentCount = 0;
  data?.forEach((page) => (currentCount += page.assets.length));

  const handleTagClick = (tagName: string) => {
    selectedTags.includes(tagName)
      ? setSelectedTags(
          selectedTags.filter((selectedTag) => selectedTag !== tagName)
        )
      : setSelectedTags(selectedTags.concat([tagName]));
  };

  return (
    <>
      <Head>
        <title>Password Manager</title>
        <meta
          name="description"
          content="A simple password managing app with tags"
        />
      </Head>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <main className="bg-none overflow-hidden">
            <div className="navbar bg-base-100">
              <div className="navbar-start max-w-xs">
                <div className="indicator">
                  {selectedTags.length > 0 && (
                    <span className="indicator-item indicator-middle indicator-end badge badge-secondary badge-outline">
                      {selectedTags.length}
                    </span>
                  )}

                  <label
                    htmlFor="my-drawer"
                    className="btn btn-ghost btn-circle"
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </label>
                </div>
              </div>
              <div className="navbar-center grow">
                <div className="form-control w-full">
                  <div className="input-group">
                    <input
                      className="input input-bordered w-32 sm:w-full"
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <a
                      className="btn btn-outline"
                      onClick={() => setSearch("")}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="navbar-end max-w-xs">
                <button
                  className="btn btn-outline btn-info btn-circle"
                  onClick={() => setCreateModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
                <Link href="/portal/">
                  <button className="ml-2 btn btn-outline btn-error btn-circle">
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </Link>
              </div>
            </div>
            <div>
              {isLoading && <Loading />}
              {isError && <Error />}
              {data && securePass && (
                <div className="flex flex-col items-center bg-white">
                  <div className="bg-base-100 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                    {data.map((page) => {
                      return page.assets.map((asset: AssetWithDetail) => (
                        <AssetItem
                          key={asset.id}
                          asset={asset}
                          onClick={() => setAssetInEdit(asset)}
                          tagOptions={tags}
                        />
                      ));
                    })}
                  </div>
                  <PaginationControls
                    currentCount={currentCount}
                    maxCount={data && data[0].totalCount}
                    onClick={() => setSize(size + 1)}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 overflow-y-auto w-96 bg-base-100 text-base-content">
            <label htmlFor="my-drawer" className="btn btn-outline btn-circle">
              <FontAwesomeIcon icon={faClose} />
            </label>
            <h1 className="text-xl font-medium my-4">Tags</h1>
            <div className="flex flex-wrap gap-2">
              {tags.map(([tagName, tagCount, tagColour], index) => (
                <div
                  key={index}
                  className={classNames(
                    "badge badge-lg grow flex items-center cursor-pointer",
                    selectedTags.includes(tagName) ? "" : "badge-outline"
                  )}
                  style={{
                    borderColor: tagColour,
                    backgroundColor: selectedTags.includes(tagName)
                      ? tagColour
                      : "initial",
                  }}
                  onClick={() => handleTagClick(tagName)}
                >
                  <span>{tagName}</span>
                  <span className="ml-2 text-sm">{tagCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SecurePasswordLoginModal
        open={securePassModalOpen}
        onClose={() => securePass && setSecurePassModalOpen(false)}
      />
      <AssetCreateModal
        refresh={mutate}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        tagOptions={tags}
      />
      {assetInEdit && (
        <AssetEditModal
          open={Boolean(assetInEdit)}
          onClose={() => setAssetInEdit(undefined)}
          refresh={mutate}
          asset={assetInEdit}
          tagOptions={tags}
        />
      )}
    </>
  );
};

PasswordManager.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default PasswordManager;
