var ready_for_capture = false;

var server = 'http://54.94.221.41:5000/';
//var server = 'http://127.0.0.1:5000/';
var matricula = "";

$('#cadastrar').click(function () {
    ready_for_capture = true;
});

tracker.on('track', function (event) {
    image_is_locked = false;
    event.data.forEach(function (rect) {
        context.strokeStyle = '#7859a9';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.lineWidth = 2;
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

        var sourceX = rect.x;
        var sourceY = rect.y;
        var sourceWidth = rect.width + 5;
        var sourceHeight = rect.y + rect.height + 22;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;

        crop_context.clearRect(0, 0, width, height);
        crop_context.drawImage(image, sourceX, sourceY, sourceWidth,
                sourceHeight, destX, destY, destWidth, destHeight);

        if (ready_for_capture) {
            if (images_captured < 10) {
                params = {
                    'nome': $('#nome').val(),
                    'email': $('#email').val(),
                    'imagem': canvas_crop.toDataURL('image/jpeg')
                };

                $.post(server + 'cadastrar',
                        params, function (data, status) {
                            if (data.status_cadastro) {
                                $('#resposta').show();
                                $('#resposta').html(data.resposta +
                                        ' Imagens capturadas: ' + images_captured);
                                images_captured += 1;
                                matricula = data.matricula;
                            }
                        });
            } else if (images_captured >= 10) {
                params = {
                    'email': $('#email').val()
                };
                $.post(server + 'processar_arquivos',
                        params, function (data, status) {
                            $('#resposta').html(data.resposta +
                                    ' Matricula: ' + matricula);
                        });
                ready_for_capture = false;
            }
        }

    });
});
