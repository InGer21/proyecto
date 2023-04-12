const closeChatButton = document.querySelector('.chat-close-icon');
const chatContainer = document.querySelector('.chat-container');
const botContainer = document.querySelector('.bot-container');
const buttonContainer = document.querySelector('.button-container');
const startChatButton = document.querySelector('.start-chat-button');
const botPopup = document.querySelector('.bot-popup');
const buttonSpanAnimation = document.querySelector('.span-animation')
const chatScrollbar = document.querySelector('.chat-scrollbar');


function centrarPopup() {
    //Se obtiene los valores del tamano del contenedor padre y el contenedor hijo
    let botContainerWidth = botContainer.offsetWidth;
    let botContainerHeight = botContainer.offsetHeight;
    let popupWidth = botPopup.offsetWidth;
    let popupHeight = botPopup.offsetHeight;

    //Calcula la posicion y la centra
    let leftPosition = (botContainerWidth - popupWidth) / 2;
    let topPosition = (botContainerHeight - popupHeight) / 2;

    //Aplica el valor obtenido al HTML
    botPopup.style.position = "relative";
    botPopup.style.left = leftPosition + "px";
    botPopup.style.top = topPosition + "px";
}

var gifs = ["../static/img/default.gif", "../static/img/sleepstart.gif", "../static/img/sleeploop.gif", "../static/img/sleepend.gif"];
var currentGif = 1;
var gifIndex = 0
let intervalID = setInterval(changeGif, 6000);


function changeGif() {
    var botBackground = document.querySelector('.bot-background');
    if (currentGif === 1) {
        clearInterval(intervalID); // detener el intervalo actual
        botBackground.style.backgroundImage = "url('" + gifs[gifIndex] + "')";
        gifIndex++;
        currentGif = 2;
        intervalID = setInterval(changeGif, 8000); // primero ejecuta [0] default.gif luego lo aumenta para iniciar un nuevo intervalo con un tiempo de 10 segundos
        console.log("currentGif === 1")
    } else if (currentGif === 2) {
        clearInterval(intervalID);
        botBackground.style.backgroundImage = "url('" + gifs[gifIndex] + "')";
        gifIndex++
        currentGif = 3;
        intervalID = setInterval(changeGif, 2000); // ejecuta [1] sleepstart luego lo aumenta iniciar un nuevo intervalo con un tiempo de 2 segundos
        console.log("currentGif === 2")
    } else if (currentGif === 3) {
        clearInterval(intervalID);
        botBackground.style.backgroundImage = "url('" + gifs[gifIndex] + "')"
        gifIndex++;
        currentGif = 4;
        console.log("currentGif === 3")
        intervalID = setInterval(changeGif, 2000);

    } else if (currentGif === 4) {
        clearInterval(intervalID);
        // Agregar event listeners para cambiar currentGif a 1 al hacer clic
        window.addEventListener('click', restartGifCycle);
        console.log("currentGif === 4")
    }
    
    function restartGifCycle() {
        clearInterval(intervalID);
        botBackground.style.backgroundImage = "url('" + gifs[3] + "')";
        gifIndex = 0;
        currentGif = 1;
        intervalID = setInterval(changeGif, 4000);
    }
}

//cuando carga la pagina y cuando cambia de tamano llama a la funcion para centrar siempre al robot 
window.addEventListener("load", centrarPopup);
window.addEventListener("resize", centrarPopup);


//Funciones para abrir y cerrar el chat
startChatButton.addEventListener('click', openChat);

function openChat() {
    botContainer.setAttribute('id', 'inactive');
    buttonContainer.setAttribute('id', 'inactive');
    chatContainer.removeAttribute('id', 'inactive');
}

closeChatButton.addEventListener('click', closeChat);

function closeChat() {
    chatContainer.setAttribute('id', 'inactive');
    botContainer.removeAttribute('id', 'inactive');
    buttonContainer.removeAttribute('id','inactive');
}
window.onload = function setSpanClasses(){
    var spans = document.querySelectorAll(".start-chat-button span");
    for (var i = 0; i < spans.length; i++) {
        var delay = i * 150 + 15 * i * i;
        setTimeout(function(index) {
            return function() {
                spans[index].setAttribute("id","span-animation-" + (index+1));
                startChatButton.setAttribute("id","start-chat-button-hovered");
            }
        }(i), delay);
    }

};



//Funcion para conectar la base de datos al input
$(function () {
    $('form').on('submit', function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '',
            data: formData,
            success: function (response) {
                $('#chat-area').append('<div class="messages-container"><span class="user-messages">' + response.input_usuario + '</span><span class="automated-messages">' + response.resultado + '</span></div>');
                $('input[name="input_usuario"]').val('');
                chatScrollbar.scrollTop = chatScrollbar.scrollHeight;
            }
        });
    });
});
