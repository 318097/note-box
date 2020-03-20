import React, { Fragment, useState } from "react";
import "./ConfirmBox.scss";

const ConfirmBox = ({ children, title = "Delete?", onConfirm, onCancel }) => {
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const handleOk = () => {
    setShowConfirmBox(false);
    onConfirm();
  };

  const handleCancel = () => {
    setShowConfirmBox(false);
    if (onCancel) onCancel();
  };

  return (
    <Fragment>
      <span style={{ position: "relative" }}>
        <span onClick={() => setShowConfirmBox(true)}>{children}</span>
        {showConfirmBox && (
          <div className="confirm-box-container">
            <span className="confirm-box-title">{title}</span>
            <span className="confirm-box-actions">
              <button onClick={handleOk} className="btn">
                Yes
              </button>
              <button onClick={handleCancel} className="btn">
                No
              </button>
            </span>
          </div>
        )}
      </span>
    </Fragment>
  );
};

export default ConfirmBox;
