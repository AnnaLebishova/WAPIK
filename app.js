Vue.directive('phone', {
  bind(el) {  
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }
      let x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);//определяем сколько в маске цифр будет
      this.value = x[1] + (x[2] ? ' ('+ x[2]:'') + (x[3]?') '+ x[3]:'') + (x[4] ? '-' +  x[4] :'') +( x[5] ?'-' + x[5] :'') ;//x[i] ?'-' вставляет тире не в начале, а по маске
      el.dispatchEvent(new Event('input'));
    }
  }
});

var app = new Vue({
  el:'#app',
  data:{
    errors:[],
    name:null,
    email:null,
    phone:'',
    message:null
  },
  methods:{
    checkForm:function(e) {
      this.errors = [];
      
      if(!this.name) {this.errors.push("Name required.");
      } else if(!this.validname(this.name)) {
        this.errors.push("Name change required.");        
      }
      if(!this.email) { this.errors.push("Email required.");
      } else if(!this.validEmail(this.email)) {
        this.errors.push("Email change required.");        
      }
      if(!this.phone) { this.errors.push("Phone required.");
      }
      if(!this.message) { this.errors.push("Message required.");
      } else if(!this.validEmail(this.email)) {
        this.errors.push("Message change required");        
      }
      if(!this.errors.length) return true;
      e.preventDefault();
    },
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
    validname:function(name) {
      var re = /^[A-Za-zА-Яа-яЁё]/;
    return re.test(name);
    },
    validmessage:function(message) {
      var re = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
    return re.test(message);
    }
  }
})

