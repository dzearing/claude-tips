export function scrollToSlide(slideId: string): void {
  const element = document.getElementById(slideId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
