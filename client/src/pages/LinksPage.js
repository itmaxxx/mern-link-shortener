import React, { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h1>Your shortened links</h1>
            { !loading && links && <LinksList links={links} /> }
        </>
    )
}