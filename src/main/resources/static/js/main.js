Vue.component('group-row', {
  props: ['group'],
  template: '<div><i>({{group.id}})</i>{{group.text}}</div>'
})

Vue.component('groups-list', {
  props: ['groups'],
  template: '<div><group-row v-for="group in groups" :group="group"/></div>'
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