import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

export default function ContactForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  reset,
  showContactForm,
  setShowContactForm,
  isEdit,
  getValues,
}) {
  return (
    <>
      <Modal
        show={showContactForm}
        onHide={() => {
          reset();
          setShowContactForm(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title> {isEdit ? "Edit Contact" : "Add Contact"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control type="text" hidden {...register("contactId")} />
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  placeholder="Enter your name"
                  type="text"
                  {...register("name")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  placeholder="Enter your email"
                  type="email"
                  {...register("email")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  placeholder="Enter your phone number"
                  type="tel"
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
                <Form.Control type="file" {...register("contactImage")} />
              </FloatingLabel>
              <img
                id="profile-pic"
                name="contact-profile"
                src={getValues("contactImage")}
                alt="someone"
              />
              <Form.Text className="text-danger">
                {errors.contactImage?.message}
              </Form.Text>
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
    </>
  );
}
