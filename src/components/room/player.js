import React from 'react'

export default ({ children, ...restProps }) => (
    <div {...restProps}>{children}</div>
)
