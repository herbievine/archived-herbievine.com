<template>
    <div>
        <div class="form">
            <form @submit.prevent="add" class="form">
                <label for="title"></label>
                <input
                    class="input"
                    id="title"
                    type="text"
                    placeholder="title"
                    v-model="data.title"
                />
                <label for="desc"></label>
                <textarea
                    class="area"
                    id="desc"
                    placeholder="description"
                    v-model="data.desc"
                />
                <label for="url"></label>
                <input
                    class="input"
                    id="url"
                    placeholder="url"
                    v-model="data.url"
                />
                <button class="button">submit</button>
            </form>
        </div>
        <div class="result">
            <p>{{ error ? 'sorry, something went wrong' : '' }}</p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'AddWork',
    data() {
        return {
            data: {
                title: null,
                desc: null,
                url: null,
            },
            error: null,
        };
    },
    methods: {
        add() {
            const addProject = firebase.functions().httpsCallable('addProject');

            addProject({
                title: this.data.title,
                desc: this.data.desc,
                url: this.data.url,
                urlAnalytics: `${this.data.url}?utm_source=portfolio&utm_medium=banner`,
            })
                .then(res => console.log(res))
                .catch(e => (this.error = e));
        },
    },
};
</script>

<style scoped lang="scss">
div {
    margin: 0;
    padding: 0;
}

.form {
    position: relative;
    width: 30%;
    min-width: 230px;
    margin: 0 auto 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    margin-bottom: 14px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
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
    transition: width 400ms ease-out, margin 400ms ease-out;

    &:hover {
        width: 90%;
        margin: 0 5%;
    }
}

.area {
    width: 100%;
    height: 100px;
    padding: 14px 20px;
    margin-bottom: 14px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
    resize: none;

    &::-webkit-scrollbar {
        width: 1%;
        z-index: 50;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--secondary);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--primary);
    }
}

.result p {
    margin: 0;
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
    text-align: center;
}
</style>
