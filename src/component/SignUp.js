import { useState } from 'react'
import '../css/SignUP.css'
import Language from './Language'

export default function SignUp() {
    const [display_phone, setDisplay_phone] = useState(true)
    const [display_email, setDisplay_email] = useState(false)
    function Change_phone(){
        setDisplay_phone(true)
        setDisplay_email(false)
    }
    function Change_email(){
        setDisplay_phone(false)
        setDisplay_email(true)
    }
  return ( 
    <div>
        <Language/>
        <div className='row'>
            <div className='col-6'>
                <p onClick={()=>Change_phone()} className={display_phone ? 'border_phone' : ''}>PHONE</p>
            </div>
            <div className='col-6'>
                <p onClick={()=>Change_email()} className={display_email ? 'border_phone' : ''}>EMAIL</p>
            </div>
            <div className={display_phone ? 'display_block phone' : 'display_none'}>
                <div className=' input-group mt-3 mb-3'>
                    <button type='button' className='btn btn-primary dropdown-toggle' data-bs-toggle="dropdown">IR +98</button>
                    <ul className='dropdown-menu'>
                        <li>+97</li>
                        <li>+94</li>
                        <li>+93</li>
                        <li>+90</li>
                        <li>+95</li>
                    </ul>
                    <input type="text" placeholder='Phone number' className='form-control'/>
                    <p>You may receive SMS notifications from us for security and login purposes</p>
                </div>
            </div>

            <div className={display_email ? 'display_block phone' : 'display_none'}>
                <div className=' input-group mt-3 mb-3'>
                    <input type="text" placeholder='Email Address' className='form-control'/>
                    <div className='container'>
                        <div className='scroll-container'>
                            <button>@gmail.com</button>
                            <button>@hotmail.com</button>
                            <button>@yahoo.com</button>
                            <button>@sima.com.com</button>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <button className='btn btn-primary button'>Next</button>
            </div>
        </div>
    </div>
  )
}
