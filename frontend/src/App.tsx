import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Appbar from './components/Appbar'
import ShrinkUrl from './pages/ShrinkUrl'
import Analytics from './pages/Analytics'
import GraphPage from './pages/GraphPage'
import Redirect from './pages/Redirect'
import NewUrl from './pages/NewUrl'
import { RecoilRoot } from 'recoil'
import MyUrls from './pages/MyUrls'
import TermsOfServices from './pages/TermsOfServices'
import ReportMalicious from './pages/ReportMalicious'

function App() {

    return (
      <>
      <RecoilRoot>
        <BrowserRouter>
              <Appbar/>
              <Routes>
                <Route element={<ShrinkUrl/>} path='/'/>
                <Route element={<NewUrl/>} path='/new/*'/>
                <Route element={<Analytics/>} path='/analytics'/>
                <Route element={<GraphPage/>} path='/analytics/*'/>
                <Route element={<MyUrls/>} path='/myurls'/>
                <Route element={<TermsOfServices/>} path='/terms'/>
                <Route element={<ReportMalicious/>} path='/report'/>
                <Route element={<Redirect/>} path='/*'/>
              </Routes>
        </BrowserRouter>
      </RecoilRoot>
      </>
    )
}

export default App
