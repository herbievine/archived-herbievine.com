import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        projects: [],
        animationStatus: true,
    },
    getters: {
        getProjects: state => state.projects,
        getAnimationStatus: state => state.animationStatus,
    },
    actions: {
        fetchProjects({ commit }) {
            const db = firebase.firestore();

            db.collection('projects')
                .get()
                .then(querySnapshot => {
                    let projects = [];

                    querySnapshot.forEach(doc => {
                        if (!doc.data()) return;

                        let project = doc.data();
                        project.unix = moment(doc.data().createdAt, 'MMMM Do YYYY').unix();

                        projects.push(project);
                    });

                    projects.sort((a, b) => -(a.unix - b.unix));

                    commit('setProjects', projects);
                })
                .catch(e => console.log(e));
        },
    },
    mutations: {
        setProjects: (state, payload) => (state.projects = payload),
        setAnimationStatus: state =>
            (state.animationStatus = !state.animationStatus),
    },
});
