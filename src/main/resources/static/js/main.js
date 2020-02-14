var groupApi = Vue.resource('/group{/id}');

Vue.component('group-row', {
  props: ['group'],
  template: '<div><i>({{group.id}})</i>{{group.text}}</div>'
})

Vue.component('groups-list', {
  props: ['groups'],
  template: '<div><group-row v-for="group in groups" :key="group.id" :group="group"/></div>',
  created: function() {
//    groupApi.get().then(result =>
//      result.json().then(data =>
//        console.log(data);
//      )
//    )
console.log('hello');
  }
});

var app = new Vue({
  el: '#app',
  template: '<groups-list :groups="groups" />',
  data: {
    groups: []
  }
});