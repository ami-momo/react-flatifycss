/**
 * Type name of a child element. Components mark themselves with a static
 * `__TYPE` property, a `__TYPE` prop also works (for wrapped components).
 */
export function getChildType(child: any): string | undefined {
  return child?.props?.__TYPE ?? child?.type?.__TYPE;
}

export function hasSpecificChildren(children: any, typeName: string) {
  if (children) {
    for (let child in children) {
      if (getChildType(children[child]) === typeName) {
        return true;
      }
    }
  }
  return false;
}
