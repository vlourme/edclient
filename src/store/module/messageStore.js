/**
 * MessageStore
 */

import axios from 'axios';

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
    state: {
        messages: {
            archives: [],
            received: [],
            sent: []
        },
        settings: {
            mailPerso: '',
            mailPro: ''
        }
    },
    mutations: {
        SET_MESSAGES: (state, params = {
            archived: '',
            received: '',
            sent: ''
        }) => {
            state.messages = assign(params, state.messages);
        },
        SET_SETTINGS: (state, params = { 
            mailPerso: '', 
            mailPro: '' 
        }) => {
            state.settings = assign(params, state.settings);
        }
    },
    getters: {
        messages: state => state.messages,
        settings: state => state.settings
    },
    actions: {
        /**
         * Fetch data from API
         * 
         * @param { Object } context 
         */
        async fetchMessages(context) {
            const credentials = context.rootState.user.credentials;

            // Check if logged
            if (!credentials.token) {
                return;
            }

            // Make request
            const response = await axios.post(`https://api.ecoledirecte.com/v3/familles/${credentials.id}/messages.awp?verbe=getall`,
                `data={"token":"${credentials.token}"}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log(response.data);

            // Check for error
            if (response.data.code !== 200) {
                console.log('[messageStore] Error fetching messages.', response.data.message)
                return;
            }

            // Short
            const data = response.data.data;

            // Store messages
            context.commit('SET_MESSAGES', [
                data.messages.archived,
                data.messages.received,
                data.messages.sent,
            ]);

            // Store settings
            context.commit('SET_SETTINGS', [
                data.parametrage.mailPerso,
                data.parametrage.mailPro,
            ]);
        }
    }
}