var ready_for_capture = false;

$('#cadastrar').click(function () {
    ready_for_capture = true;
});

tracker.on('track', function (event) {
    image_is_locked = false;
    event.data.forEach(function (rect) {
        context.strokeStyle = '#7859a9';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
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

                $.post('http://54.94.221.41:5000/cadastrar',
                        params, function (data, status) {
                            if (data.status_cadastro) {
                                images_captured += 1;

                                $('#resposta').html(data.resposta +
                                        ' matricula: ' + data.matricula +
                                        ' imagens capturadas: ' + images_captured);
                            }
                        });
            } else if (images_captured > 10) {
                params = {
                    'email': $('#email').val()
                };
                $.post('http://54.94.221.41:5000/processar_arquivos',
                        params, function (data, status) {
                            console.log(status, data);
                        });
            }
        }

    });
});
