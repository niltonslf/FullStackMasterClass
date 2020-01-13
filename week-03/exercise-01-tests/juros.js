function calcJuros(capital, juros, tempo){
    return parseFloat(capital) * parseFloat(juros) * tempo    
}


module.exports = {
    calcJuros
}