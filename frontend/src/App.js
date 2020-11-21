import './App.css';
import Title from './Title/Title';
import Login from './Login/Login';
import Recent from './Recent/Recent';
import Cart from './Cart/Cart';
import Store from './Store/Store';


function App() {
  return (
    <div className="App">
      <Title></Title>
      <Login></Login>
      <Recent></Recent>
      <Cart></Cart>
      <Store></Store>
    </div>
  );
}

export default App;
