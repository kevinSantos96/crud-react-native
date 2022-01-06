import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Alert, Platform } from  'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';


export const NuevoCliente = ({navigation, route}) => {

    const { setConsultarAPI }= route.params;

    //CAMPOS DEL FORMULARUIO    
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [empresa, setEmpresa] = useState('')
    
    //detectar si estamos editando 
    useEffect(() => {
        
        if(route.params.cliente){
            const { nombre, telefono, correo, empresa}= route.params.cliente

            setNombre(nombre);
            setTelefono(telefono);
            setCorreo(correo);
            setEmpresa(empresa);

        }

    }, [])

    //almacenar en la base de datos
    const guardarCliente = async ()=>{
        //Valida
        if(nombre===''||telefono===''|| correo ===''||empresa===''){
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        //generar cliente
        const nuevoCliente ={nombre,telefono,correo,empresa}

        //guardar o editar el cliente en la api
        if(route.params.cliente){

            const { id } = route.params.cliente;
            nuevoCliente.id = id;
            const url = `http://192.168.0.11:3000/clientes/${id}`
            
            try {
                await axios.put(url,nuevoCliente)
            } catch (error) {
                console.log(error)
            }

        }else{
            //guardando nuevo cliente
            try {

                if(Platform.OS==='ios'){
                    //para ios
                    await axios.post(`http://localhost:3000/clientes`,nuevoCliente)
                }else{
                   //para Android
                    await axios.post(`http://192.168.0.11:3000/clientes`,nuevoCliente) 
                }
                  
            } catch (error) {
                console.log(error)
            }
        }
        
        //redireccionar
        navigation.navigate('Inicio');
        //limpiar el form
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');

        //Cambiar a true para resfrescar lista de clienets
        setConsultarAPI(true)
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Agregar Nuevo Cliente</Headline>

            <TextInput
                label="Nombre"
                onChangeText={texto=>setNombre(texto)}
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Telefono"
                keyboardType='number-pad'
                onChangeText={texto=>setTelefono(texto)}
                value={telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                onChangeText={texto=>setCorreo(texto)}
                value={correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                onChangeText={texto=>setEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button icon="plus" mode='contained' onPress={guardarCliente} >Guardar Cliente</Button>


        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})