import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'



const AppRoutes = () => {
  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  let element = useRoutes([
    {
      path: '/',
      element: userInfo ? <HomeScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'profile',
      element: userInfo ? <ProfileScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'admin/users',
      element: userInfo ? <UserListScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'admin/users/log',
      element: userInfo ? <UserLogHistoryScreen /> : <Navigate to='/login' />,
    },

    { path: 'login', element: <LoginScreen /> },
    { path: 'forgot', element: <ForgotPasswordScreen /> },
    { path: 'register', element: <RegisterScreen /> },
    { path: 'reset/:resetToken', element: <ResetPasswordScreen /> },

    { path: '*', element: <NotFound /> },
  ])
  return element
}

export default AppRoutes