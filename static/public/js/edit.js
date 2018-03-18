

function authenticate()
{
    console.log("here!");

    var req = new XMLHttpRequest();

    var endpoint = "https://ygvhbipn39.execute-api.us-east-1.amazonaws.com/prod";
    var data = {
        "Bearer": "k6t62V^4Kq!3"
    };

    // $.post(endpoint, data, function(result){
    //     console.log(result);
    // });

    $.ajax({
        url: endpoint,
        headers: {
            "Content-Type":"application/json"
        },
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function (response){
            console.log('succes: ' + response);
        }
    });
}