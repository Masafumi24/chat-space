$(function(){
  var buildHTML = function(message) {
    if ( message.content && message.image ) {
      var html =
      `<div class="main-message__box-top" data-message-id=` + message.id + `>` 
            `<div class="main-message__box-top__user">` 
              message.user_name 
            `</div>` 
              `<div class="main-message__box-top__user-text">` 
                message.content
              `</div>`
            `<div class="main-message__box-top__time">` 
              message.created_at
            `</div>` 
          `</div>` 
          `<img src="`+ message.image + `" class="main-message__box-top__img" >`
      `</div>`
    } else if (message.content) {
      var html =
      `<div class="main-message__box-top" data-message-id=` + message.id + `>`
            `<div class="main-message__box-top__user">`
              message.user_name 
            `</div>`
              `<div class="main-message__box-top__user-text">`
                message.content
              `</div>`
            `<div class="main-message__box-top__time">`
              message.created_at
            `</div>`
          `</div>`
      `</div>`
     } else if (message.image) {
            var html =
            `<div class="main-message__box-top" data-message-id=` + message.id + `>`
                  `<div class="main-message__box-top__user">`
                    message.user_name
                  `</div>`
                  `<div class="main-message__box-top__time">`
                    message.created_at
                  `</div>`
                `</div>`
                `<img src="`+ message.image + `" class="main-message__box-top__img" >`
            `</div>`
      };
      return html;
    };

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false,
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-message').append(html);    
    $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});  
    $('form')[0].reset();
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $(".submit-btn").prop('disabled', false);
  });
});
  var reloadMessages = function() {
    var last_message_id = $('.main-message__box-top:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      datatype: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-message').append(insertHTML);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
        }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});