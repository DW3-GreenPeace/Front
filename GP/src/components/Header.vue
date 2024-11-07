<template>
    <header class="header">
      <nav>
        <ul>
          <li>Início</li>
          <li>Sobre</li>
          <li>Projetos</li>
          <li>Contato</li>
          <li>Seja Parceiro</li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #004d00;
    color: #fff;
    padding: 10px;
  }
  nav ul {
    display: flex;
    gap: 20px;
  }
  </style>
  