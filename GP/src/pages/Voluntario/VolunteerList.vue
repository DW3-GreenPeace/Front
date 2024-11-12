<template>
    <div>
      <h1>Lista de Voluntários</h1>
      <button @click="addVolunteer">Adicionar Voluntário</button>
      <ul>
        <li v-for="volunteer in volunteers" :key="volunteer.id">
          <span>{{ volunteer.name }} - {{ volunteer.email }}</span>
          <button @click="viewDetails(volunteer.id)">Ver Detalhes</button>
          <button @click="editVolunteer(volunteer.id)">Editar</button>
          <button @click="deleteVolunteer(volunteer.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Volunteer } from '../../types/volunteer';
  import { getVolunteers, deleteVolunteer } from '../../services/volunteerService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const volunteers = ref<Volunteer[]>([]);
      const router = useRouter();
  
      const loadVolunteers = async () => {
        volunteers.value = await getVolunteers();
      };
  
      const viewDetails = (id: number) => router.push(`/admin/volunteer/${id}`);
      const addVolunteer = () => router.push(`/admin/volunteer/form`);
      const editVolunteer = (id: number) => router.push(`/admin/volunteer/edit/${id}`);
  
      const deleteVolunteerById = async (id: number) => {
        await deleteVolunteer(id);
        loadVolunteers();
      };
  
      onMounted(loadVolunteers);
  
      return { volunteers, viewDetails, addVolunteer, editVolunteer, deleteVolunteer: deleteVolunteerById };
    }
  });
  </script>
  