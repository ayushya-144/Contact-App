import { useState } from "react";
import "../stylesheet/dashboard.css";
import "yup-phone";
import ContactNavbar from "./ContactNavbar";
import ContactBody from "./ContactBody";

import { getLocalStorageData } from "../utils/getOrSetLocalStorageData";

export default function Dashboard() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDetails, setContactDetails] = useState(
    getLocalStorageData("contactData")
  );
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="contact-container">
        <ContactNavbar
          setShowContactForm={setShowContactForm}
          setIsEdit={setIsEdit}
          setQuery={setQuery}
        />
        <ContactBody
          setContactDetails={setContactDetails}
          setShowContactForm={setShowContactForm}
          setIsEdit={setIsEdit}
          showContactForm={showContactForm}
          isEdit={isEdit}
          contactDetails={contactDetails}
          query={query}
        />
      </div>
    </>
  );
}
