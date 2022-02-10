import React from "react";

// SubTitleComponet : Is use to display the title on page. It accept the string as tilte.
//                    It is created for all pages having the same title style.

interface Props{
  title: string
}
const SubtitleComponent = (props:Props) => {
  return (
    <div className="heading">
      <h5>{props.title}</h5>
    </div>
  );
};
export default SubtitleComponent;
