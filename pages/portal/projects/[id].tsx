import React, { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Container from "../../../components/common/Container";
import FlexGrid from "../../../components/common/FlexGrid";
import NavLayout from "../../../components/layouts/NavLayout";
import {
  fetcher,
  maybeSelectTranslation,
  selectTranslation,
} from "../../../utils/common";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../../components/common/Loading";
import { MeData } from "../../api/user/me";
import { useRouter } from "next/router";
import {
  AdminProjectsListData,
  ProjectAdminDetails,
} from "../../api/portal/projects/list";
import { checkUser } from "../../../utils/portal";
import { useSWRLoading, useUser } from "../../../utils/hooks";
import Error from "../../../components/common/Error";
import { BlogEntryWithImages, LanguageOptionsJson } from "../../../types/db";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import LanguageInputs from "../../../components/forms/LanguageInputs";
import MultipleSelectCheckboxes from "../../../components/common/MultipleSelectCheckboxes";
import { ProjectCategories, sortImagesByTitle } from "../../../utils/projects";
import axios from "axios";
import { BlogEntryUpdateData } from "../../api/portal/projects/[id]";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import BlogImageEditModal from "../../../components/modals/BlogImageEditModal";
import { BlogImage } from "@prisma/client";
import BlogImageCreateModal from "../../../components/modals/BlogImageCreateModal";

interface ResponseData {
  data: { project: BlogEntryWithImages };
  isLoading: boolean;
  isError: boolean;
}

export const ProjectsAdminEdit = () => {
  const router = useRouter();
  const { promiseInProgress } = usePromiseTracker();
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<BlogImage[]>([]);
  const [imageToDelete, setImageToDelete] = useState<BlogImage | undefined>(
    undefined
  );
  const [imageToEdit, setImageToEdit] = useState<BlogImage | undefined>(
    undefined
  );
  const [createImageOpen, setCreateImageOpen] = useState<boolean>(false);

  const { user, userIsLoading } = useUser();
  !userIsLoading && !user.isAdmin && router.replace("/portal/");

  const { data, isLoading, isError }: ResponseData = useSWRLoading(
    router.query && `/api/projects/${router.query["id"]}`
  );

  useEffect(() => {
    if (data?.project) {
      setCategories(data?.project.category);
      setImages(data?.project.images);
    }
  }, [data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      "title-en": { value: string };
      "title-fr": { value: string };
      "short-description-en": { value: string };
      "short-description-fr": { value: string };
      "content-en": { value: string };
      "content-fr": { value: string };
      draft: { checked: boolean };
    };
    axios
      .patch(`/api/portal/projects/${router.query["id"]}`, {
        "title-en": target["title-en"].value,
        "title-fr": target["title-fr"].value,
        "short-description-en": target["short-description-en"].value,
        "short-description-fr": target["short-description-fr"].value,
        "content-en": target["content-en"].value,
        "content-fr": target["content-fr"].value,
        draft: target.draft.checked,
        categories,
      } as BlogEntryUpdateData)
      .then(() => {
        toast.success("Updated successfully");
        router.push(`/portal/projects/${router.query["id"]}`);
      })
      .catch(() => {
        toast.error("There was an error saving changes");
      });
  };

  const session = useSession();
  console.log(session);

  const getContent = () => {
    if (promiseInProgress) {
      return <Loading />;
    } else if (isError) {
      return <Error />;
    } else if (data?.project) {
      const project = data.project;
      return (
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <LanguageInputs sourceJSON={project.title} fieldKey="title" />
            <LanguageInputs
              sourceJSON={project.shortDescription}
              fieldKey="short-description"
              multiline
            />
            <LanguageInputs
              sourceJSON={project.content}
              fieldKey="content"
              multiline
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox name="draft" defaultChecked={project.draft} />
                }
                label="draft"
              />
            </FormGroup>
            <FormGroup>
              <MultipleSelectCheckboxes
                options={Object.values(ProjectCategories)}
                selection={categories}
                setSelection={setCategories}
                label="categories"
              />
            </FormGroup>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
          <p className="text-xl">Images</p>
          <div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-2 gap-2">
            {images &&
              sortImagesByTitle(images).map((image: BlogImage) => (
                <div
                  key={image.id}
                  className="flex flex-row justify-between gap-2 p-2 bg-base-300 rounded items-center"
                >
                  <div className="flex flex-row items-center">
                    {selectTranslation(image.title)}
                    {image.isCover && (
                      <div className="badge badge-accent badge-sm ml-2">
                        Cover
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-1">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setImageToEdit(image)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="btn btn-sm btn-error">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => setImageToDelete(image)}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-row items-center justify-center"><button className="btn btn-accent btn-sm" onClick={() => setCreateImageOpen(true)}>Create new image</button></div>
          </div>
          <ConfirmDeleteModal
            open={Boolean(imageToDelete)}
            itemDescription={`the image "${maybeSelectTranslation(
              imageToDelete?.title
            )}"`}
            onClose={() => setImageToDelete(undefined)}
            onDelete={() => console.log("delete")}
          />
          <BlogImageEditModal
            open={Boolean(imageToEdit)}
            image={imageToEdit}
            onClose={() => setImageToEdit(undefined)}
            setUpdatedObject={(image: BlogImage) => {
              setImages([
                ...images.filter(
                  (existingImage) => existingImage.id !== image.id
                ),
                image,
              ]);
            }}
          />
          <BlogImageCreateModal
            open={createImageOpen}
            blogEntryId={project.id}
            onClose={() => setCreateImageOpen(false)}
            setCreatedObject={(image: BlogImage) => setImages([...images, image])}
          />
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>George Waller | Projects Admin</title>
      </Head>
      <Container>{getContent()}</Container>
    </>
  );
};

ProjectsAdminEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default ProjectsAdminEdit;
