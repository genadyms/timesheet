Vue.component('groups-list', {
  props: ['groups'],
  template: '<div><div v-for="group in groups">{{ group.text }}</div></div>'
})

var app = new Vue({
  el: '#app',
  template: '<groups-list :groups="groups" />',
  data: {
    groups: [
      {id: '1', text: 'test'},
      {id: '2', text: 'contacts'}
    ]
  }
})