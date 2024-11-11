<template>
    <div>
      <h2>{{ isEdit ? "Editar" : "Adicionar" }} Voluntário</h2>
      <form @submit.prevent="submitForm">
        <label>Nome:</label>
        <input v-model="volunteer.name" required />
        
        <label>Email:</label>
        <input v-model="volunteer.email" type="email" required />
        
        <label>Idade:</label>
        <input v-model.number="volunteer.age" type="number" required />
        
        <label>Habilidades:</label>
        <input v-model="skillsInput" @keyup.enter="addSkill" />
        <ul>
          <li v-for="(skill, index) in volunteer.skills" :key="index">
            {{ skill }}
            <button @click="removeSkill(index)">Remover</button>
          </li>
        </ul>
  
        <label>Disponibilidade:</label>
        <input v-model="volunteer.availability" required />
  
        <button type="submit">{{ isEdit ? "Salvar" : "Adicionar" }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Volunteer } from '../../types/volunteer';
  import { createVolunteer, updateVolunteer, getVolunteerById } from '../../services/volunteerService';
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isEdit = ref(route.params.id !== "new");
      const volunteer = ref<Volunteer>({ id: 0, name: "", age: 0, email: "", skills: [], availability: "" });
      const skillsInput = ref("");
  
      const loadVolunteer = async () => {
        if (isEdit.value) {
          const data = await getVolunteerById(Number(route.params.id));
          if (data) volunteer.value = data;
        }
      };
  
      const addSkill = () => {
        if (skillsInput.value) {
          volunteer.value.skills.push(skillsInput.value);
          skillsInput.value = "";
        }
      };
  
      const removeSkill = (index: number) => volunteer.value.skills.splice(index, 1);
  
      const submitForm = async () => {
        if (isEdit.value) {
          await updateVolunteer(volunteer.value.id, volunteer.value);
        } else {
          await createVolunteer(volunteer.value);
        }
        router.push("/admin/volunteers");
      };
  
      onMounted(loadVolunteer);
  
      return { volunteer, isEdit, skillsInput, addSkill, removeSkill, submitForm };
    }
  });
  </script>
  