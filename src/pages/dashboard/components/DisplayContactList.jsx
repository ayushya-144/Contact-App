import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { setLocalStorageData } from "../../../utils/getOrSetLocalStorageData";
import DialogueBox from "../../dialogue-box/DialogueBox";
import { useRef, useState } from "react";

export default function ContactList({
  filterUserSessionWise,
  setValue,
  contactDetails,
  setShowContactForm,
  updateContactDetails,
  setIsEdit,
  query,
  setImageSrc,
}) {
  const userDetails = filterUserSessionWise();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const refId = useRef();
  const allContacts =
    userDetails.length > 0 ? userDetails[0]["personalContacts"] : "";
  let userContacts = [];
  if (query !== "") {
    if (allContacts?.length > 0) {
      userContacts = allContacts.filter((contact) => {
        return (
          contact["name"].toLowerCase().includes(query.toLowerCase()) ||
          contact["email"].toLowerCase().includes(query.toLowerCase())
        );
      });
    }
  } else {
    userContacts = allContacts;
  }

  const handleDeleteDialogueBox = (contactId) => {
    refId.current = contactId;
    handleShow();
  };
  const handleDeleteContact = () => {
    for (let i = 0; i < userContacts.length; i++) {
      if (refId.current == userContacts[i]["contactId"]) {
        userContacts.splice(i, 1);
      }
    }

    setLocalStorageData("contactData", contactDetails);
    updateContactDetails();
    refId.current = null;
    handleClose();
  };

  const handleEditContact = (contactId) => {
    setShowContactForm(true);
    for (let i = 0; i < userContacts.length; i++) {
      if (userContacts[i]["contactId"] === contactId) {
        for (const key in userContacts[i]) {
          setValue(key, userContacts[i][key], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
          if (key === "contactImage") {
            setImageSrc(userContacts[i][key]);
          }
        }
      }
    }
    setIsEdit(true);
  };

  return (
    <>
      <DialogueBox
        show={show}
        handleClose={handleClose}
        closeBtnTxt={"Close"}
        showConfirmBtn={true}
        handleConfirmMethod={handleDeleteContact}
      >
        Are you sure you want to delete the contact
      </DialogueBox>
      {userContacts?.length > 0 ? (
        <div className="contact-body">
          <div className="contact-table">
            <h1>Contacts</h1>
            <Table bordered hover size="lg">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Contact Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userContacts &&
                  userContacts.map((contact, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>
                          <Card className="image-card">
                            <Card.Img
                              className="card-contact-image"
                              hidden={
                                contact.contactImage === "" ? true : false
                              }
                              src={contact.contactImage}
                            />
                          </Card>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary mx-auto"
                            onClick={() => {
                              handleEditContact(contact.contactId);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger mx-1"
                            onClick={() => {
                              handleDeleteDialogueBox(contact.contactId);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="contact-body">
          <div className="contact-table">
            <div className="empty-contacts">
              <h1>No Contacts to display</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
