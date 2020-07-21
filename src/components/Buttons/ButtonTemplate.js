import React from "react";

export default function ButtonTemplate(prop) {
  return (
    <button aria-label="button" className={prop.class} onClick={prop.onClick}>
      {prop.text}
    </button>
  );
}
