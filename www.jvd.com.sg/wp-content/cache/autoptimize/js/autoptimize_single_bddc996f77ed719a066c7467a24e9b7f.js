(function($){$('#toggle-menu').click(function(){$('body').toggleClass('menu-open');$('#menu').toggleClass('is-open');$button=$(this);$button.attr('aria-expanded',$button.attr('aria-expanded')=='false'?'true':'false');});$(document).on('click',function(event){if(!$(event.target).closest('#menu').length&&!$(event.target).closest('.header').length){$('#menu').removeClass('is-open');$('body').removeClass('menu-open');$('#toggle-menu').attr('aria-expanded','false');}});$('.nav-main .menu-item-has-children > a').click(function(){$(this).closest('li').siblings().find('.sub-menu').slideUp();$(this).next('ul.sub-menu').slideToggle();return false;});$('a[href="#"].btn').click(function(){return false;});$('.search-form input[type=search]').blur(function(){$('.nav-tools__search').removeClass('is-focused');}).focus(function(){$('.nav-tools__search').addClass('is-focused');});$('.nav-tools li').hover(function(){$(this).siblings().removeClass('is-focused');});})(jQuery);