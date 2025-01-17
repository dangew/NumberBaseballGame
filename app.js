// user-input
const $userInput = document.querySelector("#user-input");
// submit-btn
const $submitBtn = document.querySelector("#submit-btn");
// restart-btn
const $restartBtn = document.querySelector("#restart-btn");
// result-view
const $resultView = document.querySelector("#result-view");
// answer-test
const $answerTest = document.querySelector("#answer-test");
// TEST_FLAG
const TEST_FLAG = false;
// ANSWER
let ANSWER;

// submit-btn click event
const onClickSubmitBtn = () => {
    let checkResult = isValidNumber($userInput.value);
    if (checkResult.flag) {
        alert(`${checkResult.msg}`);
        $userInput.value = "";
        return;
    }
    computeStrikeAndBall();
};

// add event listener to submit-btn
$submitBtn.addEventListener("click", onClickSubmitBtn);

const restart = () => {
    initNumBaseball();
};

// add event listener to submit-btn
$restartBtn.addEventListener("click", restart);

// generate random number
const generateRandNum = () => {
    const numArr = [];
    while (numArr.length < 4) {
        const num = Math.floor(Math.random() * 9) + 1;
        if (!numArr.includes(num)) {
            numArr.push(num);
        }
    }
    return numArr.join("");
};

// compute strike and ball
const computeStrikeAndBall = () => {
    const userAnswer = $userInput.value;
    let strike = 0;
    let ball = 0;

    // count strike and ball at once
    userAnswer.split("").forEach((element) => {
        if (isIncluded(element)) {
            if (isRightPlace(element)) {
                strike++;
            } else ball++;
        }
    });

    // show result
    showResult(strike, ball);
};

// isIncluded
const isIncluded = (target) => {
    if (ANSWER.includes(target)) {
        return true;
    } else return false;
};

// isRightPlace
const isRightPlace = (target) => {
    if (ANSWER.indexOf(target) === $userInput.value.indexOf(target)) {
        return true;
    } else return false;
};

// showResult
const showResult = (strike, ball) => {
    const $currResult = document.createElement("p");
    const $newContent = document.createTextNode(
        strike === 4 ? "Home Run!" : makeResultString($userInput.value, strike, ball)
    );
    $currResult.appendChild($newContent);
    $resultView.appendChild($currResult);
};

// makeResultString
const makeResultString = (userInput, strike, ball) => {
    return `${userInput}: ${strike} 스트라이크 ${ball} 볼`;
};

// isValidInput
const isValidNumber = (input) => {
    if (input.length !== 4) {
        return { flag: true, msg: "4자리 숫자가 필요합니다." };
    }

    // there is no duplicated number
    if (new Set(input).size !== 4) {
        return { flag: true, msg: "중복되지 않아야 합니다." };
    }

    return { flag: false, msg: "" };
};

// init
const initNumBaseball = () => {
    ANSWER = generateRandNum();
    $answerTest.innerText = ANSWER;
    if (!TEST_FLAG) {
        $answerTest.style.display = "none";
    }
    cleanAll();
};

const cleanAll = () => {
    $resultView.innerText = "";
    $userInput.value = "";
};

initNumBaseball();
