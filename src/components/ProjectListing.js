import React, {PropTypes} from 'react';

//This is a stateless functional component. (Also known as pure or dumb component)
//More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
//Props are being destructured below to extract the savings object to shorten calls within component.

const getProjectChildren = (project, index = 0, depth = 0) => {
  if (!project) return;
  console.log(depth + "|" + index)
  if (project.children.length == 0) {
    return (<li key={depth + "|" + index}>{project.name}</li>);
  } else {
    return (<li key={depth + "|" + index}>{project.name}
      <ul>
        {project.children.map((item, i) => {
          return getProjectChildren(item, i + 1, depth + 1);
        })}
      </ul>
    </li>);
  }
};

const ProjectListing = ({projects}) => {
  const list = projects.map((item, i) => {return getProjectChildren(item, i)});
    return (
      <ul>{list}</ul>
    );
};

//Note that this odd style is utilized for propType validation for now. Must be defined *after*
//the component is defined, which is why it's separate and down here.
ProjectListing.propTypes = {
    projects: PropTypes.array.isRequired
};

export default ProjectListing;
