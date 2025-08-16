// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

// Función para agregar amigos
function agregarAmigo() {
  let input = document.getElementById("amigo");
  let nombre = input.value.trim();

  if (nombre === "") {
    alert("Por favor, inserte un nombre.");
    return;
  }

  if (amigos.length >= 20) {
    alert("Máximo 20 amigos permitidos.");
    input.value = "";
    return;
  }

  if (amigos.includes(nombre)) {
    alert("Ese nombre ya fue agregado.");
    input.value = "";
    return;
  }

  amigos.push(nombre);
  mostrarLista();
  input.value = "";
}

// Mostrar lista de amigos
function mostrarLista() {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach((amigo) => {
    let li = document.createElement("li");
    li.textContent = amigo;
    lista.appendChild(li);
  });
}

// Función para sortear todos los amigos de una sola vez
function sortearAmigo() {
  if (amigos.length < 2) {
    alert("Debe haber al menos 2 amigos para el sorteo.");
    return;
  }

  let asignados;
  let valido = false;

  // Repetir hasta que no haya autoasignaciones
  while (!valido) {
    asignados = [...amigos].sort(() => Math.random() - 0.5);
    valido = true;

    for (let i = 0; i < amigos.length; i++) {
      if (amigos[i] === asignados[i]) {
        valido = false;
        break;
      }
    }
  }

  mostrarResumen(asignados);
}

// Mostrar tabla resumen en un popup
function mostrarResumen(asignados) {
  let resumen = "<table border='1' cellpadding='5' style='border-collapse:collapse; width:100%'>";
  resumen += "<tr><th>Amigo</th><th>Amigo Secreto</th></tr>";

  for (let i = 0; i < amigos.length; i++) {
    resumen += `<tr><td>${amigos[i]}</td><td>${asignados[i]}</td></tr>`;
  }

  resumen += "</table>";

  let popup = window.open("", "Resumen", "width=500,height=600,scrollbars=yes");
  popup.document.write("<h2>🎁 Resumen de Amigos Secretos</h2>");
  popup.document.write(resumen);
  popup.document.write("<br><button onclick='window.close()'>Cerrar</button>");

  popup.onbeforeunload = reiniciarJuego; // al cerrar se reinicia
}

// Reiniciar el juego
function reiniciarJuego() {
  amigos = [];
  document.getElementById("listaAmigos").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
}
