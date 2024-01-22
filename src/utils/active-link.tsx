export function isLinkActive(pathnames: string[], currentPath: string) {
  return pathnames.some((path: string) => currentPath.startsWith(path))
}
