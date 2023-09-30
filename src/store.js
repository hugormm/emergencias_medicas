import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        titulo: 'Emergencias Medicas',
        equipa: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        equipas: [],
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length
        },
        socorristasPorTurno(state) {  /*closure  
            return (turno) => {
                if(!turno) {                  // se nao estiver defenido retornamos o array completo
                    return state.socorristas
                }
                return state.socorristas.filter(s => s.turno === turno)
            }               // com closure a funcao retornada vai lembrar se do contexto onde foi criada podendo assim usar o state dentro dela. */
            return (turno) => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)   // ternario para simplificar
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length  //(closure again para recuperar parametro turno e encadeamento de getters)

    },
    mutations: {
        //setItemEquipa: (state, {item}) => {     extraimos o item do obj
        setItemEquipa: (state, item) => {     
            //let item = payload.item
            let tipo = item.tipo
            let dados = item.dados

            if(tipo == 'enfermeiros') state.equipa.enfermeiro = dados.nome
            if(tipo == 'socorristas') state.equipa.socorrista = dados.nome
            if(tipo == 'medicos') state.equipa.medico = dados.nome
            if(tipo == 'carros') state.equipa.carro = dados.placa
            if(tipo == 'telefones') state.equipa.telefone = dados.telefone
            if(tipo == 'kits-de-reanimacao') state.equipa.kitDeReanimacao = dados.kit
        },
        setEnfermeiros: (state, payload) => {
            //console.log('mutation', payload)
            state.enfermeiros = payload
        },
        setSocorristas: (state, payload) => {
            state.socorristas = payload
        },
        setMedicos: (state, payload) => {
            state.medicos = payload
        },
        setCarros: (state, payload) => {
            state.equipamentos.carros = payload
        },
        setTelefones: (state, telefones) => {
            state.equipamentos.telefones = telefones
        },
        setKits: (state, payload) => {
            state.equipamentos.kitsDeReanimacao = payload
        },
        addEquipa: (state, payload) => {
            state.equipas.push(payload)
            console.log(state.equipas)
        }
    },
    actions: {
        /*
        adiconarEquipamentos(context, {carros, kitsDeReanimacao, telefones}) {
            console.log(carros)
            console.log(kitsDeReanimacao)
            console.log(telefones)
            context.commit('setCarros', carros)
            //processamento assincrono, tratativa
            context.commit('setTelefones', telefones)
            //processamento assincrono, diversas regras de negocio
            context.commit('setKits', kitsDeReanimacao)

        }
        */
        fetchEquipamentos(context, {carros, telefones, kitsDeReanimacao}) {
            fetch('http://localhost:3000/equipamentos')
                .then(response => response.json())
                .then(data => {
                    if(carros) context.commit('setCarros', data.carros)
                    //processamento assincrono, tratativa
                    if(telefones) context.commit('setTelefones', data.telefones)
                    //processamento assincrono, diversas regras de negocio
                    if(kitsDeReanimacao) context.commit('setKits', data.kitsDeReanimacao)
                })
        },
        fetchProfissionais(context) {
            fetch('http://localhost:3000/enfermeiros')
            .then(response => response.json())
            .then(data => context.commit('setEnfermeiros', data))

            fetch('http://localhost:3000/socorristas')
            .then(response => response.json())
            .then(data => context.commit('setSocorristas', data)) 

            fetch('http://localhost:3000/medicos')
            .then(response => response.json())
            .then(data => context.commit('setMedicos', data))

        }
    }
})