import React, {PropTypes} from 'react';

//This is a stateless functional component. (Also known as pure or dumb component)
//More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
//Props are being destructured below to extract the savings object to shorten calls within component.

const ProjectForm = ({submitNewProject, projectsAppState}) => {
  let name = "";

  const onSubmit = (e) => {
    e.preventDefault();
    submitNewProject(name);
    return false;
  }

  return (
    <form onSubmit={onSubmit.bind(this)}>
      <input type="text" onChange={(e) => {name = e.target.value}} />
    </form>
  );
};

//Note that this odd style is utilized for propType validation for now. Must be defined *after*
//the component is defined, which is why it's separate and down here.
ProjectForm.propTypes = {
  submitNewProject: PropTypes.func.isRequired,
  projectsAppState: PropTypes.object.isRequired
};

export default ProjectForm;
