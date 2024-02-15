document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('.loader-container').style.display = 'flex';
    setTimeout(function() {
        document.querySelector('.loader-container').style.display = 'none';
    }, 2000); 
});

function toggleDarkMode() {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('dark');
}