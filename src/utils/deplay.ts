export function delay(delay?: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), delay ?? 500)
  })
}
