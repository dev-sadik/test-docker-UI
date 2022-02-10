import React from "react";

interface Props {
    title: string
}

// TitleComponet :  It Is use to display the title on page. It accept the string.
//                  It is created for all pages having the same title style.

const TitleComponent = (props:Props) => {
  return (
    <div className="heading">
      <h3>{props.title}</h3>
    </div>
  );
};
export default TitleComponent;
