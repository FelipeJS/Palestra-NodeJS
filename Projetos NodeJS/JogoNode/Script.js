var nome = '';
        var iosocket = io.connect();

        $(function () {

            iosocket.on('connect', function () {
                $('#incomingChatMessages').append($('<li>Connected</li>'));

                iosocket.on('message', function (message) {
                    $('#incomingChatMessages').append($('<li></li>').text(message));
                });
                iosocket.on('disconnect', function () {
                    $('#incomingChatMessages').append('<li>Disconnected</li');
                });
            });

            $('#outgoingChatMessage').keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    iosocket.send($('#outgoingChatMessage').val());
                    $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
                    $('#outgoingChatMessage').val('');
                }
            });
        });

        $(document).ready(function () {
            $('.Jogador1 img#chute').hide();
            $('.Jogador1 img#cabeca').hide();
            $('.Jogador1 img#soco').hide();
            $('.Jogador1 img#super').hide();

            $('.Jogador2 img#chute').hide();
            $('.Jogador2 img#cabeca').hide();
            $('.Jogador2 img#soco').hide();
            $('.Jogador2 img#super').hide();

            //$('#Conversa').hide();
            //$('#Life').hide();
            //$('#Jogadores').hide();

            $('#Iniciar').button(function () {
                $('#Iniciar').click(iniciar());
            });

            $('#Listar').click(function () {
                listar();
            });
        });

        function listar() {
            socket.emit('listar');
        }

        function iniciar() {
            socket.emit('iniciar', nome);
            $('#Login').hide();

            $('#Conversa').show();
            $('#Life').show();
            $('#Jogadores').show();
        }

        function comando() {
            var jogador = socket.emit('comando', socket.id);

            if (jogador == 'Jogador1') {
                $(document).keydown(function (key) {
                    switch (parseInt(key.which, 10)) {
                        //ESQUERDA
                        case 37:
                            $('.Jogador1 img').animate({ "left": "-=3em" }, "fast");
                            break;
                            //CIMA
                        case 38:
                            $('.Jogador1 img').animate({ "top": "-=3em" }, "fast");
                            break;
                            //DIREITA
                        case 39:
                            $('.Jogador1 img').animate({ "left": "+=3em" }, "fast");
                            break;
                            //BAIXO
                        case 40:
                            $('.Jogador1 img').animate({ "top": "+=3em" }, "fast");
                            break;
                            //SOCO
                        case 65:
                            $('.Jogador1 img').hide();
                            $('.Jogador1 img#soco').show();
                            break;
                        case 87:
                            $('.Jogador1 img').hide();
                            $('.Jogador1 img#cabeca').show();
                            break;
                        case 68:
                            $('.Jogador1 img').hide();
                            $('.Jogador1 img#chute').show();
                            break;
                        case 83:
                            $('.Jogador1 img').hide();
                            $('.Jogador1 img#super').show();
                            break;
                        default:
                            $('.Jogador1 img').hide();
                            $('.Jogador1 img#parado').show();
                            break;
                    }
                });
            }

            if (jogador == 'Jogador2') {
                $(document).keydown(function (key) {
                    switch (parseInt(key.which, 10)) {
                        //ESQUERDA
                        case 37:
                            $('.Jogador2 img').animate({ "left": "-=3em" }, "fast");
                            break;
                            //CIMA
                        case 38:
                            $('.Jogador2 img').animate({ "top": "-=3em" }, "fast");
                            break;
                            //DIREITA
                        case 39:
                            $('.Jogador2 img').animate({ "left": "+=3em" }, "fast");
                            break;
                            //BAIXO
                        case 40:
                            $('.Jogador2 img').animate({ "top": "+=3em" }, "fast");
                            break;
                            //SOCO
                        case 65:
                            $('.Jogador2 img').hide();
                            $('.Jogador2 img#soco').show();
                            break;
                        case 87:
                            $('.Jogador2 img').hide();
                            $('.Jogador2 img#cabeca').show();
                            break;
                        case 68:
                            $('.Jogador2 img').hide();
                            $('.Jogador2 img#chute').show();
                            break;
                        case 83:
                            $('.Jogador2 img').hide();
                            $('.Jogador2 img#super').show();
                            break;
                        default:
                            $('.Jogador2 img').hide();
                            $('.Jogador2 img#parado').show();
                            break;
                    }
                });
            }
        }