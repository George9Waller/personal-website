import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { AssetType } from "@prisma/client";
import axios from "axios";
import classNames from "classnames";
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateAssetData } from "../../pages/api/portal/pass/create";
import { TagData } from "../../pages/portal/pass";
import { PasswordCreateData } from "../../utils/pass";
import { useAppContext } from "../context/AppContext";
import { AssetCreateEditForm } from "./AssetCreateEditForm";
import { PasswordCreateEditForm } from "./PasswordCreateEditForm";

interface Props {
  onClose: () => void;
  refresh: () => void;
  open: boolean;
  tagOptions: TagData;
}

export const AssetCreateModal = ({
  open,
  tagOptions,
  onClose,
  refresh,
}: Props) => {
  const { userHashSalt, getUserSecurePassword } = useAppContext();
  const [type, setType] = useState<AssetType>(AssetType.password);

  const [assetDetails, setAssetDetails] = useState({
    name: "",
    tags: [] as string[],
  });

  const createAsset = async (password?: PasswordCreateData) => {
    const securePass = getUserSecurePassword();
    if (userHashSalt.hash && securePass) {
      const postData: CreateAssetData = {
        asset: {
          name: assetDetails.name,
          tags: assetDetails.tags,
          assetType: type,
        },
        password,
      };
      toast
        .promise(axios.post("/api/portal/pass/create", postData), {
          pending: `Creating ${type}`,
          success: `${type} created`,
          error: `There was an error creating your ${type}`,
        })
        .then((response) => {
          if (response.status === 201) {
            refresh();
            onClose();
          }
        });
    }
  };

  const getSubForm = () => {
    switch (type) {
      case AssetType.password:
        return (
          <PasswordCreateEditForm
            onSubmit={createAsset}
            initialValues={{
              url: "https://",
              username: "",
              email: "",
              password: "",
              additionalInfo: "",
            }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={onClose}
      PaperProps={{ style: { minWidth: "80%" } }}
      aria-labelledby="create-asset-modal-title"
    >
      <DialogTitle id="create-asset-modal-title">Create new {type}</DialogTitle>
      <DialogContent>
        <div className="btn-group w-full">
          {Object.keys(AssetType)
            .filter((assetType) => ["password"].includes(assetType))
            .map((assetType) => (
              <div
                key={assetType}
                className={classNames(
                  "btn btn-xs md:btn-sm btn-outline grow",
                  assetType === type && "btn-active"
                )}
                onClick={() => setType(assetType as AssetType)}
              >
                {assetType}
              </div>
            ))}
        </div>
        <AssetCreateEditForm
          type={type}
          initialName=""
          initialTags={[]}
          tagOptions={tagOptions}
          setAssetDetails={(name, tags) => setAssetDetails({ name, tags })}
        />
        {getSubForm()}
      </DialogContent>
    </Dialog>
  );
};
