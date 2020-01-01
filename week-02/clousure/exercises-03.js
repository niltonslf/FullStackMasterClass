var fullname = "Nilton Lopes"

var obj = {
  fullname: "Túlio Faria",
  prop: {
    fullname: "Marcos alves",
    getFullname: function() {
      return this.fullname
    }
  }
}

console.log(obj.prop.getFullname())
var test = obj.prop.getFullname
console.log(test())
console.log(test.bind(obj)())

/**
 O primeiro clg retorna "Marcos alves" pois o uso do this procura uma variável fullname no escopo mais próximo, então "Marcos alves".

 Já na variável test, o seu clg retorna undefined. Pelo o que entendi é por está sendo armazenado uma referência de obj.prop.getFullname e isso faz que o contexto do this seja global, ao invés do local da propriedade prop
*/
