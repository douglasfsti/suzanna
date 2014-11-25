(function () {
    /*
     *  Definir a resolução do vídeo para 320 x 240 px
     *  quando a resolução estiver definida capturar um frame
     *  periodicamente a partir de um intervalo e desenha-lo em um canvas
     *  posteriormente converter o canvas em uma imagem em escala de cinza.
     *  Após esse procedimento detectar a face na imagem e realizar o crop.
     */
    webcam_init();
    set_video_resolution();

    setInterval(capture_frame, 60);

})();