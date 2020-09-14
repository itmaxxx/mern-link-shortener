import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link</h2>
            
            <p>Source link <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Shortened link <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks {link.clicks}</p>
            <p>Created {new Date(link.date).toLocaleDateString()}</p>
        </>
    )
}