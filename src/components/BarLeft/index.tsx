import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../services/api'
import { getFirstLetterAndColor } from '../../utils'
import { Header, Menu, Profile } from './styles'
import { ProfileAvatar, ProfileName } from '../../styles'
import logo from '../../assets/icon.svg'
import grok from '../../assets/grok.svg'
import letter from '../../assets/letter.svg'
import bell from '../../assets/bell.svg'
import more from '../../assets/more.svg'
import profile from '../../assets/profile.svg'
import magnifier from '../../assets/magnifier.svg'
import home from '../../assets/home.svg'
import tape from '../../assets/tape.svg'
import ray from '../../assets/ray.svg'
import cloud from '../../assets/cloud.svg'
import community from '../../assets/community.svg'
import closeUser from '../../assets/closeUser.svg'

const BarLeft = () => {
  const { data: user } = useGetCurrentUserQuery()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/entry')
  }

  let avatarColor = ''
  let firstLatter = ''

  if (user) {
    const result = getFirstLetterAndColor(user.username, user.id)
    avatarColor = result.avatarColor
    firstLatter = result.firstLetter
  }

  const handlePostClick = () => {
    setTimeout(() => {
      const section = document.getElementById('postar')
      section?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <Header>
      <Menu>
        <h1>
          <img src={logo} alt="logo X" />
        </h1>
        <p>
          <img src={home} alt="icone de home" />
          Página Inicial
        </p>
        <p>
          <img src={magnifier} alt="icone de explorar" />
          Explorar
        </p>
        <p>
          <img src={bell} alt="icone de notificação" />
          Notificações
        </p>
        <p>
          <img src={letter} alt="icone de mensagens" />
          Mensagens
        </p>
        <p>
          <img src={grok} alt="icone do grok" />
          Grok
        </p>
        <p>
          <img src={tape} alt="icone de itens salvos" />
          Itens salvos
        </p>
        <p>
          <img src={community} alt="icone comunidade" />
          Comunidades
        </p>
        <p>
          <img src={cloud} alt="icone do premium" />
          Premium
        </p>
        <p>
          <img src={ray} alt="icone do organizações verificadas" />
          Organizações Ve...
        </p>
        <p>
          <img src={profile} alt="icone do perfil" />
          Perfil
        </p>
        <p>
          <img src={more} alt="icone de mais" />
          Mais
        </p>
      </Menu>
      <button onClick={handlePostClick} title="postar" type="button">
        Postar
      </button>
      {user && (
        <Profile>
          <div>
            <ProfileAvatar style={{ backgroundColor: avatarColor }}>
              {firstLatter}
            </ProfileAvatar>
            <ProfileName>{user.username}</ProfileName>
          </div>
          <img
            onClick={handleLogout}
            src={closeUser}
            alt="icone para sair do perfil"
          />
        </Profile>
      )}
    </Header>
  )
}

export default BarLeft
