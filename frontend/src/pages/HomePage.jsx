import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                    <h1>Welcome to the simple QQ's POS</h1>
                    <p>This is QQ Convenience</p>
                    <p>If you have an issue, call 123-456-7890</p>
                    <Link to='/pos' className='btn btn-primary'>Click here to sell products</Link>
                </div>
        </MainLayout>
  )
}

export default HomePage
