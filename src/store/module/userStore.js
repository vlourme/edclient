import axios from 'axios';

const defaultState = () => {
    return {
        username: '',
        password: '',
        token: '',
        firstName: '',
        lastName: ''
    }

};

export default {
    state: defaultState(),
    mutations: {
        SET_CREDENTIALS: (state, [username, password, token]) => {
            state.username = username;
            state.password = password;
            state.token = token;
        },
        SET_PROFILE: (state, [firstName, lastName]) => {
            state.firstName = firstName;
            state.lastName = lastName;
        },
        RESET: (state) => {
            Object.assign(state, defaultState())
        }
    },
    getters: {
        profile: state => {
            return {
                'firstName': state.firstName,
                'lastName': state.lastName
            }
        },
        isLogged: state => (state.username != "" || state.password != "")
    },
    actions: {
        /**
         * Authentication method
         * 
         * @param { Object } context 
         * @param { Array } credentials 
         */
        async auth(context, [username, password]) {
            // Authenticating
            const response = await axios.post(
                "https://api.ecoledirecte.com/v3/login.awp",
                `data={"identifiant":"${username}","motdepasse":"${password}"}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            // Checking for error
            if (response.data.code !== 200) {
                console.log(`[Login] Authentication failed with code: ${response.data.code}`);

                // Return formatted error
                return {
                    status: false,
                    message: response.data.message
                };
            }

            console.log('[Login] Authentication success.');

            // Store credentials
            context.commit('SET_CREDENTIALS', [
                username,
                password,
                response.data.token
            ]);

            // Storing profil data
            context.commit('SET_PROFILE', [
                response.data.data.accounts[0].prenom,
                response.data.data.accounts[0].nom
            ]);

            return {
                status: true
            };
        },

        /**
         * Deauthentication method (logout)
         * Note: This will reset to default state
         * 
         * @param { Object } context 
         */
        deauth(context) {
            console.log('[UserStore] Deauthentication triggered. Clearing state...')

            // Commit state
            context.commit('RESET');
        }
    },

}