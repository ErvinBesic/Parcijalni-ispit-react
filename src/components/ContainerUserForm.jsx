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
        });
    }, 1000);
  };

  render() {
    const name = this.state.user.name;

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
        <UserForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        {userProfile}
      </div>
    );
  }
}
