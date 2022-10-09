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
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { FormEvent, useEffect, useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [dominantColour, setDominantColour] = useState<
    FastAverageColorResult | undefined
  >();

  const handleClose = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    setDominantColour(undefined);
    onClose();
  };

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
                  colour: dominantColour?.value.slice(0, 3),
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
                handleClose();
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

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      return setSelectedFile(undefined);
    } else {
      return setSelectedFile(target.files[0]);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return setPreview(undefined);
    } else {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const imageOnLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fac = new FastAverageColor();
    fac
      .getColorAsync(e.currentTarget)
      .then((result) => setDominantColour(result));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            onChange={onFileChange}
          />
          {preview && (
            <>
              <img
                id="preview"
                className="mt-4"
                src={preview}
                alt=""
                onLoad={imageOnLoad}
              />{" "}
              {/* eslint-disable-line @next/next/no-img-element */}
              <div
                className="w-auto h-4 mb-4"
                style={{ backgroundColor: dominantColour?.rgb || "#ffffff" }}
              />
            </>
          )}
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
          <button
            className="btn btn-secondary modal-action"
            onClick={handleClose}
          >
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
