import Ebooks from '../../components/E-book/Ebooks'
import Ekategoriya from '../../components/E-kategoriya/Ekategoriya'
import Navbar from '../../components/Navbar/Navbar'
import React from 'react'

const Home = () => {
  return (
    <>
      <Navbar />
      <Ekategoriya />
      <Ebooks/>
    </>
  )
}

export default Home