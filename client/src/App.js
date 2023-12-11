import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import GameHistory from './pages/GameHistory';
import Homepage from './pages/Homepage';
import Footer from './components/Footer'
import Navbar from'./components/Navbar'
const httpLink= createHttpLink({
  uri:'/graphql'
})
const authLink= setContext((_,{headers})=>{
  const token = localStorage.getItem("id_token")
  return {
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` :``
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
      <Router>
      <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="History" element={<GameHistory/>}/>
      {/* must work on rendering all games for a specific user */}
    </Routes>
    <Footer/>
    </>
    </Router>
    </ApolloProvider>
  );
}
export default App;