//carousel

//Array storage class
let carouselArr = [];

//class Carousel
class Carousel {
    // ADICIONADO: Construtor para mapear os dados passados no HTML
    constructor(image, title, link) {
        this.image = image;
        this.title = title;
        this.link = link;
    }
    // Inicia o carrossel: recebe um array de itens e intervalo em ms (opcional)
    static Start(arr, intervalMs = 3000){
        if (!arr || !arr.length) throw "Method Start need a non-empty Array variable.";

        Carousel._items = arr;
        Carousel._size = arr.length;
        Carousel._sequence = 0;
        Carousel._intervalMs = intervalMs;

        // Renderiza o primeiro slide e inicia autoplay
        Carousel.RenderCurrent();
        Carousel._interval = setInterval(() => { Carousel._nextInternal(); }, Carousel._intervalMs);
    }

    // Renderiza o item atual (usado por Next e Prev)
    static RenderCurrent(){
        const carouselDiv = document.getElementById("carousel");
        const titleDiv = document.getElementById("carousel-title");
        if (!carouselDiv || !titleDiv) return;

        const currentItem = Carousel._items[Carousel._sequence];
        if (!currentItem) return;

        carouselDiv.style.backgroundImage = `url('img/${currentItem.image}')`;
        carouselDiv.style.backgroundSize = 'cover';
        carouselDiv.style.backgroundPosition = 'center';
        titleDiv.innerHTML = `<a href="${currentItem.link}">${currentItem.title}</a>`;
    }

    // Avança para o próximo slide (chamado por botões ou externamente)
    static Next(){
        Carousel._nextInternal();
        Carousel._restartInterval();
    }

    // Volta para o slide anterior
    static Prev(){
        Carousel._prevInternal();
        Carousel._restartInterval();
    }

    // incrementador interno sem reiniciar intervalo
    static _nextInternal(){
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel.RenderCurrent();
    }

    // decrementador interno sem reiniciar intervalo
    static _prevInternal(){
        Carousel._sequence = (Carousel._sequence - 1 + Carousel._size) % Carousel._size;
        Carousel.RenderCurrent();
    }

    // Reinicia o autoplay (útil quando o usuário navega manualmente)
    static _restartInterval(){
        if (!Carousel._intervalMs) return;
        if (Carousel._interval) clearInterval(Carousel._interval);
        Carousel._interval = setInterval(() => { Carousel._nextInternal(); }, Carousel._intervalMs);
    }
}

// Função global usada no HTML: muda slide para frente/tras conforme parâmetro
window.mudarSlide = function(n){
    if (n > 0) Carousel.Next(); else Carousel.Prev();
};
 