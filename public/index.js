'use strict';
require("./test.js");
jQuery(document).ready(function($) {

    let form = $('.new-entry');
    $(form).submit(function(event) {
        event.preventDefault();

        let title = $("#title").val();
        let content = $('#content').val();
        
        $.ajax({
            url: "/guestbook/new",
            method: "POST",
            data: {
                "title": title,
                "content": content
            },
            success: function(data) {
               let div = $.parseHTML("<div></div>");
                $(div).html(data);
               
                let newEntries = $(".entry" , div);
              
                $("#guestbook-entries .entry").remove(); 
                
                newEntries.each(function(i, newEntry) {
               $("#guestbook-entries").append(newEntry);
                }); 
               
                 }    
            });
        })
    });

