import { useEffect, useState } from "react";
import "../stylesheet/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import DisplayContactList from "./DisplayContactList";
import "yup-phone";
import ContactNavbar from "./ContactNavbar";
import ContactForm from "./ContactForm";
import { validate } from "../utils/validation";

export default function Dashboard() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDetails, setContactDetails] = useState(
    JSON.parse(localStorage.getItem("contactData"))
  );
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //if user info is not stored in session it will redirect to login page
  useEffect(() => {
    if (sessionStorage.getItem("userSession") === "") {
      console.log("user exist ?", false);
      navigate("/");
    }
  }, [navigate]);

  //useForm Hook
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
    let userContacts = userDetails[0]["personalContacts"];
    if (userContacts === undefined) {
      userContacts = [];
    }
    if (data.contactId !== "") {
      for (let i = 0; i < userContacts.length; i++) {
        if (userContacts[i]["contactId"] == data.contactId) {
          if (userContacts[i]["contactImage"] !== data.contactImage) {
            const image = await getBase64Image(data.contactImage[0]);
            data.contactImage = image;
          }
          userContacts[i] = data;
        }
      }
    } else {
      data["contactId"] = v4();
      const image = await getBase64Image(data.contactImage[0]);
      data.contactImage = image;
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
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        resolve(reader.result);
        reader.onerror = reject;
      };
    });

  //after every insert or edit contactDetails state will be updated
  const updateContactDetails = () => {
    setContactDetails(JSON.parse(localStorage.getItem("contactData")));
  };

  const handleUserLogout = () => {
    if (confirm("Are you sure you want to logout")) {
      console.log("Hello");
      sessionStorage.clear();
      navigate("/");
    }
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
