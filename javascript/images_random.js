const options = document.querySelectorAll('.option');
let correctAnswer = '';

function loadKanji() {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du fichier JSON');
            }
            return response.json();
        })
        .then(data => {
            // Sélection aléatoire d'un kanji
            const randomIndex = Math.floor(Math.random() * data.length);
            const kanjiData = data[randomIndex];
            const kanjiCharacter = kanjiData.kanji;

            // Affiche le kanji dans l'élément HTML
            document.getElementById('randomKanji').textContent = kanjiCharacter;

            // Stocke la bonne réponse
            const correctAnswer = kanjiData.signification;

            // Mélange des options, en incluant la bonne réponse
            const options = new Set();
            options.add(correctAnswer);

            // Ajoute d'autres réponses aléatoires au Set pour éviter les doublons
            while (options.size < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)].signification;
                options.add(randomOption);
            }

            // Convertir le Set en Array pour manipuler les boutons
            const optionsArray = Array.from(options);

            // Mélange aléatoirement les options dans l'array
            optionsArray.sort(() => Math.random() - 0.5);

            // Associe chaque option à un bouton
            const buttons = document.getElementsByClassName('option');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = optionsArray[i];
                buttons[i].setAttribute('onclick', `checkAnswer('${optionsArray[i]}')`);
            }

        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function checkAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer === correctAnswer;

    options.forEach(option => {
        if (option.textContent === selectedAnswer) {
            if (isCorrect) {
                option.classList.add('active');
                setTimeout(() => option.classList.remove('active'), 1000);
            } else {
                option.classList.add('incorrect');
                setTimeout(() => option.classList.remove('incorrect'), 1000);
            }
        } else {
            option.classList.remove('active', 'incorrect');
        }
    });
}

// Charger une image aléatoire au chargement de la page
window.onload = loadKanji;
