import { ReactElement } from "react";
import NavLayout from "../components/layouts/NavLayout";
import { NextPageWithLayout } from "./_app";

const CV: NextPageWithLayout = () => {
  return (
    <p>Under construction</p>
  )
}

CV.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{ page }</NavLayout>
}

export default CV
