export default (htmlString) => {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
}