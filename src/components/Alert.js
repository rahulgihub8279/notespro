import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div
      style={{
        height: "50px",
        width: "90%",
        position: "fixed",
        top: "0",
        zIndex: "-1",
      }}
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show fade-in`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> :{" "}
          <strong>{props.alert.message}</strong>
        </div>
      )}
    </div>
  );
}
