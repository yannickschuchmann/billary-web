import React, {PropTypes} from "react";

const SelectedProject = ({project, onClick}) => {
  let className;
  let projectName;

  if (project) {
    className = "";
    projectName = project.name;
  } else {
    className = " empty";
    projectName = "Select project";
  }

  return (
    <div
      className={"selected-project" + className}
      onClick={onClick}>
      {projectName}
    </div>
  )
}

SelectedProject.propTypes = {
  project: PropTypes.object,
  onClick: PropTypes.func
}

export default SelectedProject;
