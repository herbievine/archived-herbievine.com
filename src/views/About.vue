<template>
    <div class="main">
        <div class="header">
            <h2>about me</h2>
        </div>
        <div class="about">
            <div>
                <p>Have a look at my CV:</p>
                <button class="button" @click="cv">
                    Download CV
                    <i class="fas fa-external-link-alt"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {};
    },
    methods: {
        cv() {
            window.open('/CV.pdf', '_BLANK');
        },
    },
};
</script>

<style scoped lang="scss">
.about {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

.button {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
    transition: color 400ms ease-out, border 400ms ease-out;

    &:hover {
        color: #254e61;
        border: 1px solid #254e61;
    }
}
</style>
