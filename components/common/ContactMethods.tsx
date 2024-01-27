import { faAt } from "@fortawesome/free-solid-svg-icons";
import CvStat from "../cv/CvStat";
import ExternalLink from "./ExternalLink";

export const ContactMethods = () => (
  <>
    <CvStat icon={faAt}>
      <ExternalLink
        href="mailto:george@georgewaller.com,george.waller3@gmail.com"
        displayText="george@georgewaller.com"
        className="link-hover"
      />
    </CvStat>
  </>
);

export default ContactMethods;
