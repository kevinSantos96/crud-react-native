import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';


export const  DetallesCliente = ({ navigation,route }) => {

    const { setConsultarAPI } = route.params
    const { nombre, telefono, correo, empresa, id }= route.params.item;

    const handleDelete = ()=>{
        Alert.alert('¿Desea Eliminar?',
                    'No se podra recuperar',
                    [
                        {text:'Cancelar', style: 'cancel'},
                        {text: 'Si, Eliminar',onPress: ()=> eliminarContacto()}
                    ]
        )
    }
    const eliminarContacto=async()=>{
        const url = `http://192.168.0.11:3000/clientes/${id}`
        
        try {
            await axios.delete(url);
        } catch (error) {
            console.log(error)
        }

        //redirecionar
        navigation.navigate('Inicio')
        //volver a consultar
        setConsultarAPI(true)
    }

    return (
       <View style={globalStyles.contenedor}>
           <Headline style={globalStyles.titulo}>{nombre}</Headline>
           <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
           <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
           <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>

           <Button 
                style={styles.botom}
                icon="cancel"
                color='#E62A1A'
                onPress={handleDelete}
                >
               Eliminar
           </Button>
           <FAB
                onPress={()=>navigation.navigate("NuevoCliente",{cliente:route.params.item, setConsultarAPI})}
                icon='pencil'
                style={globalStyles.fab}
            />
       </View>
    )
}

const styles= StyleSheet.create({
    texto:{
        marginBottom: 20,
        fontSize: 18,
        color: '#0C1829'
    },
    botom:{
        marginTop: 100
    }
})