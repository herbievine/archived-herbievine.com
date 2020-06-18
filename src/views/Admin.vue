<template>
    <div class="main">
        <div class="header">
            <h2>Admin</h2>
        </div>
        <div class="subheader">
            <div class="tab" v-for="(tab, i) in tabs" :key="i">
                <button
                    @click="tab.isComponent ? changeTab(tab) : signOut()"
                    class="button"
                >
                    {{ tab.name }}
                </button>
            </div>
        </div>
        <keep-alive>
            <AddWork :class="selected === 'AddWork' ? '' : 'hide'" />
        </keep-alive>
        <keep-alive>
            <DeleteWork :class="selected === 'DeleteWork' ? '' : 'hide'" />
        </keep-alive>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import AddWork from '@/components/AddWork.vue';
import DeleteWork from '@/components/DeleteWork.vue';

export default {
    name: 'Admin',
    components: {
        AddWork,
        DeleteWork,
    },
    data() {
        return {
            selected: 'AddWork',
            tabs: [
                {
                    name: 'add',
                    component: 'AddWork',
                    isComponent: true,
                },
                {
                    name: 'delete',
                    component: 'DeleteWork',
                    isComponent: true,
                },
                {
                    name: 'sign out',
                    isComponent: false,
                },
            ],
        };
    },
    methods: {
        changeTab(tab) {
            this.selected = tab.component;
        },
        signOut() {
            console.log('here');
            firebase
                .auth()
                .signOut()
                .then(() => this.$router.push({ name: 'Login' }))
                .catch(e => console.log(e));
        },
    },
};
</script>

<style scoped lang="scss">
.subheader {
    position: relative;
    width: 80%;
    max-width: 400px;
    margin: 0 auto 30px;
    display: flex;
    padding: 0 10px;
}

.tab {
    flex: 1;
    margin: 5px;
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

.hide {
    display: none;
}
</style>
