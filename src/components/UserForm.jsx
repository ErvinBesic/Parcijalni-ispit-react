import React from "react";

export default function UserForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Upiši naziv korisnika"
        value={props.user.name}
        onChange={props.handleChange}
      />
      <button type="submit">Traži</button>
    </form>
  );
}
