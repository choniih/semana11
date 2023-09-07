const Container = document.getElementById('container');
const obtener = document.getElementById('obtener');

obtener.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            const jokeText = data.value;

            // Traducción del chiste al español usando la API de Google Translate
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(jokeText)}`)
                .then(response => response.json())
                .then(translationData => {
                    const translatedJoke = translationData[0][0][0];
                    Container.innerHTML = `<p>${translatedJoke}</p>`;
                })
                .catch(error => {
                    Container.innerHTML = `<p>Error al traducir el chiste: ${error.message}</p>`;
                });
        })
        .catch(error => {
            Container.innerHTML = `<p>Error al cargar el chiste: ${error.message}</p>`;
        });
});
