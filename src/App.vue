<template>
    <div id="app">
        <Navigation />
        <router-view ref="views" />
        <Canvas />
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Canvas from '@/components/Canvas.vue';
import { mapActions } from 'vuex';
import firebase from 'firebase/app';

export default {
    name: 'App',
    data() {
        return {
            // Global isSafari variable
            isSafari: null,
        };
    },
    components: {
        Navigation,
        Canvas,
    },
    methods: mapActions(['fetchAnimationStatus']),
    created() {
        const agent = navigator.userAgent;

        let safariAgent = agent.indexOf('Safari') > -1;
        const chromeAgent = agent.indexOf('Chrome') > -1;

        if (chromeAgent && safariAgent) safariAgent = false;

        this.isSafari = safariAgent;

        if (this.isSafari)
            console.warn(
                '[SAFARI ERROR]: Site not 100% compatible with Safari. ' +
                'Please use Chrome or Firefox for a better experience'
            );
        else firebase.analytics();
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

* {
    font-family: 'PT Serif', serif;

    &::selection {
        background-color: #254e61;
        color: #cccccc;
    }

    &::placeholder {
        color: var(--primary);
    }

    &::-webkit-scrollbar {
        width: 1%;
        z-index: 50;
    }

    &::-webkit-scrollbar-track {
        background-color: #080811;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 50px;
    }
}

:root {
    --primary: #cccccc;
    --secondary: #111111;
}

html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}

body {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: #080811;
}

input:focus,
button:focus,
textarea:focus {
    outline-width: 0;
}

p,
h2 {
    color: #cccccc;
}

canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
}

.main {
    width: 80%;
    margin: 120px auto 60px auto;
    max-width: 900px;
}

.header {
    position: relative;
    width: 80%;
    max-width: 400px;
    margin: 0 auto 30px;
    text-align: center;
    border-bottom: 1px solid var(--primary);

    & h2 {
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.3ch;
        text-decoration: none;
        background: none;
        color: var(--primary);
    }
}

.router-link-exact-active {
    font-style: italic;
    text-decoration: underline !important;
}
</style>
