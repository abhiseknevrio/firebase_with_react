import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header, HomePage, LogInPage, ProfilePage, SignUpPage, Collections } from './components'
import PrivateRoute from './ProtectedRoute'
import { useFirebase } from './context/firebase'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase()


  useEffect(() => {
    const checkAuthentication = () => {
      if (firebase.loading) {
        setLoading(true)
      }
      if (firebase.user) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();

    return () => {
      setLoading(false)
    }
  }, [firebase.loading, firebase.user])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}>
          <ProfilePage />
        </PrivateRoute>} />
        <Route path='/collections' element={<PrivateRoute isAuthenticated={isAuthenticated}>
          <Collections />
        </PrivateRoute>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='*' element={<h1>Page Not Found 404</h1>} />
      </Routes>
    </>
  )
}

export default App