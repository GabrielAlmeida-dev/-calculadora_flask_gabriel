function calcularSoma() {
    const v1 = document.getElementById("valor1").value;
    const v2 = document.getElementById("valor2").value;

    fetch("/api/soma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor1: v1, valor2: v2 })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("resultado").innerText = "Resultado: " + data.resultado;
    });
}

function calcularSubtracao() {
    const v1 = document.getElementById("valor1").value;
    const v2 = document.getElementById("valor2").value;

    fetch("/api/subtracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor1: v1, valor2: v2 })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("resultado").innerText = "Resultado: " + data.resultado;
    });
}

function calcularMultiplicacao() {
    calcularOperacao("multiplicacao");
}

function calcularDivisao() {
    calcularOperacao("divisao");
}

async function calcularOperacao(operacao) {
    const v1 = document.getElementById("valor1").value;
    const v2 = document.getElementById("valor2").value;
    const saida = document.getElementById("resultado");
    if (v1 === "" || v2 === "") {
        saida.innerText = "Preencha os dois valores.";
        return;
    }
    try {
        const resposta = await fetch("/api/" + operacao, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ valor1: v1, valor2: v2 })
        });
        const dados = await resposta.json();
        saida.innerText = dados.erro || ("Resultado: " + dados.resultado);
    } catch (erro) {
        saida.innerText = "Erro ao calcular. Tente novamente.";
    }
}
