// var dias= ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]
var auxId = 0;
var tasks = [];
var idLastTaks;
var count = 0;

// variable global de utilidad "dont delete"
let q = 0;

setInterval(() => {
    let time = new Date();
    document.getElementById("hora").innerHTML = `Son las ${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`;
}, 1000)


$("#registrarTask").on("click", () => {

    // para conseguir la fecha
    let time = new Date();
    let auxMes = time.getMonth() + 1;
    let fechaCompleta = time.getDate() + "/" + auxMes + "/" + time.getFullYear();






    let task = $("#tarea").val();
    document.getElementById("tarea").value = ""
    if (task != "") {

        if (idLastTaks != undefined) {
            q++
            if (q == 1) {
                auxId = idLastTaks;
            }

        }
        auxId++;


        if (idLastTaks < 1) {

        } else {

            console.log("no lo hizo hizo cxuando es la misma pagian")
            let task2 = {
                "id": `${auxId}`,
                "tarea": `${task}`,
                "fecha": `${fechaCompleta}`,
                "tiempoExacto": `${time.getTime()}`
            }


            // fecha en que se guarda la tarea
            let auxTime = `<span class="fecha">Se registro el ${fechaCompleta}</span>`
            // icono de la basura
            let iconDelete = `<span class="delete d-flex justify-content-center align-items-center" onclick="eliminarTask(this,this.parentNode.children[0].textContent)">
            <lord-icon
            src="https://cdn.lordicon.com/drxwpfop.json"
            trigger="hover"
            state="morph-trash-in"
            style="width:30px;height:30px">
            </lord-icon> 
        </span>`;



            let conntentTaks = `<span>${task}</span>`;


            // Icono de editar
            let editIcon = `<span class="edit d-flex ustify-content-center align-items-center" onclick="editarTask(this,this.parentNode.children[0].textContent)">  
            <lord-icon
            src="https://cdn.lordicon.com/wuvorxbv.json"
            trigger="in"
            delay="1000"
            state="in-dynamic"
            style="width:30px;height:30px">
        </lord-icon>
        </span>`
            // crear li
            let auxLi = `<li class="list-group-item d-flex justify-content-around align-items-center" id="${auxId}"></li>`;

            // agregar todo al html
            $("#tasksHere").append(auxLi);
            $(`#${auxId}`).append(conntentTaks);
            $(`#${auxId}`).append(auxTime);
            $(`#${auxId}`).append(iconDelete);
            $(`#${auxId}`).append(editIcon);

            saveTaskInLocalStorage(task2);
            let auxForBtn = JSON.parse(localStorage.getItem("tasks"))
            console.log(auxForBtn.length)
            if (auxForBtn != null) {
                if (auxForBtn.length > 1) {
                    document.getElementById("btnOrder").style.display = "block"

                }
            }
        }
    }
}
)




function saveTaskInLocalStorage(objeto) {
    tasks.push(objeto);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function getTaksToLocalStorage() {
    let auxtasks = JSON.parse(localStorage.getItem("tasks"));

    if (auxtasks.length > 1) {
        document.getElementById("btnOrder").style.display = "block"

    }


    if (auxtasks == null) {
        alert("no hay nada")


    } else {

        auxtasks.forEach(objec => {
            tasks.push(objec)
        });

        for (let i = 0; i < tasks.length; i++) {
            let tarea = tasks[i];


            let fecha = `<span class="fecha">Se registro el ${tarea.fecha}</span>`;
            let iconDelet = `<span class="delete d-flex justify-content-center align-items-center" onclick="eliminarTask(this,this.parentNode.children[0].textContent)">
                <lord-icon
                src="https://cdn.lordicon.com/drxwpfop.json"
                trigger="hover"
                state="morph-trash-in"
                style="width:30px;height:30px">
                </lord-icon> 
            </span>`;

            let editIco = `<span class="edit d-flex ustify-content-center align-items-center" onclick="editarTask(this,this.parentNode.children[0].textContent)">  
            <lord-icon
            src="https://cdn.lordicon.com/wuvorxbv.json"
            trigger="in"
            delay="1000"
            state="in-dynamic"
            style="width:30px;height:30px">
        </lord-icon>
        </span>`;

            let conntentTaks = `<span>${tarea.tarea}</span>`;

            let auxL = `<li class="list-group-item d-flex justify-content-around align-items-center" id="${tarea.id}"></li>`;



            $("#tasksHere").append(auxL);
            $(`#${tarea.id}`).append(conntentTaks);
            $(`#${tarea.id}`).append(fecha);
            $(`#${tarea.id}`).append(iconDelet);
            $(`#${tarea.id}`).append(editIco);


            idLastTaks = Number.parseInt(tarea.id)
        }

    }

}


function eliminarTask(a, elemento) {
    let auxTasksArray = []
    // obtener el arreglo del local
    let arra = JSON.parse(localStorage.getItem("tasks"))



    let li = a.parentNode.id;


    for (let i = 0; i < arra.length; i++) {
        auxTasksArray.push(arra[i].tarea)
    }

    let indice = auxTasksArray.indexOf(elemento)
    tasks.splice(`${indice}`, 1)
    arra.splice(`${indice}`, 1)
    $(`#${li}`).remove();
    localStorage.setItem("tasks", JSON.stringify(arra))


    if (arra.length < 2) {
        document.getElementById("btnOrder").style.display = "none"
    }

}

function editarTask(spanIcon, antigueValue) {
    // arreglo auxiliar para subir los datos de las tareas
    let arr = []
    // obtener el arreglo del local
    let auxArr = JSON.parse(localStorage.getItem("tasks"))


    if (confirm("¿desea cambiar esta tarea?")) {
        let newValue = prompt(`el antiguo valor es ${antigueValue}, por favor ingrese el nuevo valor:`)
        spanIcon.parentNode.children[0].innerHTML = `${newValue}`;

        auxArr.forEach((o) => {
            arr.push(o.tarea)
        })
        //   obtener la posicion
        let indice = arr.indexOf(antigueValue);
        arr.splice(indice, 1, `${newValue}`);

        auxArr[indice].tarea = `${newValue}`;

        localStorage.setItem("tasks", JSON.stringify(auxArr))
    }

}


function ordenarTodoYDesordenar() {
    count++


    let arrayFromLocal = JSON.parse(localStorage.getItem("tasks"));

    if (arrayFromLocal != null) {
        if (count % 2 == 0) {
            document.getElementById("btnOrder").innerHTML = "Ordenar Al Reves"
            for (let t = 0; t < arrayFromLocal.length; t++) {
                let elemento = arrayFromLocal[t].id;
                $(`#${elemento}`).remove()
            }
            arrayFromLocal.forEach((tarea) => {
                // volverlos a crear
                let fecha = `<span class="fecha">Se registro el ${tarea.fecha}</span>`;
                let iconDelet = `<span class="delete d-flex justify-content-center align-items-center" onclick="eliminarTask(this,this.parentNode.children[0].textContent)">
                       <lord-icon
                       src="https://cdn.lordicon.com/drxwpfop.json"
                       trigger="hover"
                       state="morph-trash-in"
                       style="width:30px;height:30px">
                       </lord-icon> 
                   </span>`;

                let editIco = `<span class="edit d-flex ustify-content-center align-items-center" onclick="editarTask(this,this.parentNode.children[0].textContent)">  
                   <lord-icon
                   src="https://cdn.lordicon.com/wuvorxbv.json"
                   trigger="in"
                   delay="1000"
                   state="in-dynamic"
                   style="width:30px;height:30px">
               </lord-icon>
               </span>`;

                let conntentTaks = `<span>${tarea.tarea}</span>`;

                let auxL = `<li class="list-group-item d-flex justify-content-around align-items-center" id="${tarea.id}"></li>`;

                $("#tasksHere").append(auxL);
                $(`#${tarea.id}`).append(conntentTaks);
                $(`#${tarea.id}`).append(fecha);
                $(`#${tarea.id}`).append(iconDelet);
                $(`#${tarea.id}`).append(editIco);

            })

        } else {
            document.getElementById("btnOrder").innerHTML = "reordenar"
            for (let i = 0; i < arrayFromLocal.length; i++) {
                let element = arrayFromLocal[i].id;
                // eliminar el elemento
                $(`#${element}`).remove()
            }
            // voltear el arreglo
            arrayFromLocal.reverse()
            // volverlos a crear
            arrayFromLocal.forEach((tarea) => {
                // volverlos a crear
                let fecha = `<span class="fecha">Se registro el ${tarea.fecha}</span>`;
                let iconDelet = `<span class="delete d-flex justify-content-center align-items-center" onclick="eliminarTask(this,this.parentNode.children[0].textContent)">
                       <lord-icon
                       src="https://cdn.lordicon.com/drxwpfop.json"
                       trigger="hover"
                       state="morph-trash-in"
                       style="width:30px;height:30px">
                       </lord-icon> 
                   </span>`;

                let editIco = `<span class="edit d-flex ustify-content-center align-items-center" onclick="editarTask(this,this.parentNode.children[0].textContent)">  
                   <lord-icon
                   src="https://cdn.lordicon.com/wuvorxbv.json"
                   trigger="in"
                   delay="1000"
                   state="in-dynamic"
                   style="width:30px;height:30px">
               </lord-icon>
               </span>`;

                let conntentTaks = `<span>${tarea.tarea}</span>`;

                let auxL = `<li class="list-group-item d-flex justify-content-around align-items-center" id="${tarea.id}"></li>`;



                $("#tasksHere").append(auxL);
                $(`#${tarea.id}`).append(conntentTaks);
                $(`#${tarea.id}`).append(fecha);
                $(`#${tarea.id}`).append(iconDelet);
                $(`#${tarea.id}`).append(editIco);

            })
        }
    }

}
