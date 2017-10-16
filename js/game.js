$(document).ready(function () {

    const TIME = 20;
    const ZERO = 0;
    const LEVELS = 10;
    const LEVEL_ANSWERS = 9;

    var lives = 6, livesBox = $('.lives');
    var trueAnswer = ZERO, trueAnswerBox = $('.true-answers');
    var level = 1, levelBox = $('.level-num');
    var isShowLevelUpModal = false;

    var startTime, answer, intervalId;
    var questionText = $('.text-question');
    var questionBox = $('.question-box');
    var modal = $('.modal-answer');
    var timer = $('.timer').find('span');

    goToPlay();

    $('.next-answer').on('click', function () {
        goToPlay();
    });

    $('.answer-true').on('click', function () {
        handlerAnswer(true);
    });

    $('.answer-false').on('click', function () {
        handlerAnswer(false);
    });

    function goToPlay() {
        if(isShowLevelUpModal){
            showLevelUp();
        }else{
            startTime = TIME;
            answer = getRandomAnswer();
            questionBox.removeClass('d-none');
            modal.addClass('d-none');
            $('header').removeClass('d-none');
            $('.buttons-about-game').removeClass('d-none');
            $('.modal-level-up').addClass('d-none');

            timer.empty().text(startTime);
            questionText.empty().text(answer.answerText);
            intervalId = setInterval(function () {
                startTime--;
                timer.empty().text(startTime);
                if(startTime === ZERO){
                    clearInterval(intervalId);
                    lives--;
                    livesBox.empty().text(lives);
                    if(lives === ZERO){
                        showGameOver();
                    }else{
                        showErrorWindow(questionBox, modal, answer);
                    }
                }
            },1000);
        }
    }

    function handlerAnswer(userAnswer) {
        clearInterval(intervalId);
        if(startTime !== ZERO){
            if(answer.answer === userAnswer){
                if(setGameOptionsSuccess()){
                    showSuccessWindow(questionBox, modal, answer);
                }
            }else {
                if(setGameOptionsError()){
                    showErrorWindow(questionBox, modal, answer);
                }

            }
        }
    }

    function setGameOptionsSuccess() {
        trueAnswer++;
        trueAnswerBox.empty().text(trueAnswer);

        if(trueAnswer === LEVEL_ANSWERS){
            if(level === LEVELS){
                showGameWin();
                return false;
            }
            isShowLevelUpModal = true;
            level++;
            levelBox.empty().text(level);
            trueAnswer = ZERO;
            trueAnswerBox.empty().text(trueAnswer);
        }

        return true;
    }

    function setGameOptionsError() {
        lives--;
        livesBox.empty().text(lives);
        if(lives === ZERO){
            showGameOver();
            return false;
        }
        return true;
    }

    function showLevelUp() {
        isShowLevelUpModal = false;
        questionBox.addClass('d-none');
        modal.addClass('d-none');

        $('header').addClass('d-none');
        $('.buttons-about-game').addClass('d-none');
        $('.level-up-num').empty().text(parseInt(level - 1));
        $('.modal-level-up').removeClass('d-none');
    }

    function showGameOver() {
        location.href = 'gameover.html';
    }

    function showGameWin() {
        location.href = 'end.html';
    }
});

function getRandomAnswer() {
    var randomId =  Math.ceil(Math.random() * (parseInt(questions.length - 1)));
    return questions[randomId];
}

function showSuccessWindow(questionBox, modal, answer) {
    questionBox.addClass('d-none');
    modal.removeClass('d-none');
    modal.find('.title-answer').empty().text('правильно!');
    modal.find('.icon-answer').removeClass('fa-close red-text').addClass('fa-check green-text');
    modal.find('.text-answer').empty().text(answer.trueText);
}

function showErrorWindow(questionBox, modal, answer) {
    questionBox.addClass('d-none');
    modal.removeClass('d-none');
    modal.find('.title-answer').empty().text('неправильно!');
    modal.find('.icon-answer').removeClass('fa-check green-text').addClass('fa-close red-text');
    modal.find('.text-answer').empty().text(answer.falseText);
}