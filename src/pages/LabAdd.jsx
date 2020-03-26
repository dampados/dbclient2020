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

class LabAdd extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            lab_name: '',
            boss: '', 
            contact: '',
        }
    }

    handleChangeInputLabName = async event => {
        const lab_name = event.target.value
        this.setState({ lab_name })
    }
    handleChangeInputBoss = async event => {
        const boss = event.target.value
        this.setState({boss})
    }
    handleChangeInputContact = async event => {
        const contact = event.target.value
        this.setState({contact})
    }

    handleAddALaboratory = async () => {

        const {
            lab_name,
            boss,
            contact,
        } = this.state

        const payload = {
            lab_name,
            boss,
            contact,
        }

        await api.addALaboratory(payload).then(res => {
            window.alert(`Лаборатория успешно создана`)
            this.setState({
                lab_name: '',
                boss: '',
                contact: '',
            })
            window.location.href = '/laboratories'
        })
    }

    render() {
        const {
            lab_name,
            boss,
            contact,
        } = this.state

        return (
            <Wrapper>
                <Title>Создание новой лаборатории</Title>

                <Label>Название: </Label>
                <InputText 
                    type="text"
                    value={lab_name}
                    onChange={this.handleChangeInputLabName}
                />
                <Label>Руководитель: </Label>
                <InputText 
                    type="text"
                    value={boss}
                    onChange={this.handleChangeInputBoss}
                />
                <Label>Контакт: </Label>
                <InputText 
                    type="text"
                    value={contact}
                    onChange={this.handleChangeInputContact}
                />

                <Button onClick={this.handleAddALaboratory}>Создать</Button>
                <CancelButton href={'/laboratories'}>Отмена</CancelButton>
            </Wrapper>
        )
    }

}

export default LabAdd
