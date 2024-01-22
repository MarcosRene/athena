interface LinkActiveProps {
  pathnames: string[] | []
  currentPath: string
}

interface LinkActiveResult {
  isActiveLink: boolean
}

export function isLinkActive({
  pathnames,
  currentPath,
}: LinkActiveProps): LinkActiveResult {
  const isActiveLink =
    pathnames.some((path: string) => currentPath.startsWith(path)) || false

  return { isActiveLink }
}
