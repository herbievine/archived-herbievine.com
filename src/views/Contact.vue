<template>
    <div class="main">
        <div class="header">
            <h2>contact me</h2>
        </div>
        <div class="form">
            <form @submit.prevent="submit" class="form">
                <label for="name"></label>
                <input
                    class="input"
                    id="name"
                    type="text"
                    placeholder="full name"
                    v-model="data.fullName"
                />
                <label for="email"></label>
                <input
                    class="input"
                    id="email"
                    type="text"
                    placeholder="email"
                    v-model="data.email"
                />
                <label for="subject"></label>
                <input
                    class="input"
                    id="subject"
                    type="text"
                    placeholder="subject"
                    v-model="data.subject"
                />
                <label for="message"></label>
                <textarea
                    class="message"
                    id="message"
                    placeholder="message"
                    v-model="data.message"
                />
                <button class="button">submit</button>
            </form>
            <div class="result">
                <p>
                    {{
                        isSuccess && !isLoading && !error
                            ? 'message sent'
                            : isLoading && hasSubmitted && !error
                            ? 'sending'
                            : error
                            ? error.message
                                ? error.message
                                : 'sorry, an error occurred'
                            : ''
                    }}
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
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/functions';

export default {
    name: 'Contact',
    data() {
        return {
            data: {
                fullName: '',
                email: '',
                subject: '',
                message: '',
            },
            hasSubmitted: false,
            isLoading: false,
            isSuccess: false,
            error: null,
        };
    },
    methods: {
        redirect(to) {
            const redirectTo = encodeURI(to);
            window.open(`/redirect?t=${redirectTo}`, '_BLANK');
        },
        submit() {
            this.hasSubmitted = true;
            this.isLoading = true;

            if (
                !this.data.fullName ||
                !this.data.email ||
                !this.data.subject ||
                !this.data.message
            ) {
                return (this.error = {
                    status: 400,
                    message: 'some fields are missing',
                });
            } else if (this.data.message.split(' ').length < 10)
                return (this.error = {
                    status: 403,
                    message: 'message is too small',
                });

            this.error = null;

            const sendmail = firebase.functions().httpsCallable('sendMail');

            sendmail({
                fullName: this.data.fullName,
                email: this.data.email,
                subject: this.data.subject,
                message: this.data.message,
            })
                .then(res => {
                    if (res.data.status === 200) {
                        this.isLoading = false;
                        return (this.isSuccess = true);
                    }
                })
                .catch(e => (this.error = e));
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

.message {
    width: 100%;
    height: 100px;
    padding: 14px 20px;
    margin-bottom: 14px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
    resize: none;

    &::-webkit-scrollbar {
        width: 1%;
        z-index: 50;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--secondary);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--primary);
    }
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
    transition: width 400ms ease-out, margin 400ms ease-out,
        color 400ms ease-out, border 400ms ease-out;

    &:hover {
        width: 96%;
        margin: 0 2%;
        color: #254e61;
        border: 1px solid #254e61;
    }
}

.result p {
    margin: 0 0 10px 0;
    color: var(--primary);
    font-family: 'PT Serif', serif;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.3ch;
    text-decoration: none;
    background: none;
}

.socials {
    min-width: 150px;
    width: 20%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.socials i {
    font-size: 20px;
    transition: color 200ms ease-in-out;
    cursor: pointer;
}

.fa-twitter {
    color: var(--primary);

    &:hover {
        color: #1da1f2;
    }
}

.fa-github {
    color: var(--primary);

    &:hover {
        color: #4d555a;
    }
}

.fa-linkedin {
    color: var(--primary);

    &:hover {
        color: #0077b5;
    }
}

.fa-medium {
    color: var(--primary);

    &:hover {
        color: #303034;
    }
}
</style>
