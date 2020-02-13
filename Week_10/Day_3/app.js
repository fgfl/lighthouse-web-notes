const app = new Vue({
  el: '#root',
  data: {
    name: 'Alice',
    lastName: 'Wonderland',
    sports: [
      { id: 1, name: 'curling' },
      { id: 2, name: 'lawn bowling' },
      { id: 3, name: 'volleyball' }
    ],
    tooltip: 'favourite sport/hover over me',
    visible: true,
    counter: 0,
    form: {
      username: '',
      password: ''
    }
  },
  methods: {
    onClick() {
      alert('I got clicked!');
    },
    incrementCounter() {
      this.counter += 1;
    },
    logIn() {
      console.log(this.form);
    }
  },
  created() {
    fetch('https://api.myjson.com/bins/9yppg')
      .then(res => res.json())
      .then(sports => this.sports = [ ...this.sports, ...sports]);
  },
  computed: {
    fullname() {
      return `${this.name} ${this.lastName}`;
    }
  },
  watch: {
    'form.username': function() {
      this.name = this.form.username;
    }
  }
});

const app2 = new Vue({ el: '#carousel' });
