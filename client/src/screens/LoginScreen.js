import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useForm } from 'react-hook-form'
import { login } from '../api/users'
import { useMutation, useQueryClient } from 'react-query'

const LoginScreen = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const queryClient = useQueryClient()

  const { isLoading, isError, error, mutateAsync } = useMutation(login, {
    retry: 0,
    staleTime: 100000,
    onSuccess: (data) => {
      reset()
      queryClient.setQueryData('userInfo', data)
      navigate('/')
    },
  })

  useEffect(() => {
    localStorage.getItem('userInfo') && navigate('/')
  }, [navigate])

  const submitHandler = (data) => {
    mutateAsync(data)
  }
  return (
    <FormContainer>
      <h3 className=''>Sign In</h3>
      {isError && <Message variant='danger'>{error}</Message>}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='mb-3'>
          <label htmlFor='email'>Email Address</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.+\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type='email'
            className='form-control'
            placeholder='Enter email'
            autoFocus
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', { required: 'Password is required' })}
            type='password'
            placeholder='Enter password'
            className='form-control'
          />
          {errors.password && (
            <span className='text-danger'>{errors.password.message}</span>
          )}
        </div>

        <button type='submit' className='btn btn-primary ' disabled={isLoading}>
          {isLoading ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className='row pt-3'>
        <div className='col'>
          <Link to='/forgot'> Forgot Password</Link>
        </div>
      </div>
      <div className='row '>
        <div className='col'>
          New Customer?
          <Link to='/register'> Register</Link>
        </div>
      </div>
    </FormContainer>
  )
}

export default LoginScreen