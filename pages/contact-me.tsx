import { TextField } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import React, { ReactElement } from "react";
import { toast } from "react-toastify";
import ContactMethods from "../components/common/ContactMethods";
import Container from "../components/common/Container";
import Heading from "../components/common/Heading";
import ThirdHeading from "../components/common/ThirdHeading";
import NavLayout from "../components/layouts/NavLayout";
import { NextPageWithLayout } from "./_app";

const ContactMe: NextPageWithLayout = () => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      reset: () => void;
      name: { value: string };
      email: { value: string };
      subject: { value: string };
      message: { value: string };
    };
    toast
      .promise(
        axios.post("/api/contact", {
          name: target.name.value,
          email: target.email.value,
          subject: target.subject.value,
          message: target.message.value,
        }),
        {
          pending: "Message sending",
          error: "There was an error sending your message",
          success: "Your message has been successfully sent",
        }
      )
      .then(() => target.reset());
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="If you want to reach out to me here are my details and a contact form where you can leave a message via email"
        />
        <title>George Waller | Contact Me</title>
      </Head>
      <Container>
        <div className=" mx-auto">
          <div className="flex flex-col gap-4">
            <Heading className="text-center">Contact Me</Heading>
            <ThirdHeading>
              You can contact me via the following options or using the form
              below
            </ThirdHeading>
            <div className="bg-secondary bg-opacity-20 p-4 rounded flex flex-col gap-4">
              <ContactMethods />
            </div>
            <form
              className="bg-accent bg-opacity-20 p-4 rounded flex flex-col gap-4"
              onSubmit={onSubmit}
            >
              <ThirdHeading>Contact Form</ThirdHeading>
              <TextField name="name" label="Your name" required />
              <TextField
                name="email"
                label="Your email address"
                type="email"
                required
              />
              <TextField name="subject" label="Subject" type="text" required />
              <TextField name="message" label="Message" multiline required />
              <button className="btn w-fit mx-auto" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

ContactMe.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default ContactMe;
