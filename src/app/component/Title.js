import React from 'react'

const Title = ({ children, className }) => {
    return (
        <div className={className + ' font-semibold text-lg text-slate-950 mb-4'}>{children}</div>
    )
}

export default Title