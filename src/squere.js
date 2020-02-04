import React from 'react';


export const Squere = ({item}) => {
    const content = item.isAlive ? 'black' : ''
    return (
        <div className={`squere ${content}`}>
            {item.number}
        </div>
    )
}