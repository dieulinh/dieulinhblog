import Modal from "react-modal";


export default function TaskModal (props) {
  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={props.taskModalVisible}
      onRequestClose={false}
      contentLabel="My dialog"
    >
      <div>My modal dialog.</div>
      <button onClick={() => props.setTaskModalVisible(false)}>Close modal</button>
    </Modal>
  );
}