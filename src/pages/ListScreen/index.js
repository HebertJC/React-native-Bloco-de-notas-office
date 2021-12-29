import React, {useLayoutEffect} from 'react';
import { View , Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'; // Para pegar as informações do proprio redux

import {
    Container,
    AddButton,
    AddButtonImage,
    NotesList,
    NoNotes,
    NoNotesImage,
    NoNotesText

} from './styles';

import NoteItem from '../../components/NoteItem';

export default () => {
    const navigation = useNavigation();
    const list = useSelector(state => state.notes.List);//vai puxar a lista que estar no reduces
    
    useLayoutEffect(()=>{
        //so vai rodar quando  carregar o layout  estive completo
        navigation.setOptions({
            title: 'Suas Notas',
            headerRight: ()=> (
                <AddButton underlayColor="transparent" onPress={()=>navigation.navigate('EditNote')}>
                    <AddButtonImage source={require('../../assets/more.png')} />
                </AddButton>
            )
        });

    },[]);
    const handleNotePress = (index) => {
        navigation.navigate('EditNote', {
            key:index //(Paremetro )Basicamente quem vai ser editado
        })
    }
    return (
        <Container>
        {list.length >0 && //se for maior que 0 ele vai aparecer 
          <NotesList
          data={list}
          renderItem={({item, index})=>(
              <NoteItem 
               data={item}
               index={index}
               onPress={handleNotePress} />
               //quando  clicar, ele tem que ir pra tela de cadastro, com os dados daquele item salvos
                        //por isso que mandamos o index tbm pra poder indetificar e poder pegar os dados do redux
              
          )}
          keyExtractor={(item, index)=> index.toString()}
          />
        }
        {list.length == 0 && //se for igual a 0 ele vai aparecer

            <NoNotes>
                <NoNotesImage source={require('../../assets/note.png')} />
                <NoNotesText>Nenhuma anotação</NoNotesText>

            </NoNotes>
        
        }
        </Container>
    );
}
