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

  // Наблюдаем за изменениями в DOM
  const observer = new MutationObserver(() => {
    if (scrollToElement()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Отключаем через 10 секунд, чтобы не висеть вечно
  setTimeout(() => observer.disconnect(), 10000);
}
