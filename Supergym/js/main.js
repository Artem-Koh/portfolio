document.getElementsByClassName('feedback_form')[0].addEventListener("submit", check);
function check(event){
  event.preventDefault();
  var el = document.getElementsByClassName('feedback_form')[0];
  var name = el.name.value;
  var phone = el.phone.value;
  var fail = '';
  if (name == ''){
    fail = 'Напишите Ваше имя';
  } else if (phone == '') {
    fail = 'Укажите Ваш телефон';
  }


  if (fail != ''){
    document.getElementsByClassName('ans')[0].innerHTML = fail;
  } else {
    document.getElementsByClassName('ans')[0].innerHTML = "Вопрос отправлен"
  }
}


(function(){
  var month = document.querySelector('.tickets__list--month')
  var year = document.querySelector('.tickets__list--year')
  var half = document.querySelector('.tickets__list--half')
  var head_month = document.querySelector('.month')
  var head_year = document.querySelector('.year')
  var head_half = document.querySelector('.half')
  month.style.display='flex';
  year.style.display='none';
  half.style.display='none';
  head_month.style.borderBottom='2px solid #D10A42';
  function hide(){
    year.style.display='none';
    half.style.display='none';
    month.style.display='none';
    head_year.style.borderBottom='0';
    head_half.style.borderBottom='0';
    head_month.style.borderBottom='0';
    if (this.className == 'month') {
      obj = month;
      bord = head_month;
    } else if (this.className == 'half'){
      obj = half;
      bord = head_half;
    } else{
      obj = year;
      bord = head_year;
    }
    obj.style.display='flex';
    bord.style.borderBottom='2px solid #D10A42';

  };
  head_month.addEventListener('click', hide);
  head_half.addEventListener('click', hide);
  head_year.addEventListener('click', hide);
})();



$('.slider').slick ({
                  nextArrow: document.querySelector('.my-arrow-next'),
                  prevArrow: document.querySelector('.my-arrow-prev'),
                  speed: 300,
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  responsive: [
                    {
                      breakpoint: 1323,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 693,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                });
$('.reviews-slider').slick ({
  nextArrow: document.querySelector('.my-arrow-next2'),
  prevArrow: document.querySelector('.my-arrow-prev2')
});
