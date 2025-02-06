import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
import "@xyflow/react/dist/style.css";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
