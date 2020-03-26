import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>

                <Link to="/staff" className="navbar-brand">
                    ИрНИТУ
                </Link>

                <Collapse>
                    <List>
                        <Item>
                            <Link to="/staff" className="nav-link">
                                Сотрудники
                            </Link>
                        </Item>
                        
                        <Item>
                            <Link to="/faculties" className="nav-link">
                                Факультеты
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/laboratories" className="nav-link">
                                УИЛы
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/phonebook2" className="nav-link">
                                Телефонный справочник
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/document2" className="nav-link">
                                Документ 2
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/document3" className="nav-link">
                                Документ 3
                            </Link>
                        </Item>
                    </List>
                </Collapse>

            </React.Fragment>
        )
    }
}

export default Links