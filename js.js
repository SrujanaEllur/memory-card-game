document.addEventListener('DOMContentLoaded', function () {
    const gameGrid = document.getElementById('game-grid');
    const movesCounter = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const startGameButton = document.getElementById('start-game');
    const newGameButton = document.getElementById('new-game');
    const congratulationsMessage = document.getElementById('congratulations');
    const images = [
        'images/img1.jpg',
        'images/img2.jpg',
        'images/img3.jpg',
        'images/img4.jpg',
        'images/img5.jpg',
        'images/img6.jpg',
        'images/img7.jpg',
        'images/img8.jpg'
    ];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let moves = 0;
    let timer;
    let startTime;
    let gameStarted = false;

    function initGame() {
        cards = [...images, ...images];
        shuffle(cards);
        gameGrid.innerHTML = '';
        moves = 0;
        movesCounter.textContent = moves;
        timerDisplay.textContent = 0;
        congratulationsMessage.classList.add('hidden');
        startGameButton.classList.remove('hidden');
        newGameButton.classList.add('hidden');
        gameStarted = false;
        clearInterval(timer);
        cards.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;
            card.addEventListener('click', flipCard);
            gameGrid.appendChild(card);
        });
    }

    function startGame() {
        gameStarted = true;
        startTime = Date.now();
        timer = setInterval(updateTimer, 1000);
        startGameButton.classList.add('hidden');
        newGameButton.classList.remove('hidden');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        if (!gameStarted || flippedCards.length === 2 || this.classList.contains('matched') || this.classList.contains('flipped')) {
            return;
        }
        this.classList.add('flipped');
        this.style.backgroundImage = `url(${this.dataset.image})`;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesCounter.textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            flippedCards = [];

            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                congratulationsMessage.classList.remove('hidden');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = '';
                card2.style.backgroundImage = '';
                flippedCards = [];
            }, 1000);
        }
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = elapsedTime;
    }

    startGameButton.addEventListener('click', startGame);
    newGameButton.addEventListener('click', initGame);

    initGame();
});
