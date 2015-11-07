import React from 'react';

function deleteCookie(name) {
  console.log(document.cookie);
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  console.log(document.cookie);
}

class Logout extends React.Component {
    componentDidMount() {
        deleteCookie("questera");
        setInterval( () => window.location = "/", 2000);
    }
    render() {
        return (
            <p>You have been logged out, you will be redirected shortly to login...</p>
        );
    }
}

export default Logout;
