import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``
const Wrapper = styled.div.attrs({
    className: 'container-xl'
})`
    padding: 5px 15px 0px 15px;

`
const Label = styled.label`
    margin: 5px;
`
const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class FacUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fac_name: '',
            boss: '',
            contact: '',
        }
    }

    handleChangeInputFacName = async event => {
        const fac_name = event.target.value
        this.setState({ fac_name })
    }
    handleChangeInputBoss = async event => {
        const boss = event.target.value
        this.setState({ boss })
    }
    handleChangeInputContact = async event => {
        const contact = event.target.value
        this.setState({ contact })
    }

    handleUpdateFac = async () => {
        const { id, 
                fac_name, 
                boss, 
                contact,
        } = this.state

        const payload = { 
                    fac_name, 
                    boss, 
                    contact,
            }

        await api.updateFacById(id, payload).then(res => {
            window.alert(`Факультет\\Институт ${payload.fac_name} успешно обновлён`)
            this.setState({
                fac_name: '',
                boss: '',
                contact: '',
            })
            window.location.href = `/faculties`
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const faculty = await api.getFacultyByID(id)

        this.setState({
            fac_name: faculty.data.data.fac_name,
            boss: faculty.data.data.boss,
            contact: faculty.data.data.contact,
        })
    }

    render() {
        const { fac_name, boss, contact } = this.state
        return (
            <Wrapper> 
                <Title>Изменить данные по Факультету\Институту: { fac_name } </Title>

                <Label>Название: </Label>
                <InputText
                    type="text"
                    value={fac_name}
                    onChange={this.handleChangeInputFacName}
                />
                <Label>Руководитель: </Label>
                <InputText
                    type="text"
                    value={ boss }
                    onChange={this.handleChangeInputBoss}
                />
                <Label>Контакт: </Label>
                <InputText
                    type="text"
                    value={ contact }
                    onChange={this.handleChangeInputContact}
                />

                <Button onClick={this.handleUpdateFac}>Изменить</Button>
                <CancelButton href={'/faculties'}>Отмена</CancelButton>
            </Wrapper>
        )
    }
}

export default FacUpdate