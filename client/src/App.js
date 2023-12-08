import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"

const httpLink= createHttpLink({
  uri:'/graphql'
})
const authLink= setContext((_,{headers})=>{
  const token = localStorage.getItem("id_token")
  return {
    headers:{
      ...headers,
      auhtorization: token ? `Bearer ${token}` :``
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Router> */}
      <>

    {/* <Routes>  */}
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
      

      {/* <Route> */}
        
      {/* </Route> */}
    {/* </Routes> */}
    </>
    {/* </Router> */}
    </ApolloProvider>
  );
}

export default App;

