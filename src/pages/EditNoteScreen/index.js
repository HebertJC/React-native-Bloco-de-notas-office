import React,{useState, useEffect, useLayoutEffect } from 'react';
import {useSelector , useDispatch} from 'react-redux'; // 1 - pra pegar os dados e o 2  pra fazer a ação de editar,salvar excluir etc 
import { useNavigation , useRoute } from '@react-navigation/native'; //pra pegar o parametro que foi enviado , e o navigation pra voltar para tela


import { View , Text} from 'react-native';
import {
    Container,
    TitleInput,
    BodyInput,
    SaveButton,
    SaveButtonImage,
    CloseButton,
    CloseButtonImage,
    DeleteButton,
    DeleteButtonText


    
} from './styles'
export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const list = useSelector(state => state.notes.List);
    

    const [title , setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('new');

   useEffect(()=>{
    if(route.params?.key != undefined && list[route.params.key ]) {
      // 1 -se estive definido o meu key significar que ele mandou o meu parametro
      // 2 - se na lista temos um key (perguntando se existe esse key na lista)
      //vai verificar se o key ta na lista
      //se sim , vai continuar

      setStatus("edit")
      setTitle( list[route.params.key ].title);
      setBody(list[route.params.key ].body);
    }
   },[]); //se o cara estar editando ou criando uma anotação

   useLayoutEffect(()=>{
    navigation.setOptions({
        // se status for new vai ser... , caso aucontrario vai ser....
        title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
         headerLeft: ()=> (
            <CloseButton inderLayColor='transparent' onPress={handleCloseButton}>
                <CloseButtonImage source={require('../../assets/close.png')} />
            </CloseButton>
         ),
        headerRight: ()=>(
            <SaveButton underLayColor="transparent" onPress={handleSaveButton}>
                <SaveButtonImage source={require('../../assets/save.png')} />
            </SaveButton>
        )

    });

    }, [status, title, body]);

    const handleSaveButton = () => {
        if(title != '' && body != ''){
            //se title estiver diferente de vazio e o body , vai executar fazer algo
            if(status == 'edit') {
                dispatch({
                type: 'EDIT_NOTE',
                payload:{
                    key: route.params.key,
                    title:title,
                    body:body,

                }            
                })

            } else{
                dispatch({
                type: 'ADD_NOTE',
                payload: {
                    title:title,
                    body:body,
                    //ação de adicionar
                }
                });
            }
        navigation.goBack()
        }else {
            alert('Preencha titulo e corpo');
        } 
    }
    const handleCloseButton = () => {
        navigation.goBack()
    }
    const handleDeleteNoteButton =()=> {

        dispatch({
            type: 'DEL_NOTE',
            payload:{
                key:route.params.key,
            }
        })
        navigation.goBack()
    }

    return (
        <Container>
        <TitleInput 
           value={title}
           onChangeText={t=>setTitle(t)}
           placeholder="Digite o titulo da anotação"
           placeholderTextColor="#CCC"
           autoFocus={true} // vai estar com esse campo selecionado e ja com o teclado aberto
        />
        <BodyInput
             value={body}
             onChangeText={t=>setBody(t)}
             placeholder="Digite o corpo da anotação"
             placeholderTextColor="#CCC"
             multiline= {true} //multipla linha(podemos digitar uma em baixo da outra)
             textAlignVertical="top" //vai ficar com o curso la em cima
        />
        {status == 'edit' && 
        
            <DeleteButton underlayColor="#FF0000" onPress={handleDeleteNoteButton}>
                <DeleteButtonText> Excluir Anotação</DeleteButtonText>
            </DeleteButton>
        
        }
        </Container>
    );
}