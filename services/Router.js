const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.target.getAttribute("href");
        Router.go(url);
      });
    });
    //Event Handler for URL Changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    //Check initial URL
    const url = window.location.pathname;
    Router.go(url);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Order";
        break;
      default:
        // BURADA KENDI STRING MANIPULATIONUNU DENE
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("h1");
          pageElement.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
    }
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};
export default Router;
