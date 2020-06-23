import React from "react";

export default function ButtonTemplate(prop) {
  return (
    <button aria-label="button" onClick={prop.onClick}>
      {prop.text}
    </button>
  );
}
