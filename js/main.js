function AddHeightToWrap(inner, outer) {

    let wrapCard = document.querySelectorAll(outer);
    for (let unit of wrapCard) {
        unit.style.removeProperty('height');
    }

    const arrHeight = [];

    let cnt = 0;
    const getImg = document.querySelectorAll(inner);
    for (let imgHeight of getImg) {
        let size = imgHeight.getBoundingClientRect().height;
        arrHeight.push(size)
    }

    wrapCard = document.querySelectorAll(outer);
    for (let unit of wrapCard) {
        heightStr = arrHeight[cnt] + 4;
        if (arrHeight[cnt] == 0) {
            heightStr = arrHeight[cnt]
        }
        unit.style.height = heightStr.toString() + "px";
        cnt++
    }
    cnt = 0;
}

function ControlBodySize() {
    AddHeightToWrap('.main__knowing .contentCard', '.main__knowing .wrapAnimationEl');
    AddHeightToWrap('.main__aboutUs .contentCard', '.main__aboutUs .wrapAnimationEl');
}

const resizeObsToAddHeightToWrap = new ResizeObserver(ControlBodySize);
resizeObsToAddHeightToWrap.observe(document.querySelector('body'));

const popUpSleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// AddHeightToWrap('.main__knowing .contentCard', '.main__knowing .wrapAnimationEl');
// AddHeightToWrap('.main__aboutUs .contentCard', '.main__aboutUs .wrapAnimationEl');

// ////////////////////////////////////////////////////////////////////////////////

const headerBtn = document.querySelector('.header__bottom-button .onlineRegister');
const headerPopup = document.querySelector('.header__popup');

headerBtn.addEventListener('click', () => {
    headerPopup.classList.toggle('popupOpen');
    headerPopup.classList.toggle('popupClosed');
    (async () => {
        await popUpSleep(2000);
        AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
        // Запускаем ресайз для контроля изменения размеров body и пересчета wrapAnimationEl попапа
        function ControlBodySizePopUp() {
            AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
        }
        const resizeObsToAddHeightToWrap = new ResizeObserver(ControlBodySizePopUp);
        resizeObsToAddHeightToWrap.observe(document.querySelector('body'));
    })();
})

// // Закрываем попап по  клику вне окна

const headerPopupInput = document.querySelector('#popup');
const headerPopupWrap = document.querySelector('.header__popup-wrap');

headerPopup.addEventListener("click", function (event) {
    let klick = (event.composedPath()).includes(headerPopupWrap);
    if (!klick) {
        headerPopup.classList.toggle('popupOpen');
        headerPopup.classList.toggle('popupClosed');
    }
})

// Закрываем по клику на крестик 
const closePopUp = document.querySelector('.header__popup-close .icon');
closePopUp.addEventListener("click", () => {
    headerPopup.classList.toggle('popupOpen');
    headerPopup.classList.toggle('popupClosed');

})

// Валидация имени //
// /////////////////
const popupBtn = document.querySelector('.popup-button')

function AddClassErr(name) {
    name.classList.add('err');

    const arrErrName = name.className.split(' ');
    if (arrErrName.length >= 2) {
        let error = false;
        let errNameBtnOn = "err" + arrErrName[0];
        console.log(errNameBtnOn);
        const listNames = popupBtn.className.split(' ');
        for (let er of listNames) {
            if (er == errNameBtnOn) {
                let error = true
            }
        }
        if (error == false) {
            popupBtn.classList.add(errNameBtnOn);
        }
    }
}

function OffClassErr(name) {
    name.classList.remove('err');

    console.log(name.className);
    const arrErrName = name.className.split(' ')
    console.log(arrErrName);
    if (arrErrName.length <= 2) {
        let errNameBtnOn = "err" + arrErrName[0];
        console.log(errNameBtnOn);
        const listNames = popupBtn.className.split(' ');
        for (let er of listNames) {
            if (er == errNameBtnOn) {
                popupBtn.classList.remove(errNameBtnOn);
            }
        }
    }
}

const russianPattern = /^[А-ЯЁа-яё]{3,}\s[А-ЯЁа-яё]{3,}(\s[А-ЯЁа-яё]{3,})?$/;
const englishPattern = /^[A-Za-z]{3,}\s[A-Za-z]{3,}(\s[A-Za-z]{3,}){0,3}$/;
const getName = document.querySelector('form .userName');
getName.addEventListener('input', () => {
    if (russianPattern.test(getName.value)) {
        OffClassErr(getName)
    } else if (englishPattern.test(getName.value)) { OffClassErr(getName) }
    else (AddClassErr(getName))
})

// Валидация телефона //
// /////////////////////

const phonePattern = /^[+0-9]{1}[0-9]{8,11}$/;
const getPhone = document.querySelector('form .userTel')
// console.log(getPhone);
getPhone.addEventListener('input', () => {
    if (phonePattern.test(getPhone.value)) {
        OffClassErr(getPhone)
    } else {
        AddClassErr(getPhone);
    }
})
// Валидация mail //
// /////////////////////

const emailPattern = /^[a-zA-Zа-яА-Я0-9._-]+@[a-zA-Zа-яА-Я0-9.-]+.[a-zA-Zа-яА-Я]{2,}$/;
const getEmail = document.querySelector('form .userEmail');
getEmail.addEventListener('input', () => {
    if (emailPattern.test(getEmail.value)) {
        OffClassErr(getEmail)
    } else { AddClassErr(getEmail) }
})

// Анимация открытия поля с выбором дат //
// ///////////////////////////////////////

const iconOpenDiv = document.querySelector('.header__popup-outputClose');
const iconOpen = document.querySelector('.header__popup-outputClose .icon');
const popupSecond = document.querySelector('.popupSecond');
const userChoice = document.querySelector('.userChoice');


iconOpenDiv.addEventListener('click', () => {
    iconOpen.classList.toggle('open');
    popupSecond.classList.toggle('popupSecondClosed');
    popupSecond.classList.toggle('popupSecondOpen');
    (async () => {
        await popUpSleep(600);
        AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
    })();
})

// Поле с выбором месяцев//
/////////////////////////////

const month = document.querySelector('.header__popup-month p');
Date.prototype.daysInMonth = function () {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDay = date.getDate();
let daysInMonth = date.daysInMonth();
let currentHour = date.getHours();

let countMonth = 0;
let newCurrentMonth;

// Поля ввода даты, и времени  //
const inputData = document.querySelector('.header__popup-text span:nth-child(1)');
const inputData2 = document.querySelector('.header__popup-text span:nth-child(2)');
// ------------------------------
const arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль'];
let arrMonthToChange = [arrMonth[currentMonth], arrMonth[currentMonth + 1], arrMonth[currentMonth + 2]];
month.innerHTML = arrMonthToChange[countMonth];

// Листаем месяц вперед-назад //
// ///////////////////////

const svgNext = document.querySelector('.header__popup-next');
const svgPrevious = document.querySelector('.header__popup-previous');

function ChangeUp() {
    countMonth++;
    if (countMonth <= 2) {
        month.innerHTML = arrMonthToChange[countMonth];

        date.setMonth(currentMonth + countMonth);
        newCurrentMonth = date.getMonth();
        daysInMonth = date.daysInMonth();
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        for (let day of dataList) {
            day.remove();
        }
        GetClassOnDay(0, daysInMonth, newCurrentMonth);
        CurrentHour(date);
        let timer = setInterval(CurrentHour(date), 1000);
        svgPrevious.classList.remove('iconOff');
        svgPrevious.addEventListener('click', ChangeDown);
    }
    if (countMonth == 2) {
        svgNext.classList.add('iconOff');
        svgNext.removeEventListener('click', ChangeUp)
    };
    const choiceTime = document.querySelectorAll(".header__popup-bodyTime .iconOff");
    for (let tm of choiceTime) {
        tm.classList.remove('iconOff');
    }
}
function ChangeDown() {
    countMonth--;
    if (countMonth >= 0) {
        console.log(countMonth)
        month.innerHTML = arrMonthToChange[countMonth];

        date.setMonth(currentMonth + countMonth);
        newCurrentMonth = date.getMonth();
        daysInMonth = date.daysInMonth();
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        for (let day of dataList) {
            day.remove();
        }
        GetClassOnDay(0, daysInMonth, newCurrentMonth);
        svgNext.classList.remove('iconOff');
        svgNext.addEventListener('click', ChangeUp);
    }
    if (countMonth == 0) {
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        let newCurrentMonth = date.getMonth();
        for (let day of dataList) {
            day.remove();
        }
        svgPrevious.classList.add('iconOff');
        GetClassOnDay(currentDay, daysInMonth, newCurrentMonth)
        svgPrevious.removeEventListener('click', ChangeDown)
        CurrentHour(date, date.getDate());
    };
}

svgNext.addEventListener('click', ChangeUp);
svgPrevious.addEventListener('click', ChangeDown);

// Выбор времени //
// ////////////////

let time = date.getHours();
function CurrentHour(date) {
    // console.log("Выбрали новую дату ",date)
    const choiceTime = document.querySelector(".header__popup-bodyTime .time:nth-child(1)");
    const choiceTime2 = document.querySelector(".header__popup-bodyTime .time:nth-child(2)");
    const choiceTime3 = document.querySelector(".header__popup-bodyTime .time:nth-child(3)");
    if (date.getDate() == currentDay) {
        let time = date.getHours();
        if (time >= 14) {
            choiceTime.classList.add("iconOff");
            choiceTime2.classList.add("iconOff");
            choiceTime3.classList.add("iconOff");
        } else if (time >= 12) {
            choiceTime.classList.add("iconOff");
            choiceTime2.classList.add("iconOff");
        }
        else if (time >= 10) {
            choiceTime.classList.add("iconOff");
        }
    } else if (date.getDate() > currentDay) {
        choiceTime.classList.remove("iconOff");
        choiceTime2.classList.remove("iconOff");
        choiceTime3.classList.remove("iconOff");
    }
}
let timer = setInterval(CurrentHour(date), 1000);

//  Формирование календаря //
// //////////////////////////

GetClassOnDay(currentDay, daysInMonth, currentMonth)

function GetClassOnDay(currentDay, daysInMonth, month) {
    const dataList = document.querySelector('.header__popup-bodyData ul');
    const tmplCalendar = document.querySelector('#tmplCalendar');
    const textLi = tmplCalendar.content.querySelector('li');
    for (let day = 1; day <= daysInMonth; day++) {
        textLi.textContent = `${day}`;
        let li = tmplCalendar.content.cloneNode(true);
        dataList.append(li);
        if (currentDay > day) {
            const dayOff = document.querySelector(`.header__popup-bodyData li:nth-child(${day})`);
            dayOff.classList.add('iconOff');
        } else {
            const getDataFromCalendar = document.querySelectorAll('.header__popup-bodyData li:not(.iconOff)');
            for (let unit of getDataFromCalendar) {
                unit.addEventListener('click', () => {
                    // console.log(unit);
                    inputData.textContent = unit.textContent + ' ' + arrMonth[month];
                    inputData2.textContent = 'Время';

                    const newDayChoice = new Date();
                    newDayChoice.setDate(unit.textContent);
                    // console.log("Выбираем новую дату: ", newDayChoice.getDate())
                    CurrentHour(newDayChoice);
                })
            }
        }
    }
}

const getTimeFromChoice = document.querySelectorAll(".time");
for (let unit of getTimeFromChoice) {
    unit.addEventListener('click', () => {
        const getDataTime = unit.textContent;
        inputData2.textContent = ' ';

        const dataFromSpan = inputData.textContent;
        if (dataFromSpan == 'Дата') {
            inputData2.textContent = 'Сперва выберите дату';
        } else {
            const arrGetDate = dataFromSpan.split(" ");
            if (arrGetDate[1] == arrMonth[currentMonth]) {
                if (arrGetDate[0] == currentDay) {
                    inputData2.textContent = ' ';
                    if ((currentHour + 1) >= getDataTime.split('.')[0].slice(-1)) {
                        inputData2.textContent = 'Время';
                    } else {
                        inputData2.textContent = getDataTime;
                    }
                } else if (arrGetDate[0] > currentDay) {
                    inputData2.textContent = ' ';
                    inputData2.textContent = getDataTime;
                }
            } else {
                inputData2.textContent = ' ';
                inputData2.textContent = getDataTime;
            }
        }
    })
}

// Устанавливаеи mutation observer на див выбора 
// даты и времени, так как функ Add(err) и Off(err)
// пришлось бы ставить много раз в разных частях кода

let mutationObserver = new MutationObserver(CorrectAttr);
const config = {
    attributes: true,
    childList: true,
    subtree: true,
};
mutationObserver.observe(userChoice, config);

const mutationObj = {};
let correctResult = 0;
const reTime = /^(0[0-9]|1[0-9]|2[0-3])\.(0[0-9]|[1-5][0-9])$/;
const reData = /^([1-9]|[12][0-9]|3[01])\s(?:Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь)$/;
function CorrectAttr(mutationsList, observer) {
    if (mutationsList[0].target.className == 'dataChoice') {
        delete mutationObj.timeChoice;
    }
    mutationObj[mutationsList[0].target.className] = mutationsList[0].target.innerText;
    const arrKeyMutationObj = Object.keys(mutationObj);
    if (arrKeyMutationObj.length >= 2) {
        if (reData.test(mutationObj.dataChoice) && reTime.test(mutationObj.timeChoice)) {
            popupBtn.classList.remove('erruserChoice');
        } else {
            popupBtn.classList.add('erruserChoice')
        }
    } else { popupBtn.classList.add('erruserChoice'); }
}

//  MutationObserver на btn для отслеживания классов и снятия-установки disabled

let btnObserver = new MutationObserver(CorrectClassBtn);
const configBtn = {
    attributes: true,
};
const getPopupBtn = document.querySelector('form .onlineRegister');
btnObserver.observe(popupBtn, configBtn);
function CorrectClassBtn(mutationsList, observer) {
    const arrClassBtn = mutationsList[0].target.className.split(' ');
    if (arrClassBtn.length == 1) {
        getPopupBtn.disabled = false;
    } else { getPopupBtn.disabled = true; }
}

// ///////////////////////////////////
// Анимируем секцию main_aboutUs
// ///////////////////////////////////

let objSizeAnimEl = {};
const wrapAnimationElSection = document.querySelectorAll('main .wrapAnimationEl');
const getSizeFromResizObserver = new ResizeObserver(FuncAnimation);

function FuncAnimation(entries) {
    console.log(entries);

    Object.keys(objSizeAnimEl).forEach(key => delete objSizeAnimEl[key]);
    let count = 0;

    for (let unit of entries) {
        widPX = Math.round(unit.contentRect.width);
        heiPX = Math.round(unit.contentRect.height);
        objSizeAnimEl[count] = [unit.target.childNodes[1], widPX, heiPX];
        count++;
    }
    console.log("resize is dane. ", objSizeAnimEl);
    FuncStopAnimationRect(objSizeAnimEl);
    FuncStartAnimationRect(objSizeAnimEl)
}

const arrActualAnim = {};
const aboutUsCollback = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log("Is intersecting");
            entry.target.childNodes.forEach((f) => {
                if (f.className == "wrapAnimationEl") {
                    console.log(f);
                    getSizeFromResizObserver.observe(f);
                    console.log("повторный запуск");
                }
            })
        } else {
            arrActualAnim.length = 0;
            console.log("No intersecting");
            entry.target.childNodes.forEach((f) => {
                if (f.className == "wrapAnimationEl") {
                    getSizeFromResizObserver.unobserve(f);
                    FuncStopAnimationRect(objSizeAnimEl);
                }
            })
        }
    })
}

const options = {
    rootMargin: '0px',
}

const target2 = document.querySelectorAll('.wrapIntersectionObserving');
const wrapIntersectionObserver = new IntersectionObserver(aboutUsCollback, options);
for (let unit of target2) {
    wrapIntersectionObserver.observe(unit);
}

function FuncStartAnimationRect(arrDataSize) {
    for (let unit in arrDataSize) {
        animation = anime({
            targets: arrDataSize[unit][0],
            keyframes: [
                {
                    translateX: arrDataSize[unit][1] - 50
                }, {
                    translateX: arrDataSize[unit][1] - 25,
                    translateY: 25,
                    rotate: 90
                }, {
                    translateY: arrDataSize[unit][2] - 25
                }, {
                    translateX: arrDataSize[unit][1] - 50,
                    translateY: arrDataSize[unit][2] - 5,
                    rotate: 180
                }, {
                    translateX: 5
                }, {
                    translateX: -20,
                    translateY: arrDataSize[unit][2] - 25,
                    rotate: 270
                }, {
                    translateY: 25
                }, {
                    translateX: 0,
                    translateY: 0,
                    rotate: 360
                }
            ],
            duration: 10000,
            easing: 'linear',
            loop: true,
        })
    }
}

function FuncStopAnimationRect(arrData) {
    for (let unit in arrData) {
        anime.remove(arrData[unit][0]);
        arrData[unit][0].style.removeProperty('transform');
    }
}


// ///////////////////////////////////
// Анимируем секцию main_ai
// ///////////////////////////////////

const itemNew = [];
let wordsOfString;
let newText = '';
let newTextString;
let number = 0;
let arrLineFromWords = [];
const lineWords = {};
const sizes = [];
const arrSizeToDiv = [];
let booleanAnimData = 1;
count = 0;
let timerAnim;
let idTimerArr = [];
let posTop;


function SetNamingElement(partOfName) {
    let newNameTarget = getRandomNumber(0, 1000);
    let divNameStr = newNameTarget.toString();
    return (partOfName + divNameStr)
}

const optionsMainAI = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.3
}

const collbackMainAI = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // console.log("Is intersecting text");
            const ResizeObserverMainAI = new ResizeObserver((entries) => {
                if (count == 0) {
                    // let nameDiv;
                    StartAnimationSectionMainAI();
                    count = 1;
                } else {
                    StopAnimationSectionMainAI();
                    StartAnimationSectionMainAI();
                }
            });
            ResizeObserverMainAI.observe(entry.target);
        } else {
            // console.log("No intersecting text");

            StopAnimationSectionMainAI();
        }
    })
}

const observerMainAI = new IntersectionObserver(collbackMainAI, optionsMainAI);
const targetMainAI = document.querySelectorAll('.main__ai .wrap');
for (let unit of targetMainAI) {
    observerMainAI.observe(unit)
}


async function sleep(ms) {
    return new Promise(resolve => {
        timerAnim = setTimeout(resolve, ms);
        idTimerArr.push(timerAnim);
        if (idTimerArr.length > 15) { idTimerArr.shift() }
    })
}

function StopAnimationSectionMainAI() {
    const stopAnimTarget = document.querySelectorAll('.main__ai .main__text');
    for (let unitStopAnimation of stopAnimTarget) {
        const nameAnim = unitStopAnimation.classList.value.split(' ');
        if (nameAnim.length > 1) {
            const nameAnimFromStopAnimation = document.querySelector(`.${nameAnim[1]} .anim-ai`);
            anime.remove(nameAnimFromStopAnimation);
            unitStopAnimation.classList.remove(`${nameAnim[1]}`);
            nameAnimFromStopAnimation.style.removeProperty("transform");
            booleanAnimData = 0;
            ms = 0;
            idTimerArr.forEach((x) => clearTimeout(x));
        }
    }
}

function StartAnimationSectionMainAI() {
    booleanAnimData = 1;
    ms = 7000;
    const divTextContent = document.querySelectorAll('.main__text');

    for (let newNameDiv of divTextContent) {
        nameDiv = SetNamingElement('Div');
        newNameDiv.classList.add(`${nameDiv}`);

        // ----------------------------------

        const textInMainAI = document.querySelector(`.${nameDiv} p`);
        const words = textInMainAI.textContent.split(' ');
        let newTextP = '';
        for (let itemWord of words) {
            newTextP = newTextP + '<span>' + itemWord + ' ' + '</span>';
        }
        textInMainAI.innerHTML = newTextP;

        // ----------------------------------

        const getWidthTop = document.querySelectorAll(`.${nameDiv} span`);
        let mainAITop = 0;
        let mainAIWidth = 0;
        const widthTop = [];

        for (let itemTagSpan of getWidthTop) {
            if (itemTagSpan.offsetTop !== mainAITop) {
                widthTop.push([mainAITop, mainAIWidth]);
                mainAITop = itemTagSpan.offsetTop;
                mainAIWidth = itemTagSpan.offsetWidth;
            } else {
                mainAIWidth += itemTagSpan.offsetWidth;
            }
        }
        widthTop.push([mainAITop, mainAIWidth]);
        widthTop.shift();

        const animElementMainAI = document.querySelector(`.${nameDiv} .anim-ai`);
        AnimMainAI(widthTop, animElementMainAI);
    }
};

async function AnimMainAI(widthTop, elAnim) {
    while (booleanAnimData) {
        for (let sumAnim = 0; sumAnim < widthTop.length; sumAnim++) {
            elAnim.style.transform = 'translate(0px,' + (widthTop[sumAnim][0] - 5) + 'px)';
            anime({
                targets: elAnim,
                translateX: [
                    { value: widthTop[sumAnim][1] - 30, duration: 7000 }],
                loop: 1,
                easing: 'linear'
            });
            await sleep(ms);
            anime.remove(elAnim);
            elAnim.style.removeProperty("transform");
        }
    }
}

const mainAIBtn = document.querySelector('.main__ai-button .onlineRegister');
const mainAIPopup = document.querySelector('.main__ai__popup')
mainAIBtn.addEventListener('click', () => {
    headerPopup.classList.toggle('popupOpen');
    headerPopup.classList.toggle('popupClosed')
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
