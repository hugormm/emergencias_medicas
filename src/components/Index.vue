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
          <configuracao-equipa />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipas />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import ConfiguracaoEquipa from './ConfiguracaoEquipa.vue'
import Equipamentos from './Equipamentos.vue'
import Equipas from './Equipas.vue'
import Profissionais from './Profissionais.vue'

export default {
  components: { 
    ConfiguracaoEquipa,
    Equipamentos,
    Equipas,
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
    ...mapActions(['fetchEquipamentos', 'fetchProfissionais'])  
  },
  created() {
    this.fetchEquipamentos({
      carros: true,
      telefones: true,
      kitsDeReanimacao: true
    })

    this.fetchProfissionais()
  }
}
</script>
