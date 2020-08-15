import React from 'react'
import { css } from '@emotion/core'

export default function Error404({ title }) {
    return (
        <h1
            css={css`
                    margin-top: 5rem;
                    text-align: center;
                `}
        >
            {title}
        </h1>
    )
}