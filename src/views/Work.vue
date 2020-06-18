<template>
    <div class="main">
        <div class="header">
            <h2>recent work</h2>
        </div>
        <div class="projects">
            <div
                class="project hover"
                :class="isSafari ? 'safari' : ''"
                v-for="project in getProjects"
                :key="project.id"
            >
                <button @click="redirect(project.id)">
                    {{ project.title }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Work',
    data() {
        return {
            isSafari: this.$parent.isSafari,
        };
    },
    methods: {
        ...mapActions(['fetchProjects']),
        redirect(to) {
            this.$router.push({ name: 'AboutWork', params: { id: to } });
        },
    },
    mounted() {
        this.fetchProjects();
    },
    computed: mapGetters(['getProjects']),
};
</script>

<style scoped lang="scss">
.projects {
    display: grid;
    position: relative;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 20px;
    width: 100%;
    margin: 20px 0 10px;
}

.project {
    position: relative;
    width: 100%;
    min-width: 230px;
    height: 40px;
    margin: 0;
}

.safari {
    margin: 10px auto !important;
    width: 90%;
    max-width: 500px;
}

.project button {
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
    transition: width 400ms ease-out, margin 400ms ease-out,
        color 400ms ease-out, border 400ms ease-out;

    &:hover {
        width: 96%;
        margin: 0 2%;
        color: #254e61;
        border: 1px solid #254e61;
    }
}
</style>
