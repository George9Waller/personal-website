import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "../../../components/common/Container";
import FlexGrid from "../../../components/common/FlexGrid";
import NavLayout from "../../../components/layouts/NavLayout";
import {
  maybeSelectTranslation,
  selectTranslation,
} from "../../../utils/common";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../../components/common/Loading";
import { useRouter } from "next/router";
import {
  AdminProjectsListData,
  ProjectAdminDetails,
} from "../../api/portal/projects/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getProjectDate } from "../../../utils/projects";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { checkUser } from "../../../utils/portal";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";

export const ProjectsAdmin = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectAdminDetails[]>([]);
  const [projectToDelete, setProjectToDelete] = useState(-1);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    const getProjects = async () => {
      const res = await trackPromise(fetch("/api/portal/projects/list"));
      const newData = (await res.json()) as AdminProjectsListData;
      setProjects(newData.projects);
    };
    checkUser("isAdmin", () => {
      router.replace("/portal/");
    });
    getProjects();
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
        setProjects(
          projects.filter((project) => project.id !== projectToDelete)
        );
        closeModal();
        return toast.update(id, {
          render: "Project deleted successfully",
          type: "success",
          isLoading: false,
        });
      })
      .catch(() => {
        closeModal();
        return toast.update(id, {
          render: "An error occurred deleting the project",
          type: "error",
          isLoading: false,
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
        {promiseInProgress ? (
          <Loading />
        ) : (
          <FlexGrid>
            <div className="flex flex-row-reverse w-full">
              <button
                className="btn btn-sm btn-success"
                onClick={handleCreateNewProject}
              >
                Create new project
              </button>
            </div>
            {projects.length > 0 &&
              projects.map((project: ProjectAdminDetails) => (
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
              ))}
          </FlexGrid>
        )}
        <ConfirmDeleteModal
          open={projectToDelete !== -1}
          itemDescription={`the project "${maybeSelectTranslation(
            projects.find((project) => project.id === projectToDelete)?.title
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
