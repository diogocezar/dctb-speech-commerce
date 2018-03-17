const Speech = {
    recognizer : null,
    talker     : null,
    numScreen  : 1,
    msg        : null,
    voices     : null,
    init: () => {
        Speech.config();
        Speech.talk('Olá, bem vindo ao sistema de comércio por voz! Clique em começar.');
        Speech.setButton(Speech.numScreen);
    },
    setButton: (screen) => {
        var old_element = document.getElementById("btn");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        new_element.addEventListener('click', function () {
            Speech.screen(screen);
        });
    },
    changeButtonText: (value) => {
        document.querySelector('#btn').innerHTML = value;
    },
    screen: (num) => {
        switch(num){
            case 1:
                Speech.talk('Vamos listar os produtos!');
                Speech.changeButtonText('LISTAR PRODUTOS');
                Speech.setButton(2);
            break;
            case 2:
                Speech.talk('Produto 1, TV LG 4K, custa dois mil reais.');
                Speech.changeButtonText('PRÓXIMO');
                Speech.setButton(3);
            break;
            case 3:
                Speech.talk('Produto 2, Celular Motorola, custa mil e quinhentos reais.');
                Speech.changeButtonText('PRÓXIMO');
                Speech.setButton(4);
            break;
            case 4:
                Speech.talk('Qual desses você gostaria?');
                Speech.changeButtonText('FALAR');
                document.querySelector('#btn').classList.add("speech-btn");
                var old_element = document.getElementById("btn");
                var new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                new_element.addEventListener('click', function () {
                    Speech.recognize();
                });
            break;
        }
    },
    config: () => {
        window.SpeechRecognition = window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
        window.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || null;
        if (window.SpeechRecognition === null || window.SpeechSynthesisUtterance === null) {
            document.querySelector("#unsupported").classList.remove('hidden');
            document.querySelector("#all").classList.add('hidden');
        }
        else{
            Speech.recognizer            = new window.SpeechRecognition();
            Speech.recognizer.continuous = false;
            Speech.recognizer.lang       = 'pt-BR';

            Speech.voices                = window.speechSynthesis.getVoices();
            Speech.msg                   = new SpeechSynthesisUtterance();
            Speech.msg.voice             = Speech.voices[10];
            Speech.msg.voiceURI          = 'native';
            Speech.msg.volume            = 1;
            Speech.msg.rate              = 1;
            Speech.msg.pitch             = 1;
            Speech.msg.text              = text;
            Speech.msg.lang              = 'pt-BR';
        }
    },
    talk: (text) => {
        Speech.msg.text = text;
        speechSynthesis.speak(Speech.msg);
        document.querySelector('#text').innerHTML = text;
    },
    recognize: () => {
        document.querySelector('.speech-btn').addEventListener('click', function(){
            Speech.recognizer.stop();
            try{
                Speech.recognizer.start();
            }
            catch(ex){
                console.log(ex);
                Speech.talk('Não consegui entender, pode dizer novamente?');
            }
        });
        Speech.recognizer.onresult = function (event) {
            var last = event.results.length - 1;
            var text = event.results[last][0].transcript;
            if(text == "" || text == null){
                Speech.talk('Não consegui entender, pode dizer novamente?');
            }
            else{
                var textLower = text.toLowerCase();
                if (textLower.includes("tv") || textLower.includes("televisão")){
                    Speech.talk('Certo, estamos enviando a TV LG 4K para seu endereço. Compra efetuada com sucesso!');
                    Speech.changeButtonText('OBRIGADO!');
                }
                if (textLower.includes("celular")) {
                    Speech.talk('Certo, estamos enviando Celular Motorola para seu endereço. Compra efetuada com sucesso!');
                    Speech.changeButtonText('OBRIGADO');
                }
            }
        };
    }
};

Speech.init();