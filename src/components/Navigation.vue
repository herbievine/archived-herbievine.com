<template>
    <div class="nav" id="hover">
        <div class="overlay" :class="isMenuOpen ? 'open' : ''">
            <div class="nav">
                <ul v-for="(item, i) in navigation" :key="i">
                    <li @click="removeOverlay">
                        <router-link :to="item.path">{{
                            item.name
                        }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="upper-wrapper">
            <div id="logo" class="home" @click="removeOverlay">
                <router-link to="/">
                    <div v-if="!this.$parent.isSafari">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 2000 1000"
                            style="enable-background:new 0 0 2000 1000;"
                            xml:space="preserve"
                            width="50px"
                            height="25px"
                        >
                            <g id="Layer_1">
                                <path class="st0" d="M0,0" />
                                <path class="st0" d="M449.9,194.2" />
                            </g>
                            <g id="hv">
                                <path
                                    class="st1"
                                    d="M0,0l499.9,500.5L0,1000V0z M1000.5,1000L999.9,0l-500,500.5L1000.5,1000z M999.9,0l500,1000L2000,0H999.9z"
                                />
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </g>
                        </svg>
                    </div>
                    <template v-else>home</template>
                </router-link>
            </div>
            <div class="about">
                <router-link to="/about">about me</router-link>
            </div>
            <div class="hamburger" @click="menuAnimation">
                <svg
                    version="1.1"
                    id="Layer_2"
                    class="hamburger-box"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1929.4 711.2"
                    style="enable-background:new 0 0 1929.4 711.2;"
                    xml:space="preserve"
                    width="40px"
                    height="30px"
                >
                    <path
                        class="hamStrokeUpper"
                        :class="isMenuOpen ? 'openUpper' : ''"
                        :d="
                            this.isMenuOpen
                                ? 'M1883.8,249.4H443.7c-25.2,0-45.7-20.4-45.7-45.7V45.7C398,20.4,418.5,0,443.7,0h1440.1 c25.2,0,45.7,20.4,45.7,45.7v158.1C1929.4,229,1909,249.4,1883.8,249.4z'
                                : 'M1883.8,249.4H45.7C20.4,249.4,0,229,0,203.8V45.7C0,20.4,20.4,0,45.7,0h1838.1c25.2,0,45.7,20.4,45.7,45.7v158.1C1929.4,229,1909,249.4,1883.8,249.4z'
                        "
                    />
                    <path
                        class="hamStrokeLower"
                        :class="isMenuOpen ? 'openLower' : ''"
                        d="M1883.8,711.2H443.7c-25.2,0-45.7-20.4-45.7-45.7V507.4c0-25.2,20.4-45.7,45.7-45.7h1440.1 c25.2,0,45.7,20.4,45.7,45.7v158.1C1929.4,690.7,1909,711.2,1883.8,711.2z"
                    />
                </svg>
            </div>
        </div>
        <div class="lower-wrapper">
            <div class="work">
                <router-link to="/work">work</router-link>
            </div>
            <div class="contact">
                <router-link to="/contact">contact</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            isMenuOpen: false,
            navigation: [
                {
                    name: 'about me',
                    path: '/about',
                },
                {
                    name: 'work',
                    path: '/work',
                },
                {
                    name: 'contact',
                    path: '/contact',
                },
            ],
        };
    },
    methods: {
        menuAnimation() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        removeOverlay() {
            this.isMenuOpen = false;
        },
    },
};
</script>

<style scoped lang="scss">
* {
    z-index: 100;
}

.st0 {
    fill: none;
}
.st1 {
    fill: #dadada;
}

.home {
    position: fixed;
    top: 0;
    left: 0;
    margin: 30px 0 0 30px;
    height: 18px;
}

.work {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0 0 30px 30px;
}

.about {
    position: fixed;
    top: 0;
    right: 0;
    margin: 30px 30px 0 0;
}

.contact {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 0 30px 30px 0;
}

.home a,
.work a,
.about a,
.contact a {
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0.3ch;
    color: var(--primary);
    text-decoration: none;
}

@media only screen and (min-width: 1199px) {
    .hamburger {
        display: none;
    }

    .overlay {
        display: none;
    }

    .home svg {
        pointer-events: none;
    }
}

@media only screen and (max-width: 1200px) {
    .about,
    .work,
    .contact {
        display: none;
    }

    .hamStrokeUpper,
    .hamStrokeLower {
        fill: #cccccc;
    }

    .box {
        display: block;
        position: relative;
    }

    .hamburger {
        position: fixed;
        top: 0;
        right: 0;
        margin: 25px 30px 0 0;
        cursor: pointer;
    }

    .hamStrokeUpper,
    .hamStrokeLower {
        transition: all 400ms ease;
        transform-origin: center;
        cursor: pointer;
    }

    .hamburger-box {
        cursor: pointer;
    }

    .openUpper {
        transform: rotate(45deg) translate(20px, 20px);
    }

    .openLower {
        transform: rotate(-45deg) translate(20px, 20px);
    }

    .overlay {
        display: none;
        background-color: #080811;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .overlay ul {
        padding: 0;
        background: none;
    }

    .overlay li {
        text-decoration: none;
        background: none;
        list-style-type: none;
    }

    .overlay a {
        font-family: 'PT Serif', serif;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.3ch;
        text-decoration: none;
        background: none;
        color: var(--primary);
        cursor: pointer;
    }

    .open {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .work a,
    .about a,
    .contact a,
    .home a,
    .home svg,
    .home {
        cursor: pointer;
    }
}
</style>
