/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    if ($('#productFilter').length) {
        var formProductFilter = $("#productFilter");

        $(document).on("click", "#productFilter button.tag-with-cross", function () {
            var tag = $(this),
                    selectType = tag.attr("data-type"),
                    select = $('select[name="' + selectType + '"]', formProductFilter),
                    valSlug = 'tagged-' + $("span", tag).text().replace(/\s/, "-");
            select.val($("option:first-child", select).val());
            tag.remove();
            select.removeClass(valSlug);
            formProductFilter.submit();
        });

        $(document).on("change", "#productFilter select", function (e) {
            e.preventDefault();
            var defaultVal = $("option:first-child", $(this)).val(),
                    newText = $(this).children("option:selected").text(),
                    newVal = $(this).val(),
                    newValSlug = 'tagged-' + newVal.replace(/\s/, "-");
            if (($(this).val() !== defaultVal) && !$(this).is("." + newValSlug)) {
                var tag = '<button type="button" class="tag tag-grey tag-with-cross"  data-value="' + newVal + '" data-type="' + $(this).attr("name") + '"><span>' + newText + '</span><i class="main-icons icon-cross"></i></button>';
                $(this).closest("form").children(".tags").append(tag);
                $(this).val(defaultVal).trigger("change").addClass(newValSlug);
                formProductFilter.submit();
            }


        });

        $(document).on("submit", "#productFilter", function (e) {
            e.preventDefault();
            var loader = '<div class="row mobile-padding"><img id="loader" src="http://dev.cloudcell.co.uk/bin/loading.gif"/>Loading</div>';
            $("#categories").empty().append(loader);
            var data = '',
                    url = formProductFilter.attr("action");

            $(".tags button", formProductFilter).each(function () {
                data = data + '&' + $(this).attr("data-type") + '=' + encodeURIComponent($(this).attr("data-value"));
            });

            data = data + "&type=10890";
            var cHash = $().crypt({method: "md5", source: data});
            data = data + "&cHash=" + cHash;
            var formSent = $.get(url, data);

            formSent.done(function (results) {
                var content = $(results).find('.tx-odproducts');
                $("#categories").empty().append(content);
                if ($('.data-list tr').length) {
                    $('.data-list tr').each(fileRowSize);
                }

            }).fail(function (xhr, textStatus, errorThrown) {
                console.log("Form sent thru AJAX in the following URI format:\n?q=search term&selectName[]=value)\n\nSent to: " + url + "\n\ndata: " + data);
            });
        });

        $(document).on("click", ".pagination a", function (e) {
            e.preventDefault();
            var url = $(this).attr("href");
            var data = "type=10890";
            var formSent = $.get(url, data);
            var loader = '<div class="row mobile-padding"><img id="loader" src="http://dev.cloudcell.co.uk/bin/loading.gif"/>Loading</div>';
            $("#support").empty().append(loader);
            formSent.done(function (results) {
                var content = $(results).find('.tx-odproducts');
                $("#categories").empty().append(content);
                if ($('.data-list tr').length) {
                    $('.data-list tr').each(fileRowSize);
                }

            });
        });



    }
});


