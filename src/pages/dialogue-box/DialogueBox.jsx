import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DialogueBox({
  children,
  show,
  handleClose,
  closeBtnTxt,
  showConfirmBtn,
  handleConfirmMethod,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {closeBtnTxt}
          </Button>
          {showConfirmBtn && (
            <Button variant="primary" onClick={handleConfirmMethod}>
              Confirm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
