import { Link } from 'react-router-dom'
import '../css/ForgetPassword.css'
import Language from './Language'

export default function ForgetPassword() { 
  return (
    <div>
        <Language/>
        <div className='ForgetPassword'>
          <h3>what's your mobile number?</h3>
          <p>Enter the mobile number where you can be contacted. No one will see this on your profile</p>
          <input type="text" placeholder='Mobile number'/>
          <p>You may receive WhatsApp and SMS notifications from us for security and login purposes</p>
          <div className='ForgetPass'>
              <button className='butt1'>Next</button>
              <Link to={'/'}><button className='butt2'>Sign up with email</button></Link>
          </div>
        </div>
    </div>
  )
}
