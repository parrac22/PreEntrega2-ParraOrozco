const categoriasGasto = [{codigo: 1, nombre: "Hogar"},
                         {codigo: 2, nombre: "Transporte"},
                         {codigo: 3, nombre: "Alimentacion"},
                         {codigo: 4, nombre: "Salud y Bienestar"},
                         {codigo: 5, nombre: "Educacion"},
                         {codigo: 6, nombre: "Mascotas"},
                         {codigo: 7, nombre: "Entretenimiento"},
                         {codigo: 8, nombre: "Viajes"},
                         {codigo: 9, nombre: "Otros"}]

const arrayGastos = []

function esNumero(value){
    if (isNaN(value)) {
        return false
    } else {
        return true
    }
}

function agregarCategoria(){
    let validador = false
    while (validador !== true) {
        let idCategoria = parseInt(prompt("Ingresa el ID de la categoria de gasto correspondiente"))
        let objetoCategoria = buscarCategoria(idCategoria)
        if (objetoCategoria !== undefined){
            validador = true
            return objetoCategoria
        } else {
            alert("La categoria no fue encontrada, intente nuevamente.")
        }
    }
}

function agregarMonto(){
    let validador = false
    while (validador !== true) {
        let montoGasto = parseFloat(prompt("Ingresa el monto del gasto que deseas ingresar"))
        if (esNumero(montoGasto)){
            validador = true
            return montoGasto
        } else {
            alert("El valor ingresado no es válido, intente de nuevo")
        }
    }    
}

function buscarCategoria(idCategoria){
    
    let objetoCategoria = categoriasGasto.find((categoria)=> categoria.codigo === parseInt(idCategoria) )
    return objetoCategoria
}



function anexarObjetoTransaccion(){
    let monto = agregarMonto()
    let objetoCategoria = agregarCategoria()
    let nombreCategoria = objetoCategoria.nombre
    let objectoTransaccion = new Transaccion(nombreCategoria,monto)
    arrayGastos.push(objectoTransaccion)
}

function revisarMisGastos(){
    anexarObjetoTransaccion()
    let respuesta = confirm("¿Deseas agregar otro gasto?")
    if (respuesta === true) {
       revisarMisGastos()
    } else {
       let ledger = new Ledger(arrayGastos)
       let objetoGastoPorCategoria = ledger.calcularGastoPorCategoria()
       let gastoTotal = ledger.calcularGastoTotal()
       let gastoTotalFormateado = gastoTotal.toLocaleString()
       let mensaje = ""
       for (categoria in objetoGastoPorCategoria){
           let monto = objetoGastoPorCategoria[categoria]
           let montoFormateado = monto.toLocaleString()
           mensaje += `${categoria}: $${montoFormateado}\n`
       }
       alert("Estos son tus gastos por categoria:"+ `\n`+ mensaje + `\n`+ `Para un total de:  $${gastoTotalFormateado}`)
    }
}

revisarMisGastos()