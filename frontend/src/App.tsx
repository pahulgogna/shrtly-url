import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Appbar from './components/Appbar'
import ShrinkUrl from './pages/ShrinkUrl'
import Analytics from './pages/Analytics'
import GraphPage from './pages/GraphPage'
import Redirect from './pages/Redirect'
import NewUrl from './pages/NewUrl'
import Footer from './components/Footer'
import { RecoilRoot } from 'recoil'
import MyUrls from './pages/MyUrls'

function App() {

    return (
      <>
      <div className='min-h-screen'>
        <BrowserRouter>
        <RecoilRoot>
          <Appbar/>
          <Routes>
            <Route element={<ShrinkUrl/>} path='/'/>
            <Route element={<NewUrl/>} path='/new/*'/>
            <Route element={<Analytics/>} path='/analytics'/>
            <Route element={<GraphPage/>} path='/analytics/*'/>
            <Route element={<MyUrls/>} path='/myurls'/>
            <Route element={<Redirect/>} path='/*'/>
          </Routes>
        </RecoilRoot>
        </BrowserRouter>
      </div>
      <Footer/>
      </>
    )
}

export default App
