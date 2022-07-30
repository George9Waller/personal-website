import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "../../../components/common/Container";
import FlexGrid from "../../../components/common/FlexGrid";
import NavLayout from "../../../components/layouts/NavLayout";
import {
  getPaginationUrl,
  maybeSelectTranslation,
  selectTranslation,
} from "../../../utils/common";
import { useRouter } from "next/router";
import { ProjectAdminDetails } from "../../api/portal/projects/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getProjectDate } from "../../../utils/projects";
import { checkUser } from "../../../utils/portal";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import PagePagination from "../../../components/pagination/PagePagination";
import { useSWRLoading } from "../../../utils/hooks";
import { useSWRConfig } from "swr";
import { BlogEntryWithImages } from "../../../types/db";
import { PAGINATION_COUNT } from "../../../utils/constants";
import Error from "../../../components/common/Error";

export const ProjectsAdmin = () => {
  const baseUrl = "/api/portal/projects/list/";
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [dataUrl, setDataUrl] = useState(getPaginationUrl(baseUrl));
  const [projectToDelete, setProjectToDelete] = useState(-1);

  const { data, isError } = useSWRLoading(dataUrl, true);

  useEffect(() => {
    checkUser("isAdmin", () => {
      router.replace("/portal/");
    });
  }, [router]);

  const handleCreateNewProject = () => {
    toast
      .promise(axios.post("/api/portal/projects/create", {}), {
        pending: "Creating new project",
        success: "Project created",
        error: "There was an error creating a new project",
      })
      .then((response) => {
        router.push(`/portal/projects/${response.data.id}`);
      });
  };

  const handleDelete = () => {
    const id = toast.loading("Deleting project");
    axios
      .delete(`/api/portal/projects/${projectToDelete}`)
      .then(() => {
        mutate(dataUrl);
        closeModal();
        return toast.update(id, {
          render: "Project deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch(() => {
        closeModal();
        return toast.update(id, {
          render: "An error occurred deleting the project",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  const closeModal = () => setProjectToDelete(-1);

  return (
    <>
      <Head>
        <title>George Waller | Projects Admin</title>
      </Head>
      <Container>
        <FlexGrid>
          <div className="flex flex-row-reverse w-full">
            <button
              className="btn btn-sm btn-success"
              onClick={handleCreateNewProject}
            >
              Create new project
            </button>
          </div>
          {isError && <Error />}

          <PagePagination<ProjectAdminDetails>
            items={data?.projects}
            getPage={(page) => setDataUrl(getPaginationUrl(baseUrl, page))}
            totalPageNumber={Math.ceil(data?.totalCount / PAGINATION_COUNT)}
            renderChild={(project) => (
              <div
                key={project.id}
                className="w-full flex flex-row justify-between items-center gap-2 bg-base-300 p-4 rounded"
              >
                <div>
                  <div className="flex flex-row items-center gap-2">
                    {project.draft && (
                      <div className="badge badge-accent badge-sm">draft</div>
                    )}
                    <p>{selectTranslation(project.title)}</p>
                  </div>
                  <small>{getProjectDate(project.date)}</small>
                </div>
                <div className="flex flex-row gap-2">
                  <Link href={`/projects/${project.id}`}>
                    <a className="btn btn-primary">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </Link>
                  <Link href={`/portal/projects/${project.id}`}>
                    <a className="btn btn-secondary">
                      <FontAwesomeIcon icon={faPencil} />
                    </a>
                  </Link>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      setProjectToDelete(project.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            )}
          />
        </FlexGrid>
        <ConfirmDeleteModal
          open={projectToDelete !== -1}
          title="Delete project"
          itemDescription={`the project "${maybeSelectTranslation(
            data?.projects.find(
              (project: BlogEntryWithImages) => project.id === projectToDelete
            )?.title
          )}"`}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};

ProjectsAdmin.getLayout = function getLayout(page: React.ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default ProjectsAdmin;
