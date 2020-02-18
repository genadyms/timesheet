function getIndex(list, id) {
  for(var i=0; i<list.length; i++) {
    if(list[i].id === id) {
      return i;
    }
  }
  return -1;
}

var groupApi = Vue.resource('http://localhost:8080/group{/id}');

Vue.component('group-form', {
  props: ['groups', 'groupAttr'],
  data: function() {
    return {
      name: '',
      id: ''
    }
  },
  watch: {
    groupAttr: function(newVal, oldVal) {
      this.name = newVal.name;
      this.id = newVal.id;
    }
  },
  template:
    '<div>'+
        '<input type="text" placeholder="Create new group" v-model="name" />' +
        '<input type="button" value="Save" @click="save" />' +
     '</div>',
  methods: {
    save: function() {
      var group = { name: this.name };
      if(this.id) {
        groupApi.update({id: this.id}, group).then( res =>
          res.json().then( data => {
            var index = getIndex(this.groups, data.id);
            this.groups.splice(index, 1, data);
            this.name = '';
            this.id ='';
          })
       )
      } else {
          groupApi.save({}, group).then( res =>
            res.json().then( data => {
              this.groups.push(data);
              this.text = '';
            })
          )
      }
    }
  }
});

Vue.component('group-row', {
  props: ['group', 'editGroup', 'groups'],
  template: '<div><i>({{group.id}})</i>{{group.name}}'+
            '<span style="position: absolute; right: 0">'+
                '<input type="button" value="Edit" @click="edit" />'+
                '<input type="button" value="X" @click="remove" />'+
            '</span>'+
            '</div>',
  methods: {
    edit: function() {
      this.editGroup(this.group);
    },
    remove: function() {
      groupApi.remove({id: this.group.id}).then(result => {
        if (result.ok) {
          this.groups.splice(this.groups.indexOf(this.group),1);
        }
      });
    }
  }
});

Vue.component('groups-list', {
  props: ['groups'],
  data: function() {
    return  {
        group: null
    }
  },
  template: '<div style="position: relative; width: 300px;">'+
                '<group-form :groups="groups" :groupAttr="group" />' +
                '<group-row v-for="group in groups" :key="group.id"'+
                ' :group="group" :groups="groups" :editGroup="editGroup" />'+
            '</div>',
  created: function() {
    groupApi.get().then(result =>
      result.json().then(data =>
        data.forEach(group => this.groups.push(group) )
      )
    )
  },
  methods: {
    editGroup: function(group) {
      this.group = group;
    }
  }
});

var app = new Vue({
  el: '#app',
  template: '<groups-list :groups="groups" />',
  data: {
    groups: []
  }
});