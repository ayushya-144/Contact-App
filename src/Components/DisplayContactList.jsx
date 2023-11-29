import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
export default function ContactList({
  filterUserSessionWise,
  setValue,
  contactDetails,
  setShowContactForm,
  updateContactDetails,
  setIsEdit,
  query,
}) {
  const userDetails = filterUserSessionWise();
  const allContacts = userDetails[0]["personalContacts"];
  let userContacts = [];
  if (query !== "") {
    userContacts = allContacts.filter((contact) => {
      return contact["name"].toLowerCase().includes(query.toLowerCase());
    });
  } else {
    userContacts = allContacts;
  }

  const handleDeleteContact = (contactId) => {
    if (confirm("Are you sure you want to delete this contact")) {
      const userDetails = filterUserSessionWise();
      const userContacts = userDetails[0]["personalContacts"];
      for (let i = 0; i < userContacts.length; i++) {
        if (contactId == userContacts[i]["contactId"]) {
          userContacts.splice(i, 1);
        }
      }
      localStorage.setItem("contactData", JSON.stringify(contactDetails));
      updateContactDetails();
    }
  };

  const handleEditContact = (contactId) => {
    const userDetails = filterUserSessionWise();
    const userContacts = userDetails[0]["personalContacts"];
    for (let i = 0; i < userContacts.length; i++) {
      setShowContactForm(true);
      if (userContacts[i]["contactId"] === contactId) {
        for (const key in userContacts[i]) {
          setValue(key, userContacts[i][key], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
      }
    }
    setIsEdit(true);
  };

  return (
    <>
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
                            handleDeleteContact(contact.contactId);
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
    </>
  );
}
