import React from "react";
import User from "./User";
import Loading from "./Loading";
import UserForm from "./UserForm";

export default class ContainerUserForm extends React.Component {
constructor(props) {
super(props);
this.state = {
user: "",
loading: false,
data: "",
repos: [],
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.baseState = this.state;
}

handleChange(event) {
this.setState({ user: event.target.value, repos: [] });
}

handleSubmit = (event) => {
event.preventDefault();
this.setState({
loading: true,
});

    const name = String(this.state.user);

    setTimeout(() => {
      fetch(`http://api.github.com/users/${name}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            user: data,
            loading: false,
          });
        })
        .then(() =>
          fetch(`http://api.github.com/users/${name}/repos`)
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                repos: data,
              });
            })
        );
    }, 1000);

};

resetForm = () => {
this.setState(this.baseState);
};

render() {
const { name } = this.state.user;
const { repos } = this.state;

    let userProfile;
    if (this.state.loading === true) {
      userProfile = (
        <div>
          <Loading />
        </div>
      );
    } else if (name) {
      userProfile = <User user={this.state.user} />;
    }

    return (
      <div>
        <div>
          <UserForm
            user={this.state.user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        {userProfile}
        <div>
          <ul>
            {repos.map(({ id, full_name, html_url }) => (
              <li key={id} className="repos-list">
                <h3>
                  <a className="user-repos-name" href={html_url}>
                    Naziv repozitorija: {full_name} , ID Rep: {id}
                  </a>
                </h3>
              </li>
            ))}
          </ul>
          <button onClick={this.resetForm} type="button">
            RESET
          </button>
        </div>
      </div>
    );

}
}

---

import React from "react";
import User from "./User";
import Loading from "./Loading";
import UserForm from "./UserForm";

export default class ContainerUserForm extends React.Component {
constructor(props) {
super(props);
this.state = {
user: "",
loading: false,
data: "",
repos: [],
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.baseState = this.state;
}

handleChange(event) {
this.setState({ user: event.target.value, repos: [] });
}

handleSubmit = (event) => {
event.preventDefault();
this.setState({
loading: true,
});

    const name = String(this.state.user);

    setTimeout(() => {
      fetch(`http://api.github.com/users/${name}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            user: data,
            loading: false,
          });
        })
        .then(() =>
          fetch(`http://api.github.com/users/${name}/repos`)
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                repos: data,
              });
            })
        );
    }, 1000);

};

resetForm = () => {
this.setState(this.baseState);
};

render() {
const { name } = this.state.user;
const { repos } = this.state.repos;

    let userProfile;
    if (this.state.loading === true) {
      userProfile = (
        <div>
          <Loading />
        </div>
      );
    } else if (name) {
      userProfile = <User user={this.state.user} />;
    }

    const repoItems = Object.keys(repos).map((repoKey) => {
      <li key={repos[repoKey].id}>
        <h3>
          <a to={repos[repoKey].html_url} className="text-info" target="_blank">
            Naziv repozitorija: {repos[repoKey].full_name} , ID Rep:{" "}
            {repos[repoKey].id}
          </a>
        </h3>
      </li>;
    });

    return (
      <div>
        <div>
          <UserForm
            user={this.state.user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        {userProfile}
        <div>
          <ul>{repoItems}</ul>
          <button onClick={this.resetForm} type="button">
            RESET
          </button>
        </div>
      </div>
    );

}
}

---
