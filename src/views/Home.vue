<template>
    <div class="home">
        <div class="top">
            <h2>Hey! I'm Herbie 👋</h2>
            <keep-alive v-if="!isSafari">
                <div class="container">
                    <label class="switch">
                        <input
                            type="checkbox"
                            v-model="getAnimationStatus"
                            @click="setAnimationStatus"
                        />
                        <span class="slider round"></span>
                    </label>
                </div>
            </keep-alive>
        </div>
        <div class="body">
            <p>
                I'm a student at Highlands College, Jersey, studying Information
                Technology.
            </p>
            <p>
                I love creating & developing web apps. I've always been captured
                by the endless posibilities of the web and what it has to offer.
            </p>
            <p>
                Programming has also driven me to learn how to build apps for
                Android/iOS using Flutter and Dart.
            </p>
        </div>
        <div class="socials">
            <i
                @click="redirect('https://twitter.com/herbievine')"
                class="fab fa-twitter"
            ></i>
            <i
                @click="redirect('https://github.com/herbievine')"
                class="fab fa-github"
            ></i>
            <i
                @click="redirect('https://www.linkedin.com/in/herbievine/')"
                class="fab fa-linkedin"
            ></i>
            <i
                @click="redirect('https://medium.com/@herbievine')"
                class="fab fa-medium"
            ></i>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'Home',
    computed: mapGetters(['getAnimationStatus']),
    data() {
        return {
            status: false,
            isSafari: this.$parent.isSafari,
        };
    },
    methods: {
        ...mapMutations(['setAnimationStatus']),
        redirect(to) {
            const redirectTo = encodeURI(to);
            window.open(`/redirect?t=${redirectTo}`, '_BLANK');
        },
    },
};
</script>

<style scoped lang="scss">
.home {
    width: 70%;
    margin: 150px auto 60px auto;
    max-width: 420px;

    & .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & p {
        text-align: justify;
        color: #cccccc;
    }

    & .container {
        margin-top: 10px;

        & .switch {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 17px;

            & input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            & .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #254e61;
                transition: 0.4s;

                &:before {
                    position: absolute;
                    content: '';
                    height: 13px;
                    width: 13px;
                    left: 2px;
                    bottom: 2px;
                    background-color: #cccccc;
                    -webkit-transition: 0.4s;
                    transition: 0.4s;
                }
            }

            & input:not(:checked) + .slider {
                background-color: #4d555a;
            }

            & input:not(:focus) + .slider {
                box-shadow: 0 0 0.5px #4d555a;
            }

            & input:not(:checked) + .slider:before {
                -webkit-transform: translateX(13px);
                -ms-transform: translateX(13px);
                transform: translateX(13px);
            }

            & .slider.round {
                border-radius: 17px;
            }

            & .slider.round:before {
                border-radius: 50%;
            }
        }
    }

    & .socials {
        margin-top: 40px;
        width: 40%;
        min-width: 150px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & i {
            font-size: 20px;
            transition: color 200ms ease-in-out;
            cursor: pointer;
        }

        & .fa-twitter {
            color: var(--primary);

            &:hover {
                color: #1da1f2;
            }
        }

        & .fa-github {
            color: var(--primary);

            &:hover {
                color: #4d555a;
            }
        }

        & .fa-linkedin {
            color: var(--primary);

            &:hover {
                color: #0077b5;
            }
        }

        & .fa-medium {
            color: var(--primary);

            &:hover {
                color: #303034;
            }
        }
    }
}
</style>
