$(document).ready(function(){

  $('.contact_submit').on('click', function(){
    $('span.contact_result').text("");
    var form = $('#contact');
    var data = {
      name: form.find('[name=name]').val(),
      address: form.find('[name=address]').val(),
      cellphone: form.find('[name=cellphone]').val(),
      email: form.find('[name=email]').val()
    }
    console.log(data);
    _.each(form.find('input.required'), function(input){
      var val = $(input).val();
      if(! val){
        $(input).addClass('input-error');
      }else{
        $(input).removeClass('input-error');
      }
    });
    if(form.find('.input-error').length === 0){
      $.post('/new_contact', data, function(data){
        $('span.contact_result').text(data);
        $('#contact input').val("");
        $('.contact_submit').remove();
      });
    }
  });

});
