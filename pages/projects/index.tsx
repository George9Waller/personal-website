import { ReactElement } from "react";
import { NavLayout } from "../../components/layouts/NavLayout";
import { NextPageWithLayout } from "../_app";

const Projects: NextPageWithLayout = () => {
  return (
    <p>Under construction</p>
  )
}

Projects.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{ page }</NavLayout>
}

export default Projects
