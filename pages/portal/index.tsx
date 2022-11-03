import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Container from "../../components/common/Container";
import Loading from "../../components/common/Loading";
import SubHeading from "../../components/common/SubHeading";
import NavLayout from "../../components/layouts/NavLayout";
import PortalCard from "../../components/portal/PortalCard";
import {
  NewsletterApp,
  PortalApp,
  ProjectsApp,
  PasswordManagerApp,
} from "../../utils/portal";
import { MeData } from "../api/user/me";
import { NextPageWithLayout } from "./../_app";

const Portal: NextPageWithLayout = () => {
  const { promiseInProgress } = usePromiseTracker();
  const [{ isAdmin }, setMeData] = useState<MeData>({
    isAdmin: false,
    secureInfoPasswordHash: "",
    secureInfoPasswordSalt: "",
  });

  const apps = [
    PasswordManagerApp,
    NewsletterApp,
    ...(isAdmin ? [ProjectsApp] : []),
  ];

  const getUser = async () => {
    const res = await trackPromise(fetch("api/user/me"));
    const newData = (await res.json()) as MeData;
    setMeData(newData);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>George Waller | Portal</title>
        <meta
          name="description"
          content="A selection of web apps are available to selected users, visit this page to see what you have access to"
        />
      </Head>
      <Container>
        {promiseInProgress ? (
          <Loading />
        ) : (
          <>
            {apps.length === 0 ? (
              <div className="mx-auto">
                <SubHeading>
                  There are no apps available for you right now
                </SubHeading>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {apps.map((app: PortalApp, index: number) => (
                  <PortalCard key={index} app={app} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

Portal.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Portal;
