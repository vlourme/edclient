import axios from 'axios';

// Default state
const defaultState = () => {
    return {
        profile: {
            'firstName': '',
            'lastName': '',
            'email': '',
            'typeCompte': '',
            'photoUrl': '',
            'classeCode': '',
            'classeLibelle': ''
        },
        school: {
            nomEtablissement: '',
            anneeScolaireCourante: '',
            codeOgec: ''
        },
        credentials: {
            username: '',
            password: '',
            id: '',
            token: ''
        }
    }
};
const state = defaultState();

/**
 * Assign array values to a object while keeping keys
 * 
 * @param { Array } array 
 * @param { Object } target 
 * @returns { Object }
 */
const assign = (array, target) => {
    // Create temporary object
    let newState = {};

    // Mix values
    for (var i = 0; i < array.length; i++) {
        newState[Object.keys(target)[i]] = array[i];
    }

    // Return created object
    return newState;
}

export default {
    state: state,
    mutations: {
        SET_CREDENTIALS: (state, params = {
            username: '',
            password: '',
            id: '',
            token: ''
        }) => {
            state.credentials = assign(params, state.credentials);
        },
        SET_PROFILE: (state, params = {
            firstName: '',
            lastName: '',
            email: '',
            typeCompte: '',
            photoUrl: '',
            classeCode: '',
            classeLibelle: ''
        }) => {
            state.profile = assign(params, state.profile);
        },
        SET_SCHOOL: (state, params = {
            nomEtablissement: '',
            anneeScolaireCourante: '',
            codeOgec: ''
        }) => {
            state.school = assign(params, state.school);
        },
        RESET: (state) => {
            // Auto-assignment
            Object.assign(state, defaultState());
        }
    },
    getters: {
        profile: state => state.profile,
        school: state => state.school,
        isLogged: state => (state.credentials.username != "" || state.credentials.password != "")
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

            // Get profile
            const account = response.data.data.accounts[0];

            // Store credentials
            context.commit('SET_CREDENTIALS', [
                username,
                password,
                account.id,
                response.data.token
            ]);

            // Storing profile data
            context.commit('SET_PROFILE', [
                account.prenom,
                account.nom,
                account.email,
                account.typeCompte,
                account.profile.photo,
                account.profile.classe.code,
                account.profile.classe.libelle
            ]);

            // Store school-based data
            context.commit('SET_SCHOOL', [
                account.nomEtablissement,
                account.anneeScolaireCourante,
                account.codeOgec
            ])

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