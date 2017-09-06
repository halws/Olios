// $(function () {
// 	console.log($(body));
// 	var template = $('#productHandlebars').html();
// var templateScript = Handlebars.compile(template);

// $.getJSON('assets/js/Accesories.json', function(data) {
// 	var context = data;
// 	var html = templateScript(context);
//         // window.location.hash = "#";
//         // products = data;
//         // filter = 'livingRoom';
//         // renderFiltered(data[filter], filter);
//         // $(window).trigger('hashchange');
//         // data.each(function(index, el) {
//         // 	console.log(index + " "  + el);
//         // });
//         // console.log(typeof(data));
//         // for (var el in data) {
//         // 	console.log(el);
//         // }
//         // renderItems();
//     });
// $(document.body).append(html);
// });
$(function() {
    // console.log($(body));
    var template = $('#productHandlebars').html();
    var templateScript = Handlebars.compile(template);
    var context = false;

    function getJSON(json) {
        $.getJSON('assets/js/' + json + '.json', function(data) {
            // var context = data;
            renderData(data);
        });

    }
    

    function renderData(data) {
        var html = templateScript(data);
        if ($('.rendered').children().length==0) {
        $('.rendered').append(html);
        	console.log("0");

        } else {
        $('.rendered').empty().append(html);
        	console.log("1");
        	
        }
        console.log('success');
    }
    $('.buttons li').each(function(index, el) {
        $(this).click(function() {
        	getJSON($(this).data('json'));
        	console.log($('.rendered').children().length);
            // console.log($(this).text());
            // $('.rendered').children().replaceWith(renderData(data));
            // console.log($(this).data('json'));
            // console.log($('.rendered').children());

        });
    });
})