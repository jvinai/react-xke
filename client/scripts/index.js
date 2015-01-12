var React = require('react');

var PlaceList = require('../components/PlaceList'),
  UserForm = require('../components/UserForm');

var Header = React.createClass({
  render: function () {
    return (
      <div className="page-header">
        <h1>Glory hole Manager</h1>
      </div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Header />
        <PlaceList/>
        <UserForm/>
      </div>
    );
  }
});

React.render(<App/>, document.body);
