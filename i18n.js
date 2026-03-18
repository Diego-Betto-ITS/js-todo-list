const translations = {
    "it": {
        "title": "titolo in italiano",
        "text": "testo in italiano",
        "footer": "footer in italiano"
    },
    "en": {
        "title": "titolo in inglese",
        "text": "testo in inglese",
        "footer": "footer in inglese"
    }
};

let language = 'it';

const languagesBtns = document.getElementById('languages');

const title = document.getElementById('titolo');
const paragrafo = document.getElementById('paragrafo'); 
const footer = document.getElementById('footer'); 

const translate = () => {
    title.innerText = translations[language].title;
    paragrafo.innerText = translations[language].text;
    footer.innerText = translations[language].footer;
}

languagesBtns.addEventListener('click', (event) => {
    language = event.target.dataset.lang;
    translate();
})

translate();