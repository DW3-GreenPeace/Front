<template>
  <section class="location">
    <h2>Doe em nossa sede!</h2>
    <p>Endereço: Palmeiras de São Paulo, Suzano.</p>
    <!-- <div v-if="address">{{ address }}</div> -->
    <!-- <p v-else>Carregando endereço...</p> -->
    <!-- <button @click="getLocation">Obter Localização</button> -->  
    <div class="map-container">
      <iframe
        v-if="latitude && longitude"
        :src="`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`"
        width="400"
        height="300"
        frameborder="0"
        style="border:0;"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Location",
  data() {
    return {
      latitude: null,
      longitude: null,
      address: "",
    };
  },
  methods: {
    async getLocation() {
      try {
        // Coordenadas fixas ou obtidas dinamicamente
        this.latitude = -23.5446; // Substituir por latitude dinâmica
        this.longitude = -46.3131; // Substituir por longitude dinâmica

        // Chamada para a API do Mapbox
        const mapboxToken = "SUA_CHAVE_MAPBOX_AQUI"; // Adicione sua chave do Mapbox
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.longitude},${this.latitude}.json?access_token=${mapboxToken}`;

        const response = await axios.get(url);
        if (response.data.features.length > 0) {
          this.address = response.data.features[0].place_name;
        } else {
          this.address = "Endereço não encontrado.";
        }
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        this.address = "Erro ao obter localização.";
      }
    },
  },
  mounted() {
    this.getLocation();
  },
};
</script>

<style scoped>
.location {
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; 
}

.map-container {
  margin-top: 20px;
  background-color: #085078;
  height: 50dvh;
  width: 50%;
}
iframe{
  width: 100%;
  height: 100%;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #085078;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #063947;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
