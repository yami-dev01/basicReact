import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

interface GithubUser {
    followers: number;
    avatar_url: string;
}


function Github() {
    // const data = useLoaderData()
    const [data, setData] = useState<GithubUser>({
      followers: 0,
      avatar_url: ''
    })
    useEffect(() => {
     fetch('https://api.github.com/users/yami-dev01')
     .then(response => response.json())
     .then(data => {
        console.log(data);
        setData(data)
     })
    }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data?.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/yami-dev01')
    return response.json()
}