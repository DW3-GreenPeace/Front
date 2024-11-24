<template>
    <div class="banner">
      <img src="../../assets/LogoImgPalavra.png" alt="">
    </div>
  </template>
  
  <script>
  export default {
    name: 'Banner'
  }
  </script>
  
  <style scoped>
  .banner {
    height: 75dvh;
    background-image: url(../../assets/Banner.png);
    background-size: cover;
    background-repeat: none;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  