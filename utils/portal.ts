import { trackPromise } from "react-promise-tracker";
import { MeData } from "../pages/api/user/me";

export interface PortalApp {
  title: string;
  colour: string;
  href: string;
}

export const ProjectsApp: PortalApp = {
  title: "Projects",
  colour: "bg-pink-100",
  href: "/portal/projects/",
};

export const NewsletterApp: PortalApp = {
  title: "Newsletter",
  colour: "bg-green-100",
  href: "/newsletter",
};

export const PasswordManagerApp: PortalApp = {
  title: "Password Manager",
  colour: "bg-orange-100",
  href: "/portal/pass",
};

export const checkUser = async (
  field: keyof MeData,
  invalidFunc: () => void
) => {
  const res = await trackPromise(fetch("/api/user/me"));
  const userData = (await res.json()) as MeData;
  !userData[field] && invalidFunc();
};
