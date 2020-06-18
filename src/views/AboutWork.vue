<template>
    <div class="main" v-if="project">
        <div class="header">
            <h2>{{ project.title }}</h2>
        </div>
        <div class="work">
            <div class="desc">
                <p>{{ project.description }}</p>
            </div>
            <div class="links">
                <div class="info">
                    <a
                        v-if="project.urlAnalytics"
                        :href="project.urlAnalytics"
                        target="_BLANK"
                    >
                        See Website
                    </a>
                    <a
                        v-if="project.urlGithub"
                        :href="project.urlGithub"
                        target="_BLANK"
                    >
                        GitHub Repo
                    </a>
                </div>
                <div class="date">
                    <p>{{ project.createdAt }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'AboutWork',
    data() {
        return {
            project: null,
            projects: this.$store.getters.getProjects,
            loaded: false,
        };
    },
    methods: {
        ...mapActions(['fetchProjects']),
        ...mapGetters(['getProjects']),
        findProjectById(projects) {
            projects.map(project => {
                if (project.id === this.$route.params.id)
                    this.project = project;
            });
        },
    },
    mounted() {
        this.fetchProjects();
    },
    created() {
        this.findProjectById(this.projects);
    },
};
</script>

<style scoped lang="scss">
.work {
    display: flex;
    flex-direction: column;

    & .desc {
        text-align: justify;
    }

    & .links {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        & .info {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;

            & a {
                text-decoration: none;
                color: #cccccc;

                &:first-child {
                    margin-right: 40px;
                }
            }
        }

        & .date {
            display: flex;
            flex: 1;
            align-items: flex-start;
            justify-content: flex-end;

            & p {
                margin: 0;
            }
        }
    }
}
</style>
