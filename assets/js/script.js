$(function() {


    //handlebars and other
    var productCategory = "";
    var products = [];
    var filter = '';
    // render content for products
    function renderItems() {
        var rightNavBtns = $(".rightNav a");
        var rightNavBtnsFilters = ["livingRoom", "office", "forKids", "kitchen", "accesories"];
        // console.log(typeof(rightNavBtns));
        rightNavBtns.each(function(index, el) {
            $(this).click(function(event) {
                    if ($(".openNav").length) {
                        console.log("has Class");
                $("#rightBtn").trigger('click');
                $("body").removeClass('stopOverflow');
                        // statement
                    }else{
                        
                        console.log("don't has Class");
                    }
                event.preventDefault();
                renderFiltered(products[rightNavBtnsFilters[index]], rightNavBtnsFilters[index]);
                var tl = new TimelineLite();
                    $(".product").removeClass('visible');
                tl.to(window,1.5,{scrollTo:"#products"},"+=0.4")
                .staggerFrom($(".animated"), 1, { css: { right: "-120px", opacity: 0 }, ease: Sine.easeIn }, 0.2,"-=1");
                // animateTiles();

            });
        });

    }

    $.getJSON('assets/js/items.json', function(data) {
        window.location.hash = "#";
        products = data;
        filter = 'livingRoom';
        renderFiltered(data[filter], filter);
        $(window).trigger('hashchange');

        renderItems();
    });

    $(window).on('hashchange', function(event) {
        render(decodeURI(window.location.hash));
    });
    //render handlebars template with selected data
    function renderFiltered(renderData, filter) {
        var template = $("#productHandlebars").html(),
            templateScript = Handlebars.compile(template),
            html = templateScript(renderData);
        $(".items .container .row").empty()
            .append(html)
            .find(".col")
            .on('click', function(event) {
                event.preventDefault();
                var productData = $(this).data('index');
                productCategory = $(this).data("category");
                window.location.hash = 'product/' + productCategory + "/" + productData;
            });
        //logo changer
        $(".topInfo, .category").find('#subLogo')
            .css('backgroundImage', "url(" + products.icons[filter][0] + ")")
            .end()
            .find('p').text(products.icons[filter][1]);
    }


    function render(url) {
        var temp = url.split("/")[0];
        var map = {
            '': function() {
                renderProductsPage(products);
            },
            '#product': function() {
                var index = url.split("#product/" + productCategory + "/")[1].trim();
                renderSingleProductPage(index, productCategory, products);
            }
        };
        if (map[temp]) { map[temp](); } else {

        }
    }

    function renderSingleProductPage(index, productCategory, data) {
        var product = $(".product"),
            productDesc = $(".product-desc"),
            selectedData = '';
        $("body").addClass('stopOverflow');
        data[productCategory].forEach(function(element) {
            if (element.id == index) {
                selectedData = element;
                productDesc.find('h2 span').text(element.name).end()
                    .find('p').text(element.shortInfo).end()
                    .find('#productPrice').text("$" + element.price).append("<span>" + (parseInt(element.price) + (parseInt(element.price) * 0.1)).toFixed() + "</span>").end();
                product.addClass('visible');
                $(".picture img").each(function(index) {
                    $(this).attr('src', element.image[index]);
                });
            }
        });
    }
    console.log($('.slick-active '));

    function renderProductsPage(data) {
        var page = $(".products"),
            allProducts = page.find('li');

    }

    //STAFFFFF

    //GSAP
    function animateTiles() {
        var animated = $(".animated");
        TweenMax.staggerFrom($(".animated"), 1, { css: { right: "-120px", opacity: 0 }, ease: Sine.easeIn, delay: -0.5 }, 0.2);

    }
    $("#viewMore").click(function(event) {
        event.preventDefault();
        console.log("Wtf");
        TweenLite.to(window,1.5,{scrollTo:"#products"});
    });
    $(".fa-home").click(function(event) {
        event.preventDefault();
            $(".product").removeClass('visible');
        TweenLite.to(window,1.5,{scrollTo:"#top"});
    });



    //navicon
    $("#rightBtn").click(function(event) {
        event.preventDefault();
        $("body .wrapper").find('.lines').toggleClass('close')
            .end()
            .find('.rightNav').toggleClass('openNav');
        $(".shadow").toggleClass('visible');
        $("body").toggleClass('stopOverflow');
        OutOfShadowChecker();
    });

    //closeIcon
    $("#closeBtn").click(function(event) {
        event.preventDefault();
        $(".product").removeClass('visible');
        renderItems();
        $("body").removeClass('stopOverflow');
    });


    function OutOfShadowChecker() {
        $(".shadow").click(function(event) {
            event.preventDefault();
            $("#rightBtn").trigger('click');

        });

        //

    }
    //slick
    $(".slider").slick({
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        accesebility: false,
        infinite: false
    });


});
