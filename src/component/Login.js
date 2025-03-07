import '../css/Login.css'
import { NavLink, useNavigate} from 'react-router-dom'
import Language from './Language'
import { useContext } from 'react'
import { context } from './Context'
export default function Login() {
  const Navigate = useNavigate()
  const {setName} = useContext(context);
  function submit(e){
    e.preventDefault()
    Navigate('/Page')
  }
  return ( 
    <div>
        <Language/> 
        <div className='Log'>
            <h1>𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</h1>
            <form onSubmit={submit}>
            <div className='Login'>
                <input type="email number" onChange={(e)=>{setName(e.target.value)}} placeholder='Phone number,username, or email' required/>
                <input type="password" placeholder='Password' required/>
                <span><NavLink to={'/ForgetPassword'}>Forget password?</NavLink></span>
            </div>
            <button>Log in</button>
            </form>
            <p><span>Don't have an account?</span> <NavLink to={"/signup"}>Sign up</NavLink></p>
        </div>
    </div>
  )
}
