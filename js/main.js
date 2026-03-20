async function loadHTML(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

// Si la page est dans pages/ il faudra "../partials/", sinon "partials/"
const pathPrefix = window.location.pathname.includes("/pages/") ? "../partials/" : "partials/";

loadHTML('header', pathPrefix + 'header.html');
loadHTML('footer', pathPrefix + 'footer.html');