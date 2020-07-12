import React from "react";
import "./ButtonTemplate.css";

export default function ButtonTemplate(prop) {
  return (
    <button aria-label="button" onClick={prop.onClick}>
      {prop.text}
    </button>
  );
}
