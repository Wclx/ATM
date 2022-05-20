let username,
    // contrasena = 1234,
    // saldo = 200,
    intentos = 3;


var cuentas = [
    { nombre: 'Mali', saldo: 200, contrasena: 1234 },
    { nombre: 'Gera', saldo: 290, contrasena: 2345 },
    { nombre: 'Maui', saldo: 67, contrasena: 3456 }
];

document.getElementById('boton').addEventListener("click", function(e){
    e.preventDefault()
    atmPassword();
})


// Validar password

function atmPassword() {
    username = document.getElementById("floatingInput").value
    if (username !== "" && username !== null) {

        let pswEntry = parseInt(document.getElementById("floatingPassword").value)
        if (pswEntry !== "" && pswEntry !== null) {
            let bandera = true
            for (let i = 0; i < cuentas.length; i++) {
                if (username == cuentas[i].nombre && pswEntry == cuentas[i].contrasena) {                    
                    localStorage.setItem("usuario", JSON.stringify({
                        nombre: cuentas[i].nombre, saldo: cuentas[i].saldo
                    }))                  
                    bandera = false
                    // window.location.href="https://google.com"
                    break;
                }
            }
            if (bandera) {
                if (intentos === 1) {
                    alert("PIN es incorrecto.");
                    alert("Su cuenta ha sido bloqueada por maximo de intentos. Por favor comuniquese con el banco.");
                    return;
                } else {
                    intentos -= 1;
                    alert("PIN incorrecto. Intentelo nuevamente");
                    alert("Tiene solo " + intentos + " intentos mas");
                    atmPassword();
                }
            } else {
                seleccionar();
            }
        } else {
            alert("El password no puede estar vacio")
            atmPassword();
        }
    } else {
        alert("El usuario no puede estar vacio")
        atmPassword();
    }
}


//                                           Elegir que hacer
function seleccionar() {
    var funcionesATM = parseInt(prompt("Hola " + username + ", que operacion desea realizar? \n 1. Saldo \n 2. Retirar \n 3. Depositar \n 4. Salir"));
    if (funcionesATM !== "" && funcionesATM !== null && !isNaN(funcionesATM)) {
        switch (funcionesATM) {
            case 1:
                balance();
                break;
            case 2:
                retirar();
                break;
            case 3:
                depositar();
                break;
            case 4:
                salir();
                break;
            default:
                alert("Por favor, selccione una opcion valida");
                seleccionar();
        }
    } else {
        alert("Por favor, selccione una opcion valida");
        selectFunction();
    }
}


//                                          Saldo
function balance() {
   alert('Tu saldo es de: ' + JSON.parse(localStorage.getItem("usuario")).saldo)
   continuar();
}


//                                          Deposito

function depositar() {
    const cantidadDepositada = parseInt(prompt("Cuanto quiere depositar?"));
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    if (cantidadDepositada !== "" && cantidadDepositada !== null && !isNaN(cantidadDepositada)) {
        const saldo = usuario.saldo + cantidadDepositada
        console.log(saldo)
        if (saldo >= 991) {           
            localStorage.setItem("usuario", JSON.stringify(usuario))
            alert("Su deposito supera lo permitido en esta cuenta")
            depositar();
        } else {
            usuario.saldo += cantidadDepositada
            localStorage.setItem("usuario", JSON.stringify(usuario))
            alert("Has depositado $" + cantidadDepositada + "\n" + "Su saldo es de $" + usuario.saldo);
            continuar();
        }
    } else {
        alert("Invalido, por favor ingrese un numero");
        depositar();
    }
}


//                                      Retiro con minimo
function retirar() {
    const retirarCantitad = parseInt(prompt("Cuanto quiere retirar?"));
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    if (retirarCantitad !== "" && retirarCantitad !== null && !isNaN(retirarCantitad)) {
        const saldo = usuario.saldo - retirarCantitad
        console.log(saldo)
        if (saldo <= 11) {           
            localStorage.setItem("usuario", JSON.stringify(usuario))
            alert("Supera lo minimo permitido en esta cuenta")
            retirar();
        } else {
            usuario.saldo -= retirarCantitad
            localStorage.setItem("usuario", JSON.stringify(usuario))
            alert("Has retirado $" + retirarCantitad + "\n" + "Su saldo es de $" + usuario.saldo);
            continuar();
        }
    } else {
        alert("Invalido, por favor ingrese un numero");
        retirar();
    }
}


//                               Continuar usando
function continuar() {
    var SiONo = parseInt(prompt("Quiere realizar otra transaccion? \n 1. Si \n 2. No"));
    if (SiONo !== "" && SiONo !== null) {
        if (SiONo === 2) {
            salir();
        }
        else {
            seleccionar();
        }
    } else {
        alert("Por favor, selccione una opcion valida");
        continuar();
    }
}


//                                  Salir
function salir() {
    alert("Gracias por elegirnos");
}