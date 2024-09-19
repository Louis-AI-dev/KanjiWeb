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
            const randomIndex = Math.floor(Math.random() * data.length);
            const kanjiData = data[randomIndex];

            // Récupère le caractère kanji
            const kanjiCharacter = kanjiData.kanji;
            console.log('Chargement du kanji:', kanjiCharacter); // Ajoute un message pour vérifier le caractère

            // Affiche le kanji
            document.getElementById('randomKanji').textContent = kanjiCharacter;

            // Stocke la bonne réponse pour la vérification
            correctAnswer = kanjiData.signification;
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
