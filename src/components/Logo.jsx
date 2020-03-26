import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../not_istu.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="/staff">
                <img src={logo} width="50" height="50" alt="istu.edu" />
            </Wrapper>
        )
    }
}

export default Logo