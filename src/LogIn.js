import * as React from "react";
import AjaxAdapter from './AjaxAdapter';

const User = AjaxAdapter('/api/users/login')

function LogIn() {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const authHandler = async () => {
    try {
      console.log(
    `${userEmail} - ${userPassword}`
      )
      setLoading(true);
      const userData = await User.authenticateUser(userEmail,userPassword)
      const { id } = userData;
    } catch (err) {
      setLoading(false);
      console.error(err)
      // showError(err.message);
    }
  };

return (
    <form
      onSubmit={e => {
        e.preventDefault();
        authHandler();
      }}
    >
      <h2>Sign in</h2>
      <br />
      <div>
        <input
          // type="email"
          name="email"
          value={userEmail}
          placeholder="john@mail.com"
          onChange={e => setUserEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={userPassword}
          placeholder="Password"
          onChange={e => setUserPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}
export default LogIn;
