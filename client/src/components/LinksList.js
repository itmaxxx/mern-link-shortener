import React from 'react'
import { NavLink } from 'react-router-dom'

export const LinksList = ({ links }) => {
    return (
        <table className="highlight">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Source link</th>
                    <th>Shortened link</th>
                    <th>Details</th>
                </tr>
            </thead>

            <tbody>
                { 
                    links.length ? 
                        links.map((link, index) => {
                        return (
                            <tr key={link._id}>
                                <td>{index + 1}</td>
                                <td><a href="{link.to}" target="_blank" rel="noopener noreferrer">{link.to}</a></td>
                                <td><a href="{link.from}" target="_blank" rel="noopener noreferrer">{link.from}</a></td>
                                <td><NavLink to={`/details/${link._id}`}>View stats</NavLink></td>
                            </tr>
                        )
                    })
                    :
                    (
                        <tr>
                            <td colSpan="4">You don't have any links yet</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}