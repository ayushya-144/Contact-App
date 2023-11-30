import { useState } from "react";
import "../stylesheet/dashboard.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import DisplayContactList from "./DisplayContactList";
import "yup-phone";
import ContactNavbar from "./ContactNavbar";
import ContactForm from "./ContactForm";
import { validate } from "../utils/validation";
import { UseAuth } from "../utils/auth";

export default function Dashboard() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDetails, setContactDetails] = useState(
    JSON.parse(localStorage.getItem("contactData"))
  );
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const auth = UseAuth();

  const contactForm = useForm({
    defaultValues: {
      contactId: "",
    },
    resolver: yupResolver(validate()),
    mode: "onChange",
  });

  //destructuring form
  const { register, handleSubmit, formState, reset, setValue, getValues } =
    contactForm;
  const { errors } = formState;

  //insert or update method for Contacts
  async function onSubmit(data) {
    let userDetails = filterUserSessionWise();
    if (userDetails[0]["personalContacts"] === undefined) {
      userDetails[0]["personalContacts"] = [];
    }
    if (data.contactId !== "") {
      for (let i = 0; i < userDetails[0]["personalContacts"].length; i++) {
        if (
          userDetails[0]["personalContacts"][i]["contactId"] == data.contactId
        ) {
          if (
            userDetails[0]["personalContacts"][i]["contactImage"] !==
            data.contactImage
          ) {
            if (data.contactImage[0] !== undefined) {
              const image = await getBase64Image(data.contactImage[0]);
              data.contactImage = image;
            } else {
              data.contactImage = "";
            }
          }
          userDetails[0]["personalContacts"][i] = data;
        }
      }
    } else {
      data["contactId"] = v4();
      if (data.contactImage[0] !== undefined) {
        const image = await getBase64Image(data.contactImage[0]);
        data.contactImage = image;
      } else {
        data.contactImage = "";
      }
      userDetails[0]["personalContacts"].push(data);
    }
    localStorage.setItem("contactData", JSON.stringify(contactDetails));
    reset();
    setShowContactForm(false);
    updateContactDetails();
    setIsEdit(false);
  }

  // to filter user from userList according to login user
  const filterUserSessionWise = () => {
    const user = contactDetails.filter((user) => {
      if (user.email === sessionStorage.getItem("userSession")) {
        return user;
      }
    });
    return user;
  };

  //to convert image to base64
  const getBase64Image = (image) =>
    new Promise((resolve, reject) => {
      if (image !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
          resolve(reader.result);
          reader.onerror = reject;
        };
      }
    });

  //after every insert or edit contactDetails state will be updated
  const updateContactDetails = () => {
    setContactDetails(JSON.parse(localStorage.getItem("contactData")));
  };

  const handleUserLogout = () => {
    auth.logOut();
  };

  return (
    <>
      <div className="contact-container">
        <ContactNavbar
          reset={reset}
          setShowContactForm={setShowContactForm}
          setIsEdit={setIsEdit}
          setQuery={setQuery}
          handleUserLogout={handleUserLogout}
        />
        <ContactForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          showContactForm={showContactForm}
          setShowContactForm={setShowContactForm}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          getValues={getValues}
          getBase64Image={getBase64Image}
        />
        <DisplayContactList
          filterUserSessionWise={filterUserSessionWise}
          setValue={setValue}
          contactDetails={contactDetails}
          setShowContactForm={setShowContactForm}
          updateContactDetails={updateContactDetails}
          setIsEdit={setIsEdit}
          query={query}
        />
      </div>
    </>
  );
}
// https://www.youtube.com/watch?v=zv-TOLKTlR8&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=13
