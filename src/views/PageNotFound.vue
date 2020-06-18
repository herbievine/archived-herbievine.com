<template>
    <div class="main">
        <div class="header">
            <h2>404 - Page not found!</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
};
</script>

<style scoped>
.header {
    position: relative;
    width: 80%;
    max-width: 400px;
    margin: 0 auto 10px;
    text-align: center;
}

.header h2 {
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
    color: var(--primary);
}
</style>
