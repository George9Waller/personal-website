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
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import {
  BlogImageUpdateData,
  BlogImageUpdateResponse,
} from "../../pages/api/portal/projects/images/[id]";
import { arrayToHex, maybeSelectTranslation } from "../../utils/common";
import Loading from "../common/Loading";
import LanguageInputs from "../forms/LanguageInputs";

interface Props {
  open: boolean;
  image?: BlogImage;
  onClose: () => void;
  setUpdatedObject: (image: BlogImage) => void;
}

export const BlogImageEditModal = ({
  open,
  image,
  onClose,
  setUpdatedObject,
}: Props) => {
  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = toast.loading("Saving changes");
    const target = event.target as typeof event.target & {
      "title-en": { value: string };
      "title-fr": { value: string };
      "alt-en": { value: string };
      "alt-fr": { value: string };
      cover: { checked: boolean };
    };

    if (image) {
      const fac = new FastAverageColor();
      const preview = document.getElementById("preview") as HTMLImageElement;
      fac.getColorAsync(preview).then((result) => {
        axios
          .patch<unknown, { data: BlogImageUpdateResponse }>(
            `/api/portal/projects/images/${image.id}`,
            {
              "title-en": target["title-en"].value,
              "title-fr": target["title-fr"].value,
              "alt-en": target["alt-en"].value,
              "alt-fr": target["alt-fr"].value,
              cover: target.cover.checked,
              colour: result.value.slice(0, 3),
            } as BlogImageUpdateData
          )
          .then((response) => {
            toast.update(id, {
              render: "Successfully saved changes",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            response.data.image && setUpdatedObject(response.data.image);
            onClose();
          })
          .catch(() => {
            toast.update(id, {
              render: "An error occurred saving changes",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          });
      });
    }
  };

  const dominantColour = arrayToHex(image?.colour || []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-blog-image-modal-title"
    >
      {image ? (
        <>
          <DialogTitle id="edit-blog-image-modal-title">
            Edit image {maybeSelectTranslation(image.title)}
          </DialogTitle>
          <form onSubmit={handleSave}>
            <DialogContent>
              <Image
                src={image.imageUrl}
                height={image.height}
                width={image.width}
                alt={maybeSelectTranslation(image.altText)}
                objectFit="contain"
                id="preview"
              />

              <LanguageInputs sourceJSON={image.title} fieldKey="title" />
              <LanguageInputs sourceJSON={image.altText} fieldKey="alt" />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox name="cover" defaultChecked={image.isCover} />
                  }
                  label="cover"
                />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <div
                className=" mr-4 px-1 h-auto modal-action"
                style={{ backgroundColor: dominantColour }}
              >
                {dominantColour}
              </div>
              <p className="mr-4 modal-action">Views: {image.views}</p>
              <button
                className="btn btn-secondary modal-action"
                onClick={onClose}
              >
                Close
              </button>
              <button className="btn btn-primary modal-action" type="submit">
                Save
              </button>
            </DialogActions>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </Dialog>
  );
};

export default BlogImageEditModal;
