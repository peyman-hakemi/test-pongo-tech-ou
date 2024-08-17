import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "../../../store/store";

interface IProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: IProps) => {
  return (
    <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
};

export default MainWrapper;
