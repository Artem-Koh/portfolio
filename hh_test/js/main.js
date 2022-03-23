$('.navigation--el').on('mouseover', function(){
  let mod = $(this).attr('id')
  let change = $(this).find('.find').html()


  $('#main').attr('class', 'main ' + mod)
  $('.navigation--el').removeClass('act')
  $(this).addClass('act')
  $('.change').html(change)
})


$('.header__main--element').on('click', function(){
  $('.header__main--element').removeClass('act')
  $(this).addClass('act')
})
