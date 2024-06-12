import { Modal, Button, Text } from "@nextui-org/react";

export default function DeleteModal({ visible, closeModal, deleteBlog, blogId }) {
    return (
        <Modal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeModal}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Are you sure you want to delete this blog?
                </Text>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={() => { deleteBlog(blogId) }}>
                    Delete
                </Button>
                <Button auto onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
