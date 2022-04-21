export const rectanglesOverlap = (rect, rect2) => {
  return (
    rect.x + rect.w >= rect2.x &&
    rect.x < rect2.x + rect2.w &&
    rect.y + rect.h >= rect2.y &&
    rect.y < rect2.y + rect2.h
  )
}
