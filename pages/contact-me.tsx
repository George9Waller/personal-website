import { ReactElement } from "react";
import NavLayout from "../components/layouts/NavLayout";
import { NextPageWithLayout } from "./_app";

const ContactMe: NextPageWithLayout = () => {
  return (
    <p>Under construction</p>
  )
}

ContactMe.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{ page }</NavLayout>
}

export default ContactMe
