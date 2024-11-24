<template>
    <section class="donation">
      <h2 class="title">Quanto você deseja <h4 class="colaborar">colaborar</h4>?</h2>
      <div class="cards">
      <div v-for="amount in amounts" :key="amount" class="card">
        <p>{{ amount }}</p>

        <button class="donate-button"><a href="/donations/create">Doar</a></button>
      </div>
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
  a{
    text-decoration: none;
    color: #fff;
  }
  .donation {
    text-align: center;
  }
  .cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.card {
  background-color: #ffffff;
  border: 2px solid #c5fdc5;
  border-radius: 8px;
  padding: 15px 20px;
  text-align: center;
  width: 120px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
}

.card p {
  font-size: 1.2rem;
  margin: 10px 0;
  color: #333;
  font-weight: bold;
}

.donate-button {
  background-color: #00cc00;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.donate-button:hover {
  background-color: #008f00;
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
  