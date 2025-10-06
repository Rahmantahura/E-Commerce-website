document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cancelButton = document.querySelector('.cancel-button');
    const searchInput = document.querySelector('.search-input');
    const searchDiv = document.querySelector('.search-div');


    search.addEventListener('click', (event) => {
        event.stopPropagation();
    searchDiv.classList.toggle('search-active');

    if (searchDiv.classList.contains('search-active')) {
        searchInput.focus();
    }
});

    cancelButton.addEventListener('click', () => {
        searchDiv.classList.remove('search-active');
    });

    document.addEventListener('click', (event) => {
        if (searchDiv.classList.contains('search-active')) {

            const hasClickedOnSearchDiv = searchDiv.contains(event.target);

            if (!hasClickedOnSearchDiv) {
                searchDiv.classList.remove('search-active');
                searchInput.blur();
            }
        }        
    })
})