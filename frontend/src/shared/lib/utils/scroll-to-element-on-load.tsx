/**
 *
 * @param {string} elementId
 * @example
 * useEffect(() => {
 * const hash = location.hash.slice(1);
 * if (hash) {scrollToElementOnLoad(hash)}},
 * [location]);
 *
 */
export function scrollToElementOnLoad(elementId: string) {
  const scrollToElement = () => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("scroll-to");
      return true;
    }
    return false;
  };

  if (scrollToElement()) return;

  const observer = new MutationObserver(() => {
    if (scrollToElement()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => observer.disconnect(), 10000);
}
