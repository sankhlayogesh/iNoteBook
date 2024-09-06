import React  from "react";
import Notes from "./Notes";

function HomeView(props) {
  return (
    
    <div>
      <Notes showAlert= {props.showAlert}/>
    </div>
  );
}


export default HomeView;
