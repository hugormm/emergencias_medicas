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
        socorristasPorTurno(state) {  
            return (turno) => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno) 
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length

    },
    mutations: {
        setItemEquipa: (state, item) => {     
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
        fetchEquipamentos(context, {carros, telefones, kitsDeReanimacao}) {
            fetch('http://localhost:3000/equipamentos')
                .then(response => response.json())
                .then(data => {
                    if(carros) context.commit('setCarros', data.carros)
                    if(telefones) context.commit('setTelefones', data.telefones)
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