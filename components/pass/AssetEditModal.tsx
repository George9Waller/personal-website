import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AssetType } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditAssetData } from "../../pages/api/portal/pass/edit";
import { TagData } from "../../pages/portal/pass";
import { AssetWithDetail } from "../../types/db";
import { decryptValue, PasswordCreateData } from "../../utils/pass";
import { useAppContext } from "../context/AppContext";
import { AssetCreateEditForm } from "./AssetCreateEditForm";
import { PasswordCreateEditForm } from "./PasswordCreateEditForm";

interface Props {
  asset: AssetWithDetail;
  open: boolean;
  tagOptions: TagData;
  onClose: () => void;
  refresh: () => void;
}

export const AssetEditModal = ({
  asset,
  open,
  tagOptions,
  onClose,
  refresh,
}: Props) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { getUserSecurePassword, userHashSalt } = useAppContext();
  const securePass = getUserSecurePassword() || "";

  const [assetDetails, setAssetDetails] = useState({
    name: asset.name,
    tags: asset.tags,
  });

  useEffect(() => {
    if (asset) {
      axios.get(`/api/portal/pass/access/${asset.id}`);
      refresh();
    }
  }, [asset, refresh]);

  const updateAsset = async (password?: PasswordCreateData) => {
    const securePass = getUserSecurePassword();
    if (userHashSalt.hash && securePass) {
      const postData: EditAssetData = {
        asset: {
          ...asset,
          name: assetDetails.name,
          tags: assetDetails.tags,
        },
        password:
          password && asset.password
            ? {
                ...asset.password,
                ...password,
              }
            : undefined,
      };
      toast
        .promise(axios.post("/api/portal/pass/edit", postData), {
          pending: `Updating ${assetDetails.name}`,
          success: `${assetDetails.name} updated`,
          error: `There was an error updating`,
        })
        .then((response) => {
          if (response.status === 201) {
            refresh();
            onClose();
          }
        });
    }
  };

  const deleteAsset = () => {
    toast
      .promise(axios.delete(`/api/portal/pass/delete/${asset.id}`), {
        pending: `Deleting ${assetDetails.name}`,
        success: `${assetDetails.name} deleted`,
        error: "Failed to delete",
      })
      .then((response) => {
        if (response.status === 200) {
          refresh();
          onClose();
        }
      });
  };

  const getSubForm = () => {
    switch (asset.assetType) {
      case AssetType.password:
        return (
          <PasswordCreateEditForm
            onSubmit={updateAsset}
            initialValues={{
              url: decryptValue(
                securePass,
                userHashSalt.hash,
                asset.password?.url
              ),
              username: decryptValue(
                securePass,
                userHashSalt.hash,
                asset.password?.username
              ),
              email: decryptValue(
                securePass,
                userHashSalt.hash,
                asset.password?.email
              ),
              password: decryptValue(
                securePass,
                userHashSalt.hash,
                asset.password?.passwordHash
              ),
              additionalInfo: decryptValue(
                securePass,
                userHashSalt.hash,
                asset.password?.additionalInfo
              ),
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
      PaperProps={{ style: { minWidth: "80%" } }}
    >
      <DialogTitle>Edit {asset.assetType}</DialogTitle>
      <DialogContent>
        <AssetCreateEditForm
          type={asset.assetType}
          initialName={assetDetails.name}
          initialTags={assetDetails.tags}
          tagOptions={tagOptions}
          setAssetDetails={(name, tags) => setAssetDetails({ name, tags })}
        />
        {getSubForm()}
      </DialogContent>
      <DialogActions>
        <button
          className="btn btn-error"
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </button>
        <button className="btn btn-success" onClick={onClose}>
          Close
        </button>
      </DialogActions>

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogContent>
          <p>Are you sure you want to delete {assetDetails.name}?</p>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-error" onClick={deleteAsset}>
            Delete
          </button>
          <button
            className="btn btn-success"
            onClick={() => setDeleteModalOpen(false)}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
