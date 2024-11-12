<template>
    <section class="themes">
        <h2>Principais temas que abordamos</h2>
        <div class="theme-list">
            <div class="theme-item">
                <div class="text">
                    <h2>Conservação da Biodiversidade</h2>
                    <p>É imperativo reconhecer a significativa relevância da preservação da diversidade de espécies e
                        ecossistemas para assegurar a vitalidade e saúde do nosso planeta. A manutenção desse equilíbrio
                        ecológico não apenas sustenta a riqueza biológica, mas também promove a estabilidade ambiental,
                        criando um cenário propício para a prosperidade da vida em todas as suas formas.</p>
                </div>
                <img src="../../assets/tema.png" alt="" class="img">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Themes',

}
</script>

<style scoped>
.themes {
    text-align: center;
    margin-top: 40px;
}

.theme-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

}

.theme-item {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
}

p {
    text-align: justify;
}

.img {
    width: 80%;
}
</style>