import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './components/Landing'
import Main from './components/Main'
import Home from './components/Home'
import Insights from './components/Insights'
import Settings from './components/Settings'
import Session from './components/Session'
import Results from './components/Results'
import PageNotFound from './components/PageNotFound'

function App() {

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="dashboard" element={<Main />}>
                <Route path="home" element={<Home />} />
                <Route path="insights" element={<Insights />} />
                <Route path="settings" element={<Settings />} />
                <Route path="session" element={<Session 
                  serverUrl={serverUrl}
                />} />
                <Route path="results" element={<Results />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
