<template>
    <section class="banner">
      <img src="../assets/LogoImgPalavra.png" alt="">
      
    </section>
  </template>
  
  <script>
  export default {
    name: 'Banner'
  }
  </script>
  
  <style scoped>
  .banner {
    height: 100dvh;
    background-image: url(../assets/Banner.png);
    background-size: cover;
    background-repeat: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  