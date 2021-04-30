import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity, SafeAreaView} from 'react-native'
import api from './src/services/api'

export default function App(){
  
  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] =  useState(null)
  
  async function buscar() {
    if (cep == '') {
      alert('Digite um CEP válido')
      setCep('')
      return
    }
    try{
      const response = await api.get(`/${cep}/json`)
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss()
    
    }catch(error) {
      console.log(`ERROR: ${error}`)
    }
    
  }

  function limpar() {
    setCep('')
    inputRef.current.focus()
    
  }

  

  
  return(
    <SafeAreaView style={estilo.container}>

    
    <View style={{alignItems: 'center'}}>
      <Text style={estilo.titulo}>Digite o CEP desejado</Text>
      <TextInput 
      style={estilo.input}
      placeholder="Digite o CEP"
      keyboardType= "numeric"
      value={cep}
      onChangeText={ (valor) => setCep(valor) }
      ref={inputRef}

      />
    </View>

    <View style={estilo.areaBtn}>
      <TouchableOpacity
       onPress={buscar}
       style={[estilo.botao, {backgroundColor: '#1d75cd'}]}>
        <Text style={estilo.buscarText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={limpar}
      
      style={[estilo.botao, {backgroundColor: '#cd3e1d'}]}>
        <Text style={estilo.buscarText}>Limpar</Text>
      </TouchableOpacity>

    </View>

    {cepUser &&
      <View style={estilo.resultado}>
        <Text style={estilo.itemText}>CEP: {cepUser.cep}</Text>
        <Text style={estilo.itemText}>Logradouro: {cepUser.logradouro}</Text>
        <Text style={estilo.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={estilo.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={estilo.itemText}>UF: {cepUser.uf}</Text>
      </View>
    }
    
    </SafeAreaView>
  )
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15

  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    width: 350,
    height: 50,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  botao: {
    
    height: 60,
    
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buscarText: {
    fontSize: 22,
    color: '#fff'
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'

  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 23
  }
  
})