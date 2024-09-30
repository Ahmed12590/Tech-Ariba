$('document').ready(function() {

    $('[data-toggle="tooltip"]').tooltip({
        //  placement: 'bottom',
        html: true
    });

    $('.flatpickr').flatpickr();

    let parameters = new URLSearchParams(window.location.search)
    if (parameters.has('dept')) {
        var simple_url = window.location.origin + window.location.pathname // URL without Parameters
        setTimeout(() => {
            $(`#${parameters.get('dept')}`).show();
            $(`.${parameters.get('dept')}`).click();
            $('html, body').animate({
                scrollTop: $("#opening").offset().top
            }, 1000)
        }, 100)
        history.pushState('', 'Careers Page', simple_url);

    }


    ///// Smooth Scroll
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
            location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    }); // Smooth Scroll End

    ///// Service Script
    var $windowWidth = $(window).width();
    if ($windowWidth > 767) {
        var serHeight = $('.serviceSlider').outerHeight();
        $('.serviceHead').height(serHeight);
    }

    ////// Portfolio Tabs
    function portfolioTabs(select) {
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: select,
            layoutMode: 'fitRows',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: true
            }
        });
    }
    portfolioTabs("*");
    $('.portTabs ul li a').click(function() {
        $('.portTabs ul li .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        portfolioTabs(selector);
        return false;
    });

    ///// on Scroll Animation

    function animatePort() {
        console.log('Working');
        $('.block').addClass('active');
    }

    // Parallex Animation
    var $animation_element = $('.block');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_element, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height) / 0.5;

            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                animatePort();
                $window.off('scroll');
            }
        });
    }
    // animatePort();
    $(window).on("scroll", function() {
        check_if_in_view();
    });

    ////// App Dev Inner Page
    var detailHeight = $('.detailText').innerHeight();
    $('.detailPicOuter').css('min-height', detailHeight);

    ////// Case Study Mouse Move
    $(".galleryOuter").on('mousemove', function(e) {
        var width = $(this).innerWidth();
        var height = $(this).innerHeight();
        $('.galleryMain [class^="inner"]').each(function() {
            // var pixelValue = $(this).attr('value');
            var pixelToMove = $(this).attr('value');
            var newValueX = Math.floor((e.clientX / width) * pixelToMove);
            var newValueY = Math.floor((e.clientY / height) * pixelToMove);
            $(this).css({
                'transition-delay': '0s',
                'transition-duration': '0.2s'
            });
            // $(this).css({ 'transform': 'translate(' + newValueX + 'px, ' + newValueY + 'px)' });
            $(this).css({
                'transform': 'matrix(1, 0, 0, 1,' + newValueX + ',' + newValueY + ')'
            });
        });
    });

    ////// Career Tabs
    $('.openingContent').hide('fast');
    $('.openingContent:first-child').show('fast');
    $('.openingTabs ul li a').on('click', function(e) {
        e.preventDefault();
        var careerValue = $(this).attr('value');
        $('.openingContent').removeClass('active').hide();
        $('.' + careerValue).addClass('active').show();
        $('.openingTabs ul li').removeClass('active');
        $(this).parent().addClass('active');
    });

    ////// Job Tabs
    $('.jobBody .content').hide('fast');
    $('.jobBody .content.active').show('fast');
    $('.jobBody .tabs ul li a').on('click', function(e) {
        e.preventDefault();
        var careerValue = $(this).attr('value');
        $('.jobBody .content').removeClass('active').hide();
        $('.' + careerValue).addClass('active').show();
        $('.jobBody .tabs ul li').removeClass('active');
        $(this).parent().addClass('active');
    });

    ////// Partner Tabs
    $('.partnerTabs ul li a').on('click', function(e) {
        e.preventDefault();
        var careerValue = $(this).attr('value');
        $('.partnerBody').removeClass('active').hide();
        $('.' + careerValue).addClass('active').show();
        $('.partnerTabs ul li').removeClass('active');
        $(this).parent().addClass('active');
    });

    ////// Home Portfolio Tabs
    $(window).on('load', function() {
        $('.homePortContent').hide('fast');
        $('.homePortContent.active').show('fast');
        $('.homePortTabs ul li a').on('click', function(e) {
            e.preventDefault();
            var careerValue = $(this).attr('value');
            $('.homePortContent').removeClass('active').hide();
            $('.' + careerValue).addClass('active').show();
            $('.homePortTabs ul li').removeClass('active');
            $(this).parent().addClass('active');
        });
    });

    /////// Careers Slider
    var i = 1;
    var str1 = 'openingSlider'
    var str2 = '.openingSlider';
    $('.openingSlider').each(function(index, value) {

        var classAdd = str1 + i;
        var classCall = str2 + i;
        var next_slider = 'opening-next' + i;
        var prev_slider = 'opening-prev' + i;
        $(this).addClass(classAdd);
        $(this).find(".sliderArrows.left").addClass(prev_slider);
        $(this).find(".sliderArrows.right").addClass(next_slider);
        new Swiper(classCall, {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: false,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: ('.' + next_slider),
                prevEl: ('.' + prev_slider),
            },
            breakpoints: {
                991: {
                    slidesPerView: 1,
                }
            }
        });
        i++;
    });

    /////// Service Slider
    var swiper = new Swiper('.serviceSlider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: true,
        // },
        navigation: {
            prevEl: '.service-prev',
            nextEl: '.service-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
            },
            500: {
                slidesPerView: 1,
            }
        }
    });

    /////// Portfolio Slider
    var swiper = new Swiper('.portfolioSlider', {
        slidesPerView: 3,
        spaceBetween: 0,
        loop: false,
        centeredSlides: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: true,
        // },
        navigation: {
            prevEl: '.portfolio-prev',
            nextEl: '.portfolio-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 1,
            }
        }
    });

    /////// CRM Slider
    var swiper = new Swiper('.crmSlider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: true,
        // },
        navigation: {
            prevEl: '.crm-prev',
            nextEl: '.crm-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 1,
            }
        }
    });

    /////// HRM Slider
    var swiper = new Swiper('.hrmSlider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: true,
        // },
        navigation: {
            prevEl: '.hrm-prev',
            nextEl: '.hrm-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 1,
            }
        }
    });

    /////// Client Slider
    var swiper = new Swiper('.clientSlider', {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: false,
        // centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: '.clients-prev',
            nextEl: '.clients-next',
        },
        breakpoints: {
            1199: {
                slidesPerView: 4,
            },
            767: {
                slidesPerView: 2,
            },
            479: {
                slidesPerView: 1,
            }
        }
    });

    /////// About Slider
    var swiper = new Swiper('.aboutSlider', {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            prevEl: '.about-prev',
            nextEl: '.about-next',
        },
        breakpoints: {
            767: {
                slidesPerView: 1,
            }
        }
    });

    /////// Portfolio Slider
    var swiper = new Swiper('.teamSlider', {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            prevEl: '.team-prev',
            nextEl: '.team-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 1,
            }
        }
    });

    $('#contactform').validate(

        {
            rules: {
                name: {
                    minlength: 2,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    regex: /^[\+]?[(]?[0-9]+[)]?[-\s]?[0-9]+[-\s]?[0-9]+$/
                },
                message: {
                    required: true

                }
            },

            highlight: function(element) {

                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            submitHandler: function(form) {


                $("#result").html('');
                $(".subsBtn").val("Processing...");
                $(".subsBtn").prop('disabled', true);
                var values = $(form).serializeArray();
                $.ajax({
                    url: "./model/form/query.php",
                    type: "post",
                    data: values,
                    success: function(data) {
                        window.location.assign("thankyou.php");
                    },

                    error: function() {
                        //alert("failure");
                        $("#result").html('<h2 class="text-danger">There is error while submit</h2>');
                    }
                });

            },

        });
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

});