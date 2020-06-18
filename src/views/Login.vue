<template>
    <div class="main">
        <div class="header">
            <h2>login</h2>
        </div>
        <div class="form">
            <form @submit.prevent="checkPassword" class="form">
                <label for="password"></label>
                <input
                    class="input"
                    id="password"
                    type="password"
                    placeholder="password"
                    v-model="password"
                />
                <button class="button">submit</button>
            </form>
            <div class="result">
                <p>
                    {{
                        error && !submittedPassword
                            ? 'maybe enter something?'
                            : error && submittedPassword
                            ? "seems like you don't have access"
                            : ''
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
    name: 'Login.vue',
    data() {
        return {
            user: null,
            submittedPassword: null,
            password: null,
            error: null,
        };
    },
    methods: {
        async checkPassword() {
            this.submittedPassword = this.password;

            const db = await firebase.firestore();

            await db
                .collection('creds')
                .where('id', '==', 'password')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!this.password) {
                            return (this.error = { status: 400 });
                        } else if (this.password !== doc.data().password) {
                            return (this.error = { status: 403 });
                        } else
                            this.$router.push({
                                name: 'Account',
                                query: { pwd: this.password },
                            });
                    });
                });
        },
    },
};
</script>

<style scoped lang="scss">
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
