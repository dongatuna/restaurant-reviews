import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
  );
}
export default App;
