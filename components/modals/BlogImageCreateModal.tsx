import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { BlogImage } from "@prisma/client";
import axios from "axios";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { UploadFileUrlResponse } from "../../pages/api/portal/aws/upload-file";
import {
  BlogImageCreateData,
  BlogImageCreateResponse,
} from "../../pages/api/portal/projects/images/create";
import LanguageInputs from "../forms/LanguageInputs";

interface Props {
  open: boolean;
  blogEntryId: number;
  onClose: () => void;
  setCreatedObject: (image: BlogImage) => void;
}

export const BlogImageCreateModal = ({
  open,
  blogEntryId,
  onClose,
  setCreatedObject,
}: Props) => {
  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = toast.loading("Saving changes");
    const target = event.target as typeof event.target & {
      file: HTMLInputElement;
      "title-en": { value: string };
      "title-fr": { value: string };
      "alt-en": { value: string };
      "alt-fr": { value: string };
      cover: { checked: boolean };
    };

    let file: File | undefined;

    if (!target.file.files || !target.file.files.length) {
      return;
    } else {
      file = target.file.files[0];
    }
    const fullFileName = `media/${blogEntryId}/${file.name}`;
    let awsBaseUrl: string | undefined;

    axios
      .post<unknown, { data: UploadFileUrlResponse }>(
        "/api/portal/aws/upload-file",
        { name: fullFileName, type: file.type }
      )
      .then((response) => {
        awsBaseUrl = response.data.awsBaseUrl;
        axios
          .put(response.data.url || "", file, {
            headers: {
              "Content-type": file?.type || "",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(() => {
            let width = 500;
            let height = 500;
            if (target.file.files?.length) {
              const image = new Image();
              image.src = window.URL.createObjectURL(target.file.files[0]);
              image.onload = () => {
                width = image.width;
                height = image.height;
              };
            }

            axios
              .post<unknown, { data: BlogImageCreateResponse }>(
                "/api/portal/projects/images/create",
                {
                  blogEntryId,
                  "title-en": target["title-en"].value,
                  "title-fr": target["title-fr"].value,
                  "alt-en": target["alt-en"].value,
                  "alt-fr": target["alt-fr"].value,
                  cover: target.cover.checked,
                  s3ImageUrl: `${awsBaseUrl}${fullFileName}`,
                  width,
                  height,
                } as BlogImageCreateData
              )
              .then((response) => {
                toast.update(id, {
                  render: "Successfully created",
                  type: "success",
                  isLoading: false,
                  autoClose: 5000,
                });
                response.data.image && setCreatedObject(response.data.image);
                (
                  document.getElementById(
                    "blog-image-create-form"
                  ) as HTMLFormElement
                ).reset();
                onClose();
              });
          });
      })
      .catch(() => {
        toast.update(id, {
          render: "An error occurred creating this image",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      PaperProps={{ style: { minWidth: "80%" } }}
      aria-labelledby="create-blog-image-modal-title"
    >
      <DialogTitle id="create-blog-image-modal-title">
        Create new image
      </DialogTitle>
      <form onSubmit={handleSave} id="blog-image-create-form">
        <DialogContent>
          <input
            id="file"
            className="input"
            type="file"
            accept="image/*"
            required
          />
          <LanguageInputs sourceJSON={{}} fieldKey="title" />
          <LanguageInputs sourceJSON={{}} fieldKey="alt" />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="cover" />}
              label="cover"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-secondary modal-action" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary modal-action" type="submit">
            Create
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BlogImageCreateModal;
