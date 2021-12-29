import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';

import ListScreen from '../pages/ListScreen';

import EditNoteScreen from '../pages/EditNoteScreen';

const MainStack = createStackNavigator();

export default () => {
    return(
    <MainStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor:'#222'
        },
        headerTintColor:'#FFF'
    }}>
        <MainStack.Screen name="List" component={ListScreen} />
        <MainStack.Screen name="EditNote" component={EditNoteScreen}/>
    </MainStack.Navigator>) };



//Inicialmente vamos ter so 2 telas
// A tela que vai listar as nossas anotações
// E a outra vai ter um proposito duplo 
//tanto para adicionar e tanto para editar uma anotação por que a tela é a mesma