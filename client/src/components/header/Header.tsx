import * as React from "react";
import './header.css';
import { useAuth } from "../../contexts/AuthContext";
import ToggleShowButton from "../toggle-show-button/ToggleShowButton";
import { REACT_APP_GIT_URL } from "../../../env";
import CreateTalkForm from "../create-talk-form/CreateTalkForm";

function Header() {
  const { isAuthenticated } = useAuth();
  const [showCreateTalkForm, setTalkState] = React.useState(false);
  const getCreateTalkForm = () => showCreateTalkForm ?
    <CreateTalkForm closeForm={() => setTalkState(false)} /> :
    null;

  return (
    <div className={showCreateTalkForm ? "c-header__talk-form-open" : "c-header"}>
      <h1>{showCreateTalkForm ? "Create a cool Talk" : "Talkraft"}</h1>

      <ToggleShowButton
        onClick={() => setTalkState(true)}
        show={isAuthenticated && !showCreateTalkForm}
        text="Create Talk" />

      <ToggleShowButton
        show={!isAuthenticated}
        text="Sign in with GitHub"
        href={REACT_APP_GIT_URL} />

      { getCreateTalkForm()}
    </div >
  );
}

export default Header;
