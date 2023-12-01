import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validate } from "../utils/validation";
import DisplayContactList from "./DisplayContactList";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/getOrSetLocalStorageData";
import { v4 } from "uuid";
import { useState } from "react";

export default function ContactBody({
  setContactDetails,
  setShowContactForm,
  setIsEdit,
  showContactForm,
  isEdit,
  contactDetails,
  query,
}) {
  const [imageSrc, setImageSrc] = useState();

  // create a form using react-hook-form
  const contactForm = useForm({
    defaultValues: {
      contactId: "",
    },
    resolver: yupResolver(validate()),
    mode: "onChange",
  });

  //destructuring form
  const { register, handleSubmit, formState, reset, setValue } = contactForm;
  const { errors } = formState;

  //insert or update method for Contacts
  async function onSubmit(data) {
    let userDetails = filterUserSessionWise();
    let image = "";
    if (typeof data.contactImage === "object") {
      if (data.contactImage[0] !== undefined) {
        image = await getBase64Image(data.contactImage[0]);
      }
    }
    if (userDetails[0]["personalContacts"] === undefined) {
      userDetails[0]["personalContacts"] = [];
    }
    if (data.contactId !== "") {
      userDetails[0]["personalContacts"].forEach(iteratingArray);
    } else {
      data["contactId"] = v4();
      if (data.contactImage[0] !== undefined) {
        data.contactImage = image;
      } else {
        data.contactImage = "";
      }
      userDetails[0]["personalContacts"].push(data);
    }
    setLocalStorageData("contactData", contactDetails);
    reset();
    setShowContactForm(false);
    updateContactDetails();
    setImageSrc();
    setIsEdit(false);

    // iterating function
    function iteratingArray(contact, index) {
      if (contact.contactId == data.contactId) {
        if (contact.contactImage !== data.contactImage) {
          if (data.contactImage[0] !== undefined) {
            data.contactImage = image;
          } else {
            data.contactImage = "";
          }
        }
        userDetails[0]["personalContacts"][index] = data;
      }
    }
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

  //after every insert or edit contactDetails state will be updated
  const updateContactDetails = () => {
    setContactDetails(getLocalStorageData("contactData"));
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

  //Loading preview of the image
  async function handleImageDisplay(e) {
    if (e.target.files[0]) {
      const contactImage = await getBase64Image(e.target.files["0"]);
      setImageSrc(contactImage);
    } else {
      setImageSrc();
    }
  }

  return (
    <>
      <Modal
        show={showContactForm}
        onHide={() => {
          reset();
          setImageSrc();
          setShowContactForm(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title> {isEdit ? "Edit Contact" : "Add Contact"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="contactForm">
            <Form.Control type="text" hidden {...register("contactId")} />
            <Form.Group className="mb-3">
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control
                  placeholder="Enter your name"
                  type="text"
                  autoComplete="off"
                  id="contactName"
                  {...register("name")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="off"
                  id="contactEmail"
                  {...register("email")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Phone Number" className="mb-3">
                <Form.Control
                  placeholder="Enter your phone number"
                  type="tel"
                  id="contactNumber"
                  {...register("phoneNumber")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.phoneNumber?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Image"
                className="mb-3"
              >
                <Form.Control
                  onInput={(e) => handleImageDisplay(e)}
                  type="file"
                  {...register("contactImage")}
                />
              </FloatingLabel>
              <img
                id="profile-pic"
                name="contact-profile"
                hidden={imageSrc === undefined ? true : false}
                src={imageSrc}
                alt="No Image Selected"
              />
            </Form.Group>
            <Button
              variant="danger float-end"
              onClick={() => {
                reset();
              }}
              type="button"
            >
              Reset
            </Button>
            <Button variant="primary float-end mx-1" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <DisplayContactList
        filterUserSessionWise={filterUserSessionWise}
        setValue={setValue}
        contactDetails={contactDetails}
        setShowContactForm={setShowContactForm}
        updateContactDetails={updateContactDetails}
        setIsEdit={setIsEdit}
        query={query}
        setImageSrc={setImageSrc}
      />
    </>
  );
}
