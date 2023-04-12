$(function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        type: 'POST',
        url: '',
        data: formData,
        success: function(response) {
          $('#chat-area').append('<div class="message"><span class="user-input">' + response.input_usuario + '</span><span class="bot-response">' + response.resultado + '</span></div>');
          $('input[name="input_usuario"]').val('');
        }
      });
    });
  });