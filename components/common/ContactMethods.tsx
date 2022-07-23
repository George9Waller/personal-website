import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import CvStat from "../cv/CvStat";
import ExternalLink from "./ExternalLink";

export const ContactMethods = () => (
  <>
    <CvStat icon={faPhone}>
      <ExternalLink
        href="tel:+447894846744"
        displayText="+44 7894 846744"
        className="link-hover"
      />
    </CvStat>
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
