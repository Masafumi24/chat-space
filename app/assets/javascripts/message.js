$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-message__box" data-message-id=${message.id}>
          <div class="main-message__box-top">
            <div class="main-message__box-top__user">
              ${message.user_name}
            </div>
              <div class="main-message__box-top__user-text">
                ${message.content}
              </div>
            <div class="main-message__box-top__time">
              ${message.created_at}
            </div>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="main-message__box" data-message-id=${message.id}>
          <div class="main-message__box-top">
            <div class="main-message__box-top__user">
              ${message.user_name}
            </div>
              <div class="main-message__box-top__user-text">
                ${message.content}
              </div>
            <div class="main-message__box-top__time">
              ${message.created_at}
            </div>
          </div>
        </div>`
      return html;
    };
  }
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
});