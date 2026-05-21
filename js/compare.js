
//car
let carArr = [];

class Car {
    constructor(model, price, bedHeight, carHeight, groundClearance, loadCapacity, engine, power, bedVolume, wheel, image, id = null) {
        this.id = id;
        this.model = model;
        this.image = image;
        
        // Ajustado para aceitar os parâmetros dinâmicos ou usar o valor padrão caso venham vazios
        this.bedHeight = bedHeight || "511 mm"; 
        this.carHeight = carHeight || "1821 mm"; 
        this.groundClearance = groundClearance || "232 mm"; 
        this.loadCapacity = loadCapacity || "1234 kg"; 
        
        this.engine = engine;
        this.power = power;
        this.bedVolume = bedVolume;
        this.wheel = wheel;
        this.price = price;
    }
}

// Busca no array se o carro existe, retornando a posição ou -1
function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].model === carClass.model)
            return i;
    }
    return -1;
}

// Adiciona ou remove o carro do array de comparação baseado no checkbox
function SetCarToCompare(el, carClass) {
    if (!(carClass instanceof Car)) {
        throw new Error("You need set a Car Class");
    }

    const exists = GetCarArrPosition(carArr, carClass);

    if (el.checked) {
        if (exists !== -1) {
            return;
        }

        if (carArr.length >= 2) {
            el.checked = false;
            alert("Você só pode comparar 2 carros por vez.");
            return;
        }

        carArr.push(carClass);
        return;
    }

    if (exists !== -1) {
        carArr.splice(exists, 1);
    }
}

// SUA FUNÇÃO ATUALIZADA AQUI: Controla a exibição e valida a quantidade mínima
function ShowCompare() {
    // VALIDAÇÃO: Se o array tiver menos que 2 veículos selecionados (0 ou 1),
    // o sistema exibe o alerta e interrompe a execução com o "return".
    if (carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação"); // Mensagem exigida no Passo 7 [cite: 89]
        return; 
    }

    // Se passar pela validação (tiver exatamente 2 carros), segue o fluxo normal
    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

// Oculta o pop-up de comparação
function HideCompare() {
    document.getElementById("compare").style.display = "none";
}

// Injeta dinamicamente os dados dos carros selecionados nas células correspondentes da tabela
function UpdateCompareTable() {
    const columns = [
        { id: "compare_image", prop: "image", isImage: true },
        { id: "compare_modelo", prop: "model" },
        { id: "compare_alturacacamba", prop: "bedHeight" },
        { id: "compare_alturaveiculo", prop: "carHeight" },
        { id: "compare_alturasolo", prop: "groundClearance" },
        { id: "compare_capacidadecarga", prop: "loadCapacity" },
        { id: "compare_motor", prop: "engine" },
        { id: "compare_potencia", prop: "power" },
        { id: "compare_volumecacamba", prop: "bedVolume" },
        { id: "compare_roda", prop: "wheel" },
        { id: "compare_preco", prop: "price" }
    ];

    for (const column of columns) {
        for (let index = 0; index < 2; index++) {
            const cell = document.getElementById(`${column.id}_${index}`);
            if (!cell) continue;

            if (index < carArr.length) {
                const value = carArr[index][column.prop];
                if (column.isImage) {
                    cell.innerHTML = `<img src="${value}" alt="${carArr[index].model}" style="max-width:200px; max-height:120px;">`;
                } else {
                    cell.textContent = value;
                }
            } else {
                cell.innerHTML = "";
            }
        }
    }
}