const fecha = document.querySelector("#fecha");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id = 0;
const tareaList = [];

//fUNCIÓN PARA FECHA ACTUALIZADA
const date = new Date();
fecha.innerHTML = date.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//Función agregar tarea

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }
  const realized = realizado ? check : uncheck;
  const line = realizado ? lineThrough : "";
  const element = `
      <li id="elemento">
        <i class="far ${realized} " data="realizado" id="${id}" ></i>
        <p class="text ${line} "> ${tarea} </p>
        <i class="fas fa-trash" data="eliminado" id="${id}"></i>
      </li>
  `;

  list.insertAdjacentHTML("beforeend", element);
}

//Funciones para tareas eliminadas y realizadas

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  tareaList[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  tareaList[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    tareaList.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }

  input.value = "";
  id++;
  console.log(tareaList);
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      tareaList.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }

    input.value = "";
    id++;
    console.log(tareaList);
  }
});

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
});
