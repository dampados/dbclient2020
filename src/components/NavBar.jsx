import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container-xl',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-sm sticky-right navbar-light bg-light',
})`
    border-radius: 0px 0px 20px 20px;

    `

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar