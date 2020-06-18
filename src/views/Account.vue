<template>
    <div class="main">
        <div class="header">
            <h2>login</h2>
        </div>
        <div
            v-for="item in loginList"
            :key="item.provider"
            :class="item.class"
            :ref="item.ref"
        >
            <button @click="loginWithProvider(item.provider)">
                <i :class="item.icon"></i>
                {{ item.text }}
            </button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';

export default {
    name: 'Account',
    data() {
        return {
            loginList: [
                {
                    class: 'google hover button',
                    icon: 'fab fa-google',
                    text: 'Login with google',
                    provider: 'google',
                },
                {
                    class: 'twitter hover button',
                    icon: 'fab fa-twitter',
                    text: 'Login with twitter',
                    provider: 'twitter',
                },
                {
                    class: 'github hover button',
                    icon: 'fab fa-github',
                    text: 'Login with github',
                    provider: 'github',
                },
            ],
        };
    },
    async created() {
        const db = await firebase.firestore();

        await db
            .collection('creds')
            .where('id', '==', 'password')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (this.$route.query.pwd !== doc.data().password)
                        return this.$router.push({ name: 'Home' });
                });
            });
    },
    methods: {
        loginWithProvider(p) {
            let provider;

            if (p === 'google')
                provider = new firebase.auth.GoogleAuthProvider();
            else if (p === 'twitter')
                provider = new firebase.auth.TwitterAuthProvider();
            else if (p === 'github')
                provider = new firebase.auth.GithubAuthProvider();

            firebase
                .auth()
                .signInWithPopup(provider)
                .then(() => this.$router.push({ name: 'Admin' }))
                .catch(e => console.log(e));
        },
    },
};
</script>

<style scoped lang="scss">
.button {
    position: relative;
    width: 30%;
    min-width: 230px;
    height: 40px;
    margin: 0 auto 10px auto;
}

.button button {
    width: 100%;
    height: 40px;
    padding: 10px;
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

.google button {
    border: 1px solid #ffffff;
    color: #ffffff;
}

.github button {
    border: 1px solid #4d555a;
    color: #4d555a;
}

.twitter button {
    border: 1px solid #1da1f2;
    color: #1da1f2;
}

.spacer {
    height: 10px;
}
</style>
