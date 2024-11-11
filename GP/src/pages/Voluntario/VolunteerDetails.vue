<template>
    <div v-if="volunteer">
      <h2>Detalhes do Voluntário</h2>
      <p><strong>Nome:</strong> {{ volunteer.name }}</p>
      <p><strong>Email:</strong> {{ volunteer.email }}</p>
      <p><strong>Idade:</strong> {{ volunteer.age }}</p>
      <p><strong>Habilidades:</strong> {{ volunteer.skills.join(', ') }}</p>
      <p><strong>Disponibilidade:</strong> {{ volunteer.availability }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Volunteer } from '../../types/volunteer';
  import { getVolunteerById } from '../../services/volunteerService';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const volunteer = ref<Volunteer | null>(null);
      const route = useRoute();
      const id = Number(route.params.id);
  
      onMounted(async () => {
        volunteer.value = await getVolunteerById(id) || null;
      });
  
      return { volunteer };
    }
  });
  </script>
  