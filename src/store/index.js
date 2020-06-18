import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import 'firebase/firestore';

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
                        projects.push(doc.data());
                    });

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
