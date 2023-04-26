window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.promo__menu'),
    menuItem = document.querySelectorAll('.promo__menu-link'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('promo__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('promo__menu_active');
        })
    });
});

$(document).ready(function(){
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
        });
    
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks').fadeOut('slow');
        });

   
        function validateForms(form){
            $(form).validate({
              rules:{
                name: "required",
                phone: "required",
                email:{
                  required:true,
                  email:true,
                }
              },
              messages: {
                name: "Будь ласка, вкажіть своє ім'я",
                phone: "Будь ласка, вкажіть свій номер телефону",
                email: {
                  required: "Будь ласка, вкажіть адресу своєї електронної пошти",
                  email: "Не вірна адреса електронної пошти"
                }
              }
            });
          };
          
          validateForms('#consultation form');
          validateForms('#call form');
          validateForms('#questions form');

          $('input[name=phone]').mask("+38 (999) 999-9999");

          $('form').submit(function(e) {
            e.preventDefault();
            if (!$(this).valid()){
                return;
              }
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation, #call').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
    
                $('form').trigger('reset');
            });
            return false;
        });
    
        function toggleSlide(item){
          $(item).each(function(i){
            $(this).on('click',function(e){
              e.preventDefault();
              $('.price__item').eq(i).toggleClass('price__item_active');
              $('.price__item-list').eq(i).toggleClass('price__item-list_active');
            })
          });
        };
    
          toggleSlide('.price__descr-button');
          toggleSlide('.price__list-button');

          $('.opinion__carousel').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 1,
            variableWidth: true,
            arrows: true,
            dots:true,
            prevArrow: '<button type="button" class="slick-prev"><img src="Icons/opinions/arrow-left.png"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="icons/opinions/arrow-right.png"></button>',
            responsive: [
              {
                breakpoint: 1201,
                settings: {
                  arrows: false,
                }
              }
          ]
      });
      $(window).scroll(function(){
        if($(this).scrollTop()>1600){
          $('.pageup').fadeIn();
        }else{
          $('.pageup').fadeOut();
        }
      });
      $("a[href^='#up']").click(function(){
        const _href=$(this).attr("href");
        $("html, body").animate({scrollTop:$(_href).offset().top+"px"});
        return false;
      });              
});


