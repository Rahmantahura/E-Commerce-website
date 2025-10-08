document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    const search = document.querySelector('.search');
    const cancelButton = document.querySelector('.cancel-button');
    const searchInput = document.querySelector('.search-input');
    const searchDiv = document.querySelector('.search-div');
    const searchForm = document.querySelector('.search-form'); 

    let searchHistory = [];
    loadHistory();

    search.addEventListener('click', (event) => {
        event.stopPropagation();
    searchDiv.classList.add('search-active');

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


    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputHolder = searchInput.value.trim();
        if (!inputHolder) return;
        addHistoryItem(inputHolder);
            searchInput.value = '';
            searchDiv.classList.remove('search-active');
    });

    function addHistoryItem(query) {
        const maxHistoryItems = 5;
        searchHistory = searchHistory.filter(item => item !== query);
            searchHistory.unshift(query);
            if (searchHistory.length > maxHistoryItems) {
                searchHistory.pop();
        }
        renderHistory();
        saveHistory();
    }

    function loadHistory() {
        const historyString = localStorage.getItem('searchHistory');
        if (historyString) {
            searchHistory = JSON.parse(historyString);
        }
        renderHistory();
    }

    function saveHistory() {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    function renderHistory() {
        const historyList = document.querySelector('.history-list');
        historyList.innerHTML = '';
        searchHistory.forEach((item) => {
            const historyItem = document.createElement('li');
            historyItem.textContent = item;
            const crossEmoji = document.createElement('span');
            crossEmoji.textContent = '❌';
            crossEmoji.classList.add('history-delete-button')
            crossEmoji.addEventListener('click', (event) => {
                event.stopPropagation();
                removeHistoryItem(item);
            });
            historyItem.appendChild(crossEmoji);
            historyItem.addEventListener('click', () => {
                searchInput.value = item;
                searchForm.dispatchEvent(new Event('submit'));
                searchDiv.classList.remove('search-active');
            });
            historyList.appendChild(historyItem);
        });
    };
    function removeHistoryItem(queryToRemove) {
        searchHistory = searchHistory.filter(item => item !== queryToRemove);
    saveHistory();
    renderHistory();
    }

    searchInput.addEventListener('focus', () =>
    mainContent.classList.add('page-blurred'));

    searchInput.addEventListener('blur', () =>
    mainContent.classList.remove('page-blurred'));
})