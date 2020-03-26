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

class BraAdd extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            faculty_id: this.props.match.params.id,
            faculty: '',
            bra_type: '',
            bra_name: '',
            boss: '', 
            contact: '',
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getFacultyByID(this.props.match.params.id).then(faculty => {

            this.setState({
                faculty: faculty.data.data.fac_name,
                isLoading: false,
            })
        })
    }

    handleChangeInputBraType = async event => {
        const bra_type = event.target.value
        this.setState({ bra_type })
    }
    handleChangeInputBraName = async event => {
        const bra_name = event.target.value
        this.setState({ bra_name })
    }
    handleChangeInputBoss = async event => {
        const boss = event.target.value
        this.setState({ boss })
    }
    handleChangeInputContact = async event => {
        const contact = event.target.value
        this.setState({ contact })
    }

    handleAddABranch = async () => {

        const {
            faculty_id,
            bra_type,
            bra_name,
            boss,
            contact,
        } = this.state
 
        const payload = {
            faculty_id,    
            bra_type, 
            bra_name,
            boss,
            contact,
        }

        await api.addABranch(faculty_id, payload).then(res => {
            window.alert(`Подразделение успешно добавлено`)
            this.setState({
                bra_type: '',
                bra_name: '',
                boss: '',
                contact: '',
            })
            window.location.href = `/faculty_b/${faculty_id}`
        })
    }

    render() {
        const {
            bra_type,
            bra_name,
            boss,
            contact,
            faculty,
            faculty_id,
        } = this.state

        return (
            <Wrapper>
                <Title>Добавление нового подразделения в: { faculty } </Title>

                <Label>Тип подразделения(кафедра, отдел, лаборатория): </Label>
                <InputText 
                    type="text"
                    value={bra_type}
                    onChange={this.handleChangeInputBraType}
                />
                <Label>Название: </Label>
                <InputText 
                    type="text"
                    value={bra_name}
                    onChange={this.handleChangeInputBraName}
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

                <Button onClick={this.handleAddABranch}>Создать</Button>
                <CancelButton href={`/faculty_b/${faculty_id}`}>Отмена</CancelButton>
            </Wrapper>
        )
    }

}

export default BraAdd
