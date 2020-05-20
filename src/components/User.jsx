import React from "react";
import Image from "react-bootstrap/Image";
import "./Form.css";
export default function User(props) {
  return (
    <div>
      <div className="form">
        <div className="first">
          <a className="visit" href={props.user.html_url}>
            <Image
              src={props.user.avatar_url}
              roundedCircle
              width="50"
              height="60"
            />
          </a>
        </div>
        <div className="second">
          <h1 className="user-name">{props.user.name}</h1>
        </div>
      </div>

      <div>
        <p className="user-bio">BIO: {props.user.bio} </p>
        <p className="user-location"> LOKACIJA:{props.user.location} </p>
      </div>

      <div>
        <a className="visit" href={props.user.html_url}>
          Pogledaj profil korisnika
        </a>
      </div>
    </div>
  );
}
