import { Button, TextField } from "@mui/material";
import { NewsletterSubscriber } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/common/Container";
import Heading from "../../components/common/Heading";
import Loading from "../../components/common/Loading";
import ThirdHeading from "../../components/common/ThirdHeading";
import NavLayout from "../../components/layouts/NavLayout";
import { NewsletterResponse } from "../api/newsletter";
import { NextPageWithLayout } from "../_app";

const Newsletter: NextPageWithLayout = () => {
  const session = useSession();
  const [subscription, setSubscription] = useState<
    NewsletterSubscriber | null | undefined
  >(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailChecked, setEmailChecked] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showReVerify, setShowReVerify] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    setEmail(target.email.value);
    toast
      .promise(
        axios.post<unknown, { data: NewsletterResponse }>("/api/newsletter", {
          email: target.email.value,
        }),
        {
          pending: "Fetching details",
          success: "Details retrieved",
          error: "There was an error retrieving your details",
        }
      )
      .then((response) => {
        setEmailChecked(true);
        setSubscription(response.data.subscription);
      });
  };

  const handleSubscribe = () => {
    toast
      .promise(axios.post("/api/newsletter/subscribe", { email }), {
        pending: "Subscribing you to newsletters",
        success: "A verification email has been sent to your inbox",
        error: "There was an error subscribing you",
      })
      .then(() => {
        setVerificationSent(true);
        setShowReVerify(false);
      });
  };

  const handleUnsubscribe = () => {
    toast
      .promise(axios.post("/api/newsletter/unsubscribe", { email }), {
        pending: "Deleting records of your subscription",
        success: "You are no longer subscribed to receive updates",
        error: "There was an error deleting your records",
      })
      .then(() => setSubscription(undefined));
  };

  const getActions = () => {
    if (verificationSent) {
      !showReVerify && setTimeout(() => setShowReVerify(true), 10000);
      return (
        <p>
          A verification email has been sent to{" "}
          <span className="text-primary">{email}</span>, please check your inbox
        </p>
      );
    }
    if (emailChecked) {
      if (subscription) {
        if (subscription.emailVerified) {
          return (
            <>
              <p>You can update your preferences at any time from this page</p>
              <button
                className="btn btn-error"
                onClick={() => handleUnsubscribe()}
              >
                Unsubscribe
              </button>
            </>
          );
        } else {
          !showReVerify && setShowReVerify(true);
          return (
            <div className="flex flex-col gap-2 items-center">
              <p>Your email still needs verifying please check your inbox</p>
            </div>
          );
        }
      } else {
        return (
          <>
            <p>
              You are not subscribed yet, you can update your preferences at any
              time from this page
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleSubscribe()}
            >
              Subscribe
            </button>
          </>
        );
      }
    } else {
      return (
        <>
          <ThirdHeading>Enter your email to update your details</ThirdHeading>
          <form
            className=" w-full p-4 flex flex-row rounded"
            onSubmit={handleSubmit}
          >
            <TextField
              className="w-full"
              name="email"
              label="Email"
              required
              defaultValue={session.data?.user?.email}
            />
            <Button
              type="submit"
              variant="outlined"
              className="grow"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </Button>
          </form>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="You can sign up to my newsletter mailing list to receive updates when I post new content"
        />
        <title>George Waller | Newsletter</title>
      </Head>
      <Container>
        <div className=" mx-auto">
          <div className="flex flex-col gap-4 items-center">
            {session.status === "loading" ? (
              <Loading />
            ) : (
              <>
                <Heading className="text-center">
                  Newsletter preferences
                </Heading>
                {getActions()}
                {showReVerify && (
                  <button
                    className="btn btn-sm btn-secondary w-fit"
                    onClick={() => handleSubscribe()}
                  >
                    Resend verification email
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

Newsletter.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Newsletter;
