$(document).ready(function () {
  $('#btnSayhello').click(function () {
    const name = $('#txtName').val();
    console.log(name);
    $('#SayhelloDiv').html('loading....');

    $.ajax({
      url: 'http://localhost:3000/graphql',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({
        query: `{
             sayHello(name:"${name}")}`,
      }),
      success: function (result) {
        console.log(JSON.stringify(result));
        $('#SayhelloDiv').html('<h1>' + result.data.sayHello + '</h1>');
      },
    });
  });
});
