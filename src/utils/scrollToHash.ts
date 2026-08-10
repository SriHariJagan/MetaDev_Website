// Smooth-scrolls to an element by id. Retries briefly so lazy-loaded
// sections have time to mount before giving up.
export function scrollToHash(id: string): void {
  let attempts = 0;

  const tryScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attempts < 20) {
      attempts += 1;
      window.setTimeout(tryScroll, 50);
    }
  };

  tryScroll();
}
