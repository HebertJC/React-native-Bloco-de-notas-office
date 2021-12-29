const initialState = {
List : [
    {title : 'Primeira Nota' , body:'Testando 1,2,3...'}
]
}
export default (state = initialState , action)=> {
    let newList = [ ...state.List]; // uma copia do state.list 
    //basicamente fazemos isso por conta de um bug que tem no 
    //redux ele tem dificuldade de verificar se tem alguma coisa nova
    // mas quando criamos um clone da lista, ele tem indentificações 
    //difirente na menoria automaticamente o redux vai saber que a lista é nova


    switch(action.type) {
        case 'ADD_NOTE' :
            newList.push({
                title:action.payload.title,
                body:action.payload.body,       
            });
        break;
        case 'EDIT_NOTE' :
            if(newList[action.payload.key]) {
                //se achou o item , ele vai alterar o proprio item
                newList[action.payload.key] = {
                    title:action.payload.title,
                    body:action.payload.body
                }; // um title e um body novo
            }
        break;
        case 'DEL_NOTE':

            newList = newList.filter((item, index)=>index != action.payload.key)

        break;
    }
   return {
       ...state, List: newList // substituimos o list para o newList.
   }
}