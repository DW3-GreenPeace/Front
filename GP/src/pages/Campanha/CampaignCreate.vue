<template>
    <div class="container">
        <h2>Criar Campanha</h2>
        <form @submit.prevent="handleSubmit">
            <label for="title">Título:</label>
            <input id="title" type="text" v-model="title" required />

            <label for="description">Descrição:</label>
            <textarea id="description" v-model="description" required></textarea>

            <label for="address">Endereço:</label>
            <input id="address" type="text" v-model="address" required />

            <label for="startDate">Data de Início:</label>
            <input id="startDate" type="date" v-model="startDate" required />

            <label for="endDate">Data de Término:</label>
            <input id="endDate" type="date" v-model="endDate" required />

            <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>

            <button type="submit" :disabled="carregando">
                {{ carregando ? "Criando..." : "Criar Campanha" }}
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import env from "../../../env";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const title = ref("");
        const description = ref("");
        const address = ref("");
        const startDate = ref("");
        const endDate = ref("");
        const mensagem = ref("");
        const carregando = ref(false);

        const router = useRouter();

        const handleSubmit = async () => {
            if (!title.value || !description.value || !address.value || !startDate.value || !endDate.value) {
                mensagem.value = "Por favor, preencha todos os campos.";
                return;
            }

            const newCampaign = {
                title: title.value,
                description: description.value,
                address: address.value,
                startDate: startDate.value,
                endDate: endDate.value,
                volunteers: [0],
            };

            carregando.value = true;
            mensagem.value = "";

            try {
                const response = await axios.post(  env.url.local + '/campaigns', newCampaign, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // Aqui você pode configurar a requisição para CORS
                    mode: "cors",
                });

                if (response.status === 201) {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Campanha criada com sucesso!",
                        icon: "success",
                        confirmButtonText: "Ok",
                    }).then(() => {
                        router.push("/admin/campanha/list");
                    });
                } else {
                    mensagem.value = "Erro ao criar a campanha.";
                }
            } catch (error: any) {
                mensagem.value = `Erro de conexão: ${error.message}`;
                console.error("Erro:", error);
            } finally {
                carregando.value = false;
            }
        };

        return {
            title,
            description,
            address,
            startDate,
            endDate,
            mensagem,
            carregando,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    font-family: "Poppins", sans-serif;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 14px;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 5px;
}

input,
textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

textarea {
    resize: vertical;
    min-height: 80px;
}

button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

button:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}

.mensagem {
    color: red;
    font-size: 12px;
    margin-top: 10px;
}
</style>