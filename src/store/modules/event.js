import EventService from "@/services/EventService.js"

/**
 * By default all getters, actions, and mutations stored in global name space.
 * F.e. if we have purchase action in purchase store and purchase action in logger store
 * there are two call of actions from different modules with the same name.
 *
 * But sometimes it may produce the collisions, so we can use calls under namespace.
 * F.e. event/fetchEvents or event/createEvent
 * @type {boolean}
 */
export const namespaced = true

export const state = {
        events: []
}
export const mutations = {
    SET_EVENTS: (state, events) =>  {
        state.events = events
    },
        ADD_EVENT(state, event) {
        state.events.push(event)
    }
}
export const actions = {
    fetchEvents({commit}, {perPage, page}) {
        EventService.getEvents(perPage, page)
            .then(response => {
                console.log(response.data)
                commit('SET_EVENTS', response.data)
            })
            .catch(error => {
                console.log('There was an error:', error.response)
            })
    },
    createEvent({commit}, event) {
        return EventService.postEvent(event).then( () => {
            commit('ADD_EVENT', event)
        })
    }
}
export const getters = {
    totalNumberOfCategories: state => {
        return state.categories.length
    },
        doneTodos: state => {
        return state.todos.filter(todo => todo.done)
    },
        activeTodosCount: (state, getters) => {
        return state.todos.length - getters.doneTodos.length
    },
        /**
         *  Dynamic getter with parameters
         * @param state SST
         * @returns {function(*): {organizer: string, id: number, title: string} | {organizer: string, id: number, title: string} | {organizer: string, id: number, title: string} | {organizer: string, id: number, title: string}}
         */
        eventByID: state => id => {
        return state.events.find(event => event.id === id)
    }
}