import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
// import { BraUpdate } from '.'

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

class BraUpdate extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            faculty_id: '',
            bra_type: '',
            bra_name: '',
            boss: '', 
            contact: '',
        }
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
    goBack() {
        window.history.back()
    }

    handleUpdateABranch = async () => {

        const {
            id,
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
        await api.updateBraById(id, payload).then(res => {
            window.alert(`Подразделение ${payload.bra_name} успешно обновлено`)
            this.setState({
                bra_type: '',
                bra_name: '',
                boss: '',
                contact: '',
            })
            window.location.href = `/faculty_b/${faculty_id}`
            // window.history.back()
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const branch = await api.getBranchByID(id)

        console.log(branch)

        this.setState({
            faculty_id: branch.data.data.faculty_id,
            bra_type: branch.data.data.bra_type,
            bra_name: branch.data.data.bra_name,
            boss: branch.data.data.boss,
            contact: branch.data.data.contact,
        })
    }

    render() {
        const {
            bra_type,
            bra_name,
            faculty_id,
            boss,
            contact,
        } = this.state

        return (
            <Wrapper>
                <Title>Редактирование подразделения: { bra_name } </Title>

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

                <Button onClick={this.handleUpdateABranch}>Обновить</Button>
                <CancelButton href={`/faculty_b/${faculty_id}`}>Отмена</CancelButton>
                {/* <CancelButton onClick={this.goBack}>Отмена</CancelButton> */}
            </Wrapper>
        )
    }

}

export default BraUpdate
