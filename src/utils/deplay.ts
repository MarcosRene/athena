export function delay(delay?: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500 || delay)
  })
}
