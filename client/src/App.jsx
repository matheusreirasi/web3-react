import { useState } from 'react'
import {Footer, Loader, Navbar, Services, Transactions, Welcome} from "./components/index"


const App = () => {

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar/>
        <Welcome/>
        <h1 className='text-3xl font-bold underline'>
          Hello world.
        </h1>
        <Services/>
        <Transactions/>
        <Footer/>
      </div>

    </div>
  )
}

export default App
