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
}

handleChange(event) {
this.setState({ user: event.target.value });
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
                loading: false,
              });
            })
        );
    }, 1000);

};

render() {
const { repos, name } = this.state;

    let userProfile;
    if (this.state.loading === true) {
      userProfile = (
        <div>
          <Loading />
        </div>
      );
    } else if (name) {
      userProfile = <User user={this.state} />;
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
                    {full_name}
                  </a>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

}
}
