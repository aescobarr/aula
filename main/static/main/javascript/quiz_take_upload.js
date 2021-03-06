$(document).ready( function () {
    $("#fileupload").fileupload({
        dataType: 'json',
        formData: [
            { name: "csrfmiddlewaretoken", value: "{{ csrf_token }}"}
        ],
        add: function (e, data){
            var uploadFile = data.files[0];
            var goUpload = true;
            if (!(/\.(zip)$/i).test(uploadFile.name)) {
                toastr.error('Només es permeten fitxers zip');
                goUpload = false;
            }
            if (goUpload == true) {
                data.submit();
            }
        },
        done: function (e, data) {
          if (data.result.is_valid) {
            $("#gallery tbody").html(
            "<tr id='tr_" + data.result.id + "'>" +
                "<td>" +
                    "<a target='_blank' href='" + data.result.url +  "'>" +
                        "Fitxer pujat amb èxit!" +
                    "</a> <i class='fas fa-thumbs-up'></i>" +
                "</td>" +
                "<td>" +
                    "<a href='#' class='btn btn-danger btn-sm btn-del btn-del-img deleteFile' id="+ data.result.id +">Eliminar</a>" +
                "</td>" +
            "<tr>");
            $('#file_name').val(data.result.url);
            $('.end_button').show();
          }else{
            alert(data.result.error_imagen);
          }
        }
    });

    var complete = function(quizrun_id, file_path){
        $.ajax({
            url: _quiz_complete_upload,
            data: {'id':quizrun_id,'path':file_path},
            method: 'POST',
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    var csrftoken = getCookie('csrftoken');
                    xhr.setRequestHeader('X-CSRFToken', csrftoken);
                }
            },
            success: function( data, textStatus, jqXHR ) {
                toastr.success('Prova finalitzada!');
                window.location.href = _quiz_complete_url;
            },
            error: function(jqXHR, textStatus, errorThrown){
                toastr.error('Error completant prova');
            }
        });
    };

    $(".js-upload-photos").click(function () {
        $("#fileupload").click();
    });

    $("#done-button").click(function () {
        var file_path = $('#file_name').val();
        complete(quizrun_id,file_path);
    });

    $(document).on('click', '.deleteFile', function() {
        if( confirm("Eliminar el fitxer?") ){
            $("#gallery tbody").html('');
            $('.end_button').hide();
        }
    });
});