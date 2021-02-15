import React from "react";
import Portal from "./Portal";

const Modal = ({ children, modalType }) => {
  return (
    <Portal>
      <div
        className="modal-content-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={
            modalType === "openConversation"
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "500px",
                  maxHeight: "950px",
                  height: "100vh",
                  width: "100vw",
                }
              : {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }
          }
        >
          <div
            style={
              modalType === "openConversation"
                ? {
                    background: "white",
                    height: "100%",
                    width: "100%",
                    zIndex: 10,
                  }
                : modalType === "newConversation"
                ? {
                    position: "relative",
                    background: "white",
                    borderRadius: "2px",
                    padding: "15px",
                    minWidth: "320px",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    height: "80%",
                    zIndex: 10,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                    marginBottom: "100px",
                  }
                : {
                    position: "relative",
                    background: "white",
                    borderRadius: "2px",
                    padding: "15px",
                    minWidth: "320px",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    zIndex: 10,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                    marginBottom: "100px",
                  }
            }
          >
            {children}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "black",
            opacity: 0.5,
          }}
        />
      </div>
    </Portal>
  );
};

const MemoizedModal = React.memo(
  Modal,
  (prevProps, nextProps) => prevProps.modalType === nextProps.modalType
);

export default MemoizedModal;
