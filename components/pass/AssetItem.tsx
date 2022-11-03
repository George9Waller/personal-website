import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TagData } from "../../pages/portal/pass";
import { AssetWithDetail } from "../../types/db";
import { decryptValue } from "../../utils/pass";
import { useAppContext } from "../context/AppContext";

interface Props {
  asset: AssetWithDetail;
  tagOptions: TagData;
  onClick: () => void;
}

export const AssetItem = ({ asset, tagOptions, onClick }: Props) => {
  const { getUserSecurePassword, userHashSalt } = useAppContext();
  const [image, setImage] = useState<boolean>(false);

  const securePass = getUserSecurePassword();
  const itemUrlHash = asset.password?.url || asset.link?.url;
  const itemUrl =
    itemUrlHash &&
    securePass &&
    decryptValue(securePass, userHashSalt.hash, itemUrlHash);
  const imgUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${itemUrl}&size=64`;

  useEffect(() => {
    itemUrl &&
      fetch(new Request(imgUrl, { method: "HEAD", mode: "no-cors" }))
        .then((image) => {
          image && setImage(true);
        })
        .catch();
  }, [itemUrl, imgUrl]);

  return (
    <div
      className="bg-base-300 p-4 rounded-lg hover:bg-accent transition cursor-pointer flex flex-col gap-2"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex items-center">
          {image ? (
            <div className="w-8 shrink-0">
              <Image
                src={imgUrl}
                height={32}
                width={32}
                style={{ width: 32 }}
                objectFit="cover"
                alt={`${asset.name} logo`}
              />
            </div>
          ) : (
            <div className="h-8 w-8 bg-secondary">{asset.name.slice(0, 1)}</div>
          )}
          <div className="ml-2">{asset.name}</div>
        </div>
        <FontAwesomeIcon icon={faKey} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1 flex gap-1">
        {asset.tags.map((tag, index) => {
          const tagData = tagOptions.find((tagOption) => tagOption[0] === tag);
          return (
            <div
              className="badge badge-outline grow"
              key={index}
              style={{ borderColor: tagData ? tagData[2] : "black" }}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
