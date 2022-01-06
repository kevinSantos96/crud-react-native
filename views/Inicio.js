import React, {useEffect, useState} from 'react';
import { Text, FlatList, View,} from  'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';
import axios from 'axios';

import globalStyles from '../styles/global';


export const Inicio = ({navigation}) => {
    const [clientes, guardarClientes] = useState([]);
    const [consultarAPI, setConsultarAPI] = useState(true)

    useEffect(() => {
        //obtener clientes
        const obtnerClientesAPI = async ()=>{
            try {
                const resultado = await axios.get(`http://192.168.0.11:3000/clientes`);
                guardarClientes(resultado.data);
                setConsultarAPI(false);
            } catch (error) {
                console.log(error)
            }
        }
        if(consultarAPI){
            obtnerClientesAPI();
        }
        
    }, [consultarAPI])

    return (
        <View style={globalStyles.contenedor}>
            <Button icon="plus-circle" onPress={()=>navigation.navigate("NuevoCliente",{setConsultarAPI})}>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}>{clientes.length>0?'Clientes':'No hay Clientes'}</Headline>
            <FlatList
                
                data={clientes}
                keyExtractor={cliente=>(cliente.id).toString()}
                renderItem={({item})=>(//no olvidar las llaves
                    <List.Item 
                        title={item.nombre}
                        description={item.empresa}
                        onPress={()=>navigation.navigate('DetallesCliente',{item, setConsultarAPI})}
                    />
                )}
            />

            <FAB
                onPress={()=>navigation.navigate("NuevoCliente",{setConsultarAPI})}
                icon='plus'
                style={globalStyles.fab}
            />
        </View>
    )
}

