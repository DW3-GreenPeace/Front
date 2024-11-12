<template>
    <section class="about">
        <h1>Quem Somos</h1>
        <h2>Conectamos Pessoas à Causa</h2>
        <div class="sobre">
            <img src="../../assets/quemsomos.png" alt="" class="img">
            <p>
                A Greenpeace, conhecida por suas palestras envolventes em escolas públicas e privadas, tem em Marta uma aliada dedicada. Ela destaca a importância de abordar temas cruciais, como sustentabilidade, conservação da biodiversidade, ecologia urbana e a proteção dos oceanos. Marta acredita que a educação é a chave para mudanças significativas e está empenhada em levar essas mensagens vitais a alunos de todas as idades.
            </p>
        </div>

    </section>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.about {
    margin-top: 20px;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.sobre{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10%;
}
.sobre img{
    width: 500px;
}
.sobre p{
    text-align: left;
    line-height: 2;
    font-size: 1.1rem
}
</style>