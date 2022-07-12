import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import Container from "../../components/common/Container";
import NavLayout from "../../components/layouts/NavLayout";
import { NextPageWithLayout } from "./../_app";

const Portal: NextPageWithLayout = () => {
  const { data } = useSession();
  console.log(data)
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {}
      </div>
    </Container>
  )
}

Portal.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{ page }</NavLayout>
}

export default Portal
