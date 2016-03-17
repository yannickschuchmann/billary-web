import _ from 'lodash';


const getParentNamesRecursively = (projects, project_id, names = []) => {
  const project = findById(projects, project_id);
  if (project.parent_id) {
    _.concat(names, getParentNamesRecursively(projects, project.parent_id, names));
  }
  names.push(project.name)
  return names;
}

const findById = (items, id) => {
  return _.findLast(items, {id})
}

const mapProjectNames = (items, projects) => {
  return items.map((item) => {
    item.projectNames = getParentNamesRecursively(projects, item.project_id);
    return item;
  })
}

export {findById, mapProjectNames}
