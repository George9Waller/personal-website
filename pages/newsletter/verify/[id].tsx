import { NewsletterSubscriber } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Container from "../../../components/common/Container";
import Loading from "../../../components/common/Loading";
import NavLayout from "../../../components/layouts/NavLayout";
import { VerifyNewsletterSubscriptionResponse } from "../../api/newsletter/verify/[id]";

export const VerifyNewsletter = () => {
  const router = useRouter();
  const { promiseInProgress } = usePromiseTracker();
  const [subscription, setSubscription] = useState<
    NewsletterSubscriber | undefined
  >(undefined);

  useEffect(() => {
    router.query["id"] &&
      trackPromise(
        axios.get<unknown, { data: VerifyNewsletterSubscriptionResponse }>(
          `/api/newsletter/verify/${router.query["id"]}/`
        )
      ).then((response) => {
        setSubscription(response.data.subscription);
      });
  }, [router.query]);

  return (
    <>
      <Head>
        <title>George Waller | Verify Newsletter Subscription</title>
      </Head>
      <Container>
        {promiseInProgress ? (
          <Loading />
        ) : (
          <>
            {subscription?.emailVerified ? (
              <div className="flex flex-col gap-2">
                <p className="badge badge-lg badge-success">
                  Email successfully verified
                </p>
                <Link href="/newsletter/">
                  <a className="btn btn-primary btn-sm w-fit">
                    Update preferences
                  </a>
                </Link>
              </div>
            ) : (
              <p className="badge badge-error">
                Email was unable to be verified
              </p>
            )}
          </>
        )}
      </Container>
    </>
  );
};

VerifyNewsletter.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default VerifyNewsletter;
