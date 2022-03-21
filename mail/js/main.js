$(document).ready(function(){
    'use strict'

    const form = $('.login__form')

    form.on('submit', function (e) {
        e.preventDefault()

        if (!validator($(this))) {
            location.href='user-list.html'
        }
    })
});

'use strick'


//Элементы которым нужны маски
const inputData = $('.cell-input--date');
const inputPhone = $('.cell-input--phone');


//Назначаем маску
inputData.inputmask("99.99.9999");
inputPhone.inputmask("+7 (999) 999-99-99");




//Функция вызова popup.
function showModalWindow (button, hash=false) { //Параметр hash используем в true, если popup вызывается сразу с известным названием id, а не забирается из атрибута
    const popupName = hash ? button : button.attr('data-popup-name');
    const popup = $(`#${popupName}`);
    const popupClose = popup.find('.popup__close');
    const popupActive = $('.popup.popup--active');
    const popupCancellation = popup.find('.button--white');

    //Проверяем, есть ли уже открыте popup и если да, то закрываем его
    if (popupActive.length) {
        closeModalWindow(popupActive, false);
    } else {
        blockBody();
    }

    //Открываем popup
    popup.addClass('popup--active');

    //Закрытие popup на крестик
    popupClose.on('click', function () {
        closeModalWindow(popup);
    })

    //Закрытие при нажатии на кнопку "Отмена"
    popupCancellation.on('click', function () {
        popup.find('.popup__form')[0].reset();
        closeModalWindow(popup);
    })

    //Закрытие popup при клике на темную область
    popup.on('mousedown', function (e) {
        if (!e.target.closest('.popup__content')) {
            closeModalWindow(popup);
        }
    })

    //Закрытие popup при нажатии esc
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
            closeModalWindow(popup);
        }
    })
}

//Закрывает попап и удаляет обработчик прослушки нажатия клавиш клавиатуры
function closeModalWindow(popup, doUnBlockBody = true) {
    if (doUnBlockBody) {
        unBlockBody();
        popup.removeClass('popup--active');
        $(document).off('keydown');
    } else {
        popup.removeClass('popup--active');
    }
}

//Блокируем body с удалением скролла
function blockBody() {
    const body = document.body;
    const blockPaddingValue = window.innerWidth - body.clientWidth + 'px';

    body.style.overflow = 'hidden';
    body.style.paddingRight = blockPaddingValue;
}

//Разблокирует body
function unBlockBody() {
    const body = document.body;

    //Разблокируем боди после окончания анимации
    setTimeout(function () {
        body.style.overflow = 'visible';
        body.style.paddingRight = '0';
    }, 500);
}

//Вызов popup у элемента с артибутом data-popup-name
$('[data-popup-name]').on('click', function () {
    const form = $(this).parents('.form')

    //Проверяем, если нужно проверить какую то форму при вызове popup. Кнопка вызова popup должна быть внутри формы. Пример на Авантаж онлайн, в калькудяторе
    if (form.length) {
        if (!validator(form)) {
            showModalWindow($(this));
        }
    } else {
        showModalWindow($(this));
    }
})

//Вызов popup по хэшу
if (window.location.hash.indexOf('#popup') >= 0) {

    const hashName = window.location.hash;
    const popupName = hashName.split(':').pop();

    showModalWindow (popupName, hash=true) //Используем hash=true что бы сразу прокинуть название popup, а не вытаскивать его из атрибута кнопки
}



$(document).ready(function () {

    //Убираем ошибку в input при его изменении
    $(document).on('input','.cell-input',function(event) {
        $(this).parents('.cell').removeClass('cell--error');
        $(this).parents('.cell').find('.cell__error-message').slideUp();
    });

    //Убираем ошибку в checkbox при его изменении
    $('.checkbox__input').on('change', function () {
        $(this).parents('.checkbox').removeClass('checkbox--error');
        $(this).parents('.checkbox').find('.checkbox__error-message').slideUp();
    });

    //Убираем ошибку в select при его изменении
    $('.cell-select__body').on('click', '.cell-select__item', function () {
        $(this).parents('.cell').removeClass('cell--error');
        $(this).parents('.cell').find('.cell__error-message').slideUp();
    });

    //Убираем ошибку в file-input при его изменении
    $('.input-file__input').on('change', function () {
        $(this).parents('.input-file').removeClass('input-file--error');
        $(this).parents('.input-file').find('.input-file__error-message').slideUp();
    });

    //Убираем ошибку в капче при ее изменении
    $('.g-recaptcha-response').on('change', function () {
        $(this).parents('.recaptcha').removeClass('.error');
    });

});

//Проверка полей формы
function validator(form) {
    const inputs = form.find('.cell-input')
    const checkboxes = form.find('.checkbox__input')
    const file = form.find('.input-file__input')
    let errorForm = false;

    //Показ ошибки в input
    inputs.each(function () {
        const cellBlock = $(this).parents('.cell')
        const errorBlock = cellBlock.find('.cell__error-message');

        if ($(this).attr('data-required') !== 'false'
            && $(this).attr('id') !== 'YII_CSRF_TOKEN'
            && $(this).attr('type') !== 'hidden'
            && $(this).attr('class') !== 'g-recaptcha-response') {

            const type = $(this).attr('data-type')
            let thisError;

            switch (type) {
                case 'inputmask':
                    thisError = errorFieldInputMask($(this));
                    break;
                case 'email':
                    thisError = errorFieldEmail($(this), errorBlock);
                    break;
                case 'easy':
                    thisError = errorFieldEasy($(this), errorBlock);
                    break;
                case 'agents-search':
                    thisError = errorFieldAgentsSearch($(this), errorBlock);
                    break;
                default:
                    thisError = errorFieldText($(this));
            }

            if (thisError) {
                cellBlock.addClass('cell--error');
                errorBlock.slideDown();
                errorForm = true;
            }
        }
    });

    //Показ ошибки в checkbox
    checkboxes.each(function () {
        const checkboxBlock = $(this).parents('.checkbox')
        const errorBlock = $(this).parents('.checkbox').find('.checkbox__error-message');

        if($(this).attr('data-required') !== 'false') {
            if (!$(this).is(':checked')) {
                checkboxBlock.addClass('checkbox--error');
                errorBlock.slideDown();
                errorForm = true;
            }
        }
    });

    //Показ ошибки в file
    file.each(function () {
        const inputFileBlock = $(this).parents('.input-file')
        const errorBlock = inputFileBlock.find('.input-file__error-message');

        if($(this).attr('data-required') !== 'false') {
            if (!$(this).val().length) {
                inputFileBlock.addClass('input-file--error');
                errorBlock.slideDown();
                errorForm = true;
            }
        }
    })

    //Прокручиваем к первой ошибке
    if(errorForm){
        const errorInput = $('.cell--error, .checkbox--error').first();

        if (errorInput.length !== 0) {
            const scrollTop = errorInput.offset().top - 30;
            $('html, body').animate({ scrollTop: scrollTop }, 500);
        }
    }
    return errorForm
}

//Проверка заполненности поля (срабатывает по умолчанию на все поля даже без data-type)
function errorFieldText(el) {
    const val = el.val();
    return (val === '' || val === undefined)
}

//Проверка полного заполнения полей с маской плагина inputmask
function errorFieldInputMask(el) {
    return (!el.inputmask("isComplete"))
}

//Проверка email
function errorFieldEmail(el, errorBlock) {
    const regRus = /^[а-яё.]+@[а-яё-]+\.[a-яё]{2,10}$/i;

    if(regRus.test(el.val())) {
        errorBlock.html('email должен быть на английском');
        return true
    }

    errorBlock.html('указан не верный email');

    const reg = /^[a-z-._0-9]+@[a-z-._0-9]+\.[a-z0-9]{2,10}$/i;
    return !reg.test(el.val())
}

//Проверка минимальной суммы в калькуляторе продукта Копить легко
function errorFieldEasy(el, errorBlock) {
    const val = deleteSpacesInValue(el.val());

    if (val < 10000) {
        errorBlock.html('Сумма меньше 10 000 Р');
        return true
    }

    return false
}

//Проверка поля поиска по реестру агентов
function errorFieldAgentsSearch(el, errorBlock) {
    const val = el.val();

    if (val.length < 3) {
        errorBlock.html('Введите не меньше 3-х символов');
        return true
    }

    return false
}

//Работа селекта
$('.checkboxList-header').on('click', function () {
    $(this).parents('.cell-select').find('.cell-select__checkboxList').slideToggle();
    $(this).parents('.cell-select').toggleClass('is-active');
});

//# sourceMappingURL=main.js.map
