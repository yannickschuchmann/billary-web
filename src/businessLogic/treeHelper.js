import { isEmpty } from 'lodash'

export function unflattenEntities(entities, parent = {id: null}, tree = []) {
  let children = entities.filter( entity => entity.parent_id == parent.id);
  if (!isEmpty( children )) {
    if ( parent.id == null ) {
      tree = children
      parent['children'] = children
    } else {
      parent['children'] = children
    }
    children.map( child => unflattenEntities( entities, child ) )
  } else {
    parent['children'] = []
  }

  return tree

}
