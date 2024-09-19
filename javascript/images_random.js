const options = document.querySelectorAll('.option');
const buttons = document.getElementsByClassName('option');
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
            correctAnswer = kanjiData.signification; // Correction ici

            // Mélange des options, en incluant la bonne réponse
            const optionsSet = new Set();
            optionsSet.add(correctAnswer);

            // Ajoute d'autres réponses aléatoires au Set pour éviter les doublons
            while (optionsSet.size < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)].signification;
                optionsSet.add(randomOption);
            }

            // Convertir le Set en Array pour manipuler les boutons
            const optionsArray = Array.from(optionsSet);

            // Mélange aléatoirement les options dans l'array
            optionsArray.sort(() => Math.random() - 0.5);

            // Associe chaque option à un bouton
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
    let correctButton;

    // Vérifie chaque bouton pour voir lequel a la bonne réponse
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === correctAnswer) {
            correctButton = buttons[i];
            break; // On peut sortir de la boucle une fois qu'on a trouvé le bon bouton
        }
    }

    // Si la réponse sélectionnée est correcte
    if (selectedAnswer === correctAnswer) {
        correctButton.style.backgroundColor = 'green'; // Met le bouton correct en vert
    } else {
        // Si la réponse est incorrecte
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === selectedAnswer) {
                buttons[i].style.backgroundColor = 'red'; // Met le bouton incorrect en rouge
                break; // On peut sortir de la boucle une fois qu'on a trouvé le bouton incorrect
            }
        }
        correctButton.style.backgroundColor = 'green'; // Montre la bonne réponse en vert
    }

    // Attends une seconde avant de charger un nouveau kanji
    setTimeout(() => {
        resetButtons(); // Réinitialise les boutons
        loadKanji();    // Recharge un nouveau kanji
    }, 1000);
}

function resetButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = ''; // Réinitialise la couleur des boutons
    }
}

// Charger une image aléatoire au chargement de la page
window.onload = loadKanji;
