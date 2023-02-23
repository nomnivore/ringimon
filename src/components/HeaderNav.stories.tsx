import HeaderNav from "./HeaderNav";

export default {
  title: "Components/HeaderNav",
  component: HeaderNav,
};

export const LoggedOut = () => <HeaderNav />;
LoggedOut.parameters = {
  nextAuthMock: {
    session: "unknown",
  },
};

export const LoggedIn = () => <HeaderNav />;
LoggedIn.parameters = {
  nextAuthMock: {
    session: "userAuthed",
  },
};
