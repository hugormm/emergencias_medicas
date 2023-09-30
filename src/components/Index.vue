<template>
  <div>
    
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ $store.state.titulo }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais
  },
  name: 'Index',
  props: {
    msg: String
  },
  methods: {
    ...mapMutations([
      'setEnfermeiros', 
      'setSocorristas', 
      'setMedicos',
      'setCarros',
      'setTelefones',
      'setKits'
    ]),
    ...mapActions(['fetchEquipamentos', 'fetchProfissionais'])  // notacao array
    /*   NOTACAO OBJ : 
    ...mapActions({
      x: 'fetchEquipamentos',
      fetchProfissionais: 'fetchProfissionais'            dps e so chamar pelo x ou fetchProfissionais  (os nomes nao podem dar conflitos)
    })
    */
  },
  created() {
    /*
    this.$store.dispatch({
      type: 'fetchEquipamentos',
      carros: true,
      telefones: true,
      kitsDeReanimacao: true
    })
    this.$store.dispatch('fetchProfissionais')
    */
    this.fetchEquipamentos({
      carros: true,
      telefones: true,
      kitsDeReanimacao: true
    })

    this.fetchProfissionais()
    /*
    fetch('http://localhost:3000/enfermeiros')
      .then(response => response.json())
      .then(data => this.setEnfermeiros(data))

      fetch('http://localhost:3000/socorristas')
      .then(response => response.json())
      .then(data => this.setSocorristas(data))

      fetch('http://localhost:3000/medicos')
      .then(response => response.json())
      .then(data => this.setMedicos(data))

      /*
      fetch('http://localhost:3000/equipamentos')
      .then(response => response.json())
      .then(data => {
        this.setCarros(data.carros)
        this.setTelefones(data)
        this.setKits(data.kitsDeReanimacao)
      })
      */

      
      

  }
}
</script>
