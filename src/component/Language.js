import React from 'react'

export default function Language() {
  return (
    <div> 
        <div className='dropdown'>
            <button className='btn btn-primery dropdown-toggle m-auto' data-bs-toggle='dropdown' style={{color:'black'}}>English</button>
            <ul className='dropdown-menu'>
                <li>English</li>
                <li>Germany</li>
                <li>فارسی</li>
                <li>spania</li>
                <li>holand</li>
            </ul>
        </div>
    </div>
  )
}
