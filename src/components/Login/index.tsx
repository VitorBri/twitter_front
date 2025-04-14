import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../../services/api'
import { colors, InputGlobal } from '../../styles'
import Button from '../Button'
import { Content, Title } from './styles'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isError, isSuccess, data }] = useLoginMutation()

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório')
    }),
    onSubmit: (values) => {
      login({
        username: values.username,
        password: values.password
      })
    }
  })

  if (isSuccess && data?.access) {
    localStorage.setItem('access_token', data.access)
    navigate('/feed')
  }

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isInvalid =
      fieldName in form.errors &&
      form.touched[fieldName as keyof typeof form.touched]
    return isInvalid ? message : ''
  }

  return (
    <Content>
      <Title>Entrar no X</Title>

      <form onSubmit={form.handleSubmit}>
        <InputGlobal>
          <input
            type="text"
            id="username"
            name="username"
            placeholder=""
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <label htmlFor="username">Usuário</label>
          <small>{getErrorMessage('username', form.errors.username)}</small>
        </InputGlobal>

        <InputGlobal>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <label htmlFor="password">Senha</label>
          <small>{getErrorMessage('password', form.errors.password)}</small>
        </InputGlobal>

        {isError && <span>Usuário ou senha inválidos.</span>}

        <Button
          type="submit"
          title="Avançar para página de feed"
          bgColor={colors.black}
          textColor={colors.white}
        >
          Avançar
        </Button>
      </form>
    </Content>
  )
}

export default Login
