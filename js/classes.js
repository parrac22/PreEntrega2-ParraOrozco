class Ledger {
    constructor(listadoGastos) {
        this.gastos = listadoGastos
    }
    calcularGastoPorCategoria() {
        if (this.gastos.length > 0) {
            return this.gastos.reduce((acc, objetoTransaccion)=> {
               const {categoria,monto} = objetoTransaccion

               if (acc[categoria]) {
                   acc[categoria] += monto
               } else {
                   acc[categoria] = monto
               }

               return acc
            }, {})
        }
    }
    calcularGastoTotal() {
        if (this.gastos.length > 0) {
            return this.gastos.reduce((acc,objetoTransaccion)=> acc + objetoTransaccion.monto,0)
        }
    }
}

class Transaccion {
    constructor(categoria,monto) {
        this.categoria = categoria
        this.monto = monto
    }
}