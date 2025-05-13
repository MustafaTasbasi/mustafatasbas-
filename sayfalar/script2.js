const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const scoreDisplay = document.getElementById("score");
        const highScoreDisplay = document.getElementById("highScore");
        const restartButton = document.getElementById("restartButton");

        const gridSize = 20;
        let snake = [{ x: 100, y: 100 }];
        let food = { x: 200, y: 200 };
        let direction = "RIGHT";
        let score = 0;
        let highScore = localStorage.getItem("highScore") || 0;
        let gameSpeed = 100;
        let interval;
        let isGameOver = false;

        const eatSound = document.getElementById("eatSound");
        const gameOverSound = document.getElementById("gameOverSound");

        function startGame() {
            interval = setInterval(gameLoop, gameSpeed);
        }

        function stopGame() {
            clearInterval(interval);
        }

        function restartGame() {
            snake = [{ x: 100, y: 100 }];
            food = { x: 200, y: 200 };
            direction = "RIGHT";
            score = 0;
            isGameOver = false;
            gameSpeed = 100;
            scoreDisplay.textContent = score;
            restartButton.style.display = "none";
            startGame();
        }

        function updateScore() {
            scoreDisplay.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }
            highScoreDisplay.textContent = highScore;
        }

        function gameLoop() {
            if (isGameOver) return;

            const head = { ...snake[0] };

            switch (direction) {
                case "UP":
                    head.y -= gridSize;
                    break;
                case "DOWN":
                    head.y += gridSize;
                    break;
                case "LEFT":
                    head.x -= gridSize;
                    break;
                case "RIGHT":
                    head.x += gridSize;
                    break;
            }

            if (head.x === food.x && head.y === food.y) {
                score++;
                eatSound.play();
                increaseDifficulty();
                generateFood();
            } else {
                snake.pop();
            }

            snake.unshift(head);

            if (checkCollision(head)) {
                endGame();
                return;
            }

            draw();
        }

        function increaseDifficulty() {
            if (gameSpeed > 50) {
                gameSpeed -= 5;
                stopGame();
                startGame();
            }
        }

        function checkCollision(head) {
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
                return true;
            }

            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    return true;
                }
            }

            return false;
        }

        function endGame() {
            isGameOver = true;
            stopGame();
            gameOverSound.play();
            alert("Oyun Bitti! Puanınız: " + score);
            restartButton.style.display = "inline-block";
        }

        function generateFood() {
            food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Yılanı aynı renkte çiz
            ctx.fillStyle = "green";  // Tüm yılanı aynı renk yapıyoruz
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            });

            // Yemi çiz
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, gridSize, gridSize);

            updateScore();
        }

        function changeDirection(event) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") direction = "UP";
                    break;
                case "ArrowDown":
                    if (direction !== "UP") direction = "DOWN";
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") direction = "LEFT";
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") direction = "RIGHT";
                    break;
            }
        }

        document.addEventListener("keydown", changeDirection);

        startGame();