import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import ViewCart from './components/ViewCart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <Switch>
      <Route exact path="/" component={PostList} />
         
      <Route path="/cart" component={() => <ViewCart test="testing props..." /> } />
            {/* <PostList /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
