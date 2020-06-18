<template>
    <div class="form">
        <div v-for="(work, i) in work" :key="i">
            <div class="work">
                <div class="tag">
                    <p>{{ work.title }}</p>
                </div>
                <button class="button" @click="deleteWork(work)">delete</button>
            </div>
        </div>
        <div class="result">
            <p>
                {{
                    !error && success
                        ? success
                        : error && !success
                        ? 'sorry, something went wrong'
                        : ''
                }}
            </p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
const db = firebase.firestore();

export default {
    name: 'DeleteWork',
    data() {
        return {
            work: [],
            error: null,
            success: null,
        };
    },
    created() {
        db.collection('projects')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let p = doc.data();
                    this.work.push(p);
                });
            })
            .catch(e => (this.error = e));
    },
    methods: {
        deleteWork(work) {
            this.error = null;
            this.success = null;

            db.collection('projects')
                .doc(work.id)
                .delete()
                .then(() => (this.success = 'removed successfully'))
                .catch(e => (this.error = e));
        },
    },
};
</script>

<style scoped lang="scss">
.work {
    width: 60%;
    margin: 0 auto;
    max-width: 350px;
    display: flex;
    justify-content: center;
    padding: 0 10px;
}

.tag {
    flex: 3;
    height: 40px;
    padding: 0 20px;
    margin: 0 5px 14px 5px;
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
    margin: 0 5px;
    flex: 1;
    height: 42px;
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
        color: #880000;
        border-color: #880000;
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
