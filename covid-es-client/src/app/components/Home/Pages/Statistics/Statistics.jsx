import React, { useEffect, useState } from 'react'
import axinstance from '../../../../../services/AxiosService'


export default function Statistics() {
    const [stats, setStats] = useState('')
    useEffect(() => {
        axinstance.get('/Statistics').then((data) => setStats(data.data.data));
    }, [])

    return (
        <>
            <h4>{stats || ''}</h4>
        </>
    )
}
