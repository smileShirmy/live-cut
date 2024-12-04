/**
 * 克隆一个元素
 */
export function cloneElement(el: HTMLElement) {
  const clone = el.cloneNode(true) as HTMLElement
  const canvasEls = el.querySelectorAll('canvas')
  if (canvasEls.length) {
    const cloneCanvasEls = clone.querySelectorAll('canvas')
    for (let i = 0; i < canvasEls.length; i += 1) {
      const canvas = canvasEls[i]
      const cloneCtx = cloneCanvasEls[i].getContext('2d')
      cloneCtx?.drawImage(canvas, 0, 0)
    }
  }
  return clone
}
