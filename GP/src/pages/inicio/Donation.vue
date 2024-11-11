<template>
    <section class="donation">
      <h2 class="title">Quanto você deseja <h4 class="colaborar">colaborar</h4>?</h2>
      <div class="buttons">
        <button v-for="amount in amounts" :key="amount">{{ amount }}</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Donation',
    data() {
      return {
        amounts: ['R$5', 'R$10', 'R$20', 'R$50', 'Outro valor']
      }
    }
  }
  </script>
  
  <style scoped>
  .donation {
    text-align: center;
  }
  .buttons{
    
  }
  .buttons button {
    margin: 5px;
    padding: 10px;
    background-color: #00cc00;
    color: white;
  }
  .title{
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }
  .colaborar{
    color: #00cc00;
  }
  </style>
  