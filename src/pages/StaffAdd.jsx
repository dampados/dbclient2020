import React, { Component } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import api from '../api'

import styled from 'styled-components'

// styling blocks...
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
const SelectBlock = styled.div.attrs({ 
})`
    margin: 5px;
    width: 60%;
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

class StaffAdd extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            position: '',

            birth_date: '',
            
            speciality: '',
            qualification: '',
            ovarral_standing: '',
            
            academic_degree: '',
            academic_rank: '',

            phone_numbers: [],

            branches: [],
            laboratories: [],

            bras: '',
            labs: '',

            facs: '',
        }
    }

    handleChangeInputFirstName = async event => {
        const firstName = event.target.value
        this.setState({ firstName })
    }
    handleChangeInputMiddleName = async event => {
        const middleName = event.target.value
        this.setState({ middleName })
    }
    handleChangeInputLastName = async event => {
        const lastName = event.target.value
        this.setState({ lastName })
    }
    handleChangeInputPosition = async event => {
        const position = event.target.value
        this.setState({ position })
    }


    handleChangeInputBirthDate = async event => {
        const birth_date = event.target.validity.valid
            ? event.target.value
            : this.state.birth_date

        this.setState({ birth_date })
    }
    handleChangeInputSpeciality = async event => {
        const speciality = event.target.value
        this.setState({ speciality })
    }
    handleChangeInputQualification = async event => {
        const qualification = event.target.value
        this.setState({ qualification })
    }
    handleChangeInputOvarralStanding = async event => {
        const ovarral_standing = event.target.value
        this.setState({ ovarral_standing })
    }
    handleChangeInputacAdemicDegree = async event => {
        const academic_degree = event.target.value
        this.setState({ academic_degree })
    }
    handleChangeInputAcademicRank = async event => {
        const academic_rank = event.target.value
        this.setState({ academic_rank })
    }
    handleChangeInputPhoneNumbers = async event => {

        console.log(event)

        let phone_numbers = []
        if (!event) {
            phone_numbers = []
        } else {
            event.forEach(element => {
                if (isNaN(element.value)) {
                    console.log("ЭТО ТЕКСТ, АЛО, РЕБЯТА, ВЫ ПСИХИ?!?")
                } else {
                    phone_numbers.push(parseInt(element.value))
                }
                
            })
        }

        console.log(phone_numbers)

        this.setState({ phone_numbers })
    }

    handleChangeInputBranches = async event => {
        let branches = []
        if (!event) {
            branches = []
        } else {
            event.forEach(element => {
                branches.push(element.value)
            })
        }
        this.setState({ branches })
    }

    handleChangeInputLaboratories = async event => {
        let laboratories = []
        if (!event) {
            laboratories = []
        } else {
            event.forEach(element => {
                laboratories.push(element.value)
            })
        }
        this.setState({ laboratories })
    }
    
    handleAddAWorker = async () => {

        const { 
            firstName, 
            middleName, 
            lastName, 
            position, 
            birth_date, 
            speciality,
            qualification,
            ovarral_standing, 
            academic_degree, 
            academic_rank,
            phone_numbers,
            branches,
            laboratories
        } = this.state

        const payload = { 
            firstName, 
            middleName, 
            lastName, 
            position, 
            birth_date, 
            speciality,
            qualification,
            ovarral_standing, 
            academic_degree, 
            academic_rank,
            phone_numbers,
            branches,
            laboratories,
        }

        await api.addAWorker(payload).then(res => {
            window.alert(`Сотрудник успешно добавлен`)
            this.setState({
                firstName: '', 
                middleName: '', 
                lastName: '', 
                position: '', 
                birth_date: '', 
                speciality: '',
                qualification: '',
                ovarral_standing: '', 
                academic_degree: '', 
                academic_rank: '',
                phone_numbers: [],
                branches: [],
                laboratories: [],
            })
        })

        window.location.href = "/staff"
    }


    componentDidMount = async () => {

        const bras = await api.getAllBranches()
        const labs = await api.getAllLaboratories()
        const facs = await api.getAllFaculties()

        this.setState({
            bras:       bras.data.data,
            facs:       facs.data.data,
            labs:       labs.data.data,
        })

    }

    render() {
        const { 
            firstName, 
            middleName, 
            lastName, 
            position, 
            birth_date, 
            speciality,
            qualification,
            ovarral_standing, 
            academic_degree, 
            academic_rank,
            // phone_numbers,

            // branches,
            // laboratories,

            bras,
            labs,
            facs,
        } = this.state



        var groupedOptionsBranches = []
        var optionsLaboratories = []
        const groupStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        };
        const groupBadgeStyles = {
            backgroundColor: '#EBECF0',
            borderRadius: '2em',
            color: '#172B4D',
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: '1',
            minWidth: 1,
            padding: '0.16666666666667em 0.5em',
            textAlign: 'center',
        };
        const formatGroupLabel = groupedOptions => (
            <div style={groupStyles}>
                <span>{groupedOptions.label}</span>
                <span style={groupBadgeStyles}>{groupedOptions.options.length}</span>
            </div>
        );

        for (var i = 0; i < facs.length; i++) {
            let buffer_id = facs[i]._id
            let groupedBranches = []
            for (let j = 0; j < bras.length; j++) {
                    if (bras[j].faculty_id === buffer_id) {
                        groupedBranches.push({
                            label: bras[j].bra_name,
                            value: bras[j]._id,
                        })
                    }
            }
            groupedOptionsBranches.push({
                label: facs[i].fac_name,
                options: groupedBranches,
            })
        }

        for (let i = 0; i < labs.length; i++) {
            optionsLaboratories.push({
                label: labs[i].lab_name,
                value: labs[i]._id,
            })            
        }

        
        return (
            <Wrapper>
                <Title>Добавление сотрудника:</Title>

                <Label>Фамилия: </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={this.handleChangeInputLastName}
                />
                <Label>Имя: </Label>
                <InputText
                    type="text"
                    value={firstName}
                    onChange={this.handleChangeInputFirstName}
                />
                <Label>Отчество (если есть): </Label>
                <InputText
                    type="text"
                    value={middleName}
                    onChange={this.handleChangeInputMiddleName}
                />


                <Label>Должность: </Label>
                <InputText
                    type="text"
                    value={position}
                    onChange={this.handleChangeInputPosition}
                />

                <Label>Дата рождения: </Label>
                <InputText
                    type="date"
                    value={birth_date}
                    onChange={this.handleChangeInputBirthDate}
                    required pattern="\d{4}-\d{2}-\d{2}"
                />

                <Label>Специальнось: </Label>
                <InputText
                    type="text"
                    value={speciality}
                    onChange={this.handleChangeInputSpeciality}
                />

                <Label>Квалификация: </Label>
                <InputText
                    type="text"
                    value={qualification}
                    onChange={this.handleChangeInputQualification}
                />

                <Label>Общий стаж (лет): </Label>
                <InputText
                    type="number"
                    value={ovarral_standing}
                    onChange={this.handleChangeInputOvarralStanding}
                />

                <Label>Академическая степень: </Label>
                <InputText
                    type="text"
                    value={academic_degree}
                    onChange={this.handleChangeInputacAdemicDegree}
                />

                <Label>Академическое звание: </Label>
                <InputText
                    type="text"
                    value={academic_rank}
                    onChange={this.handleChangeInputAcademicRank}
                />

                <Label>Номера телефонов(Не пишите текст! Он не добавится в базу): </Label>
                <SelectBlock>
                <CreatableSelect 
                    isClearable
                    isMulti
                    formatCreateLabel={(inputValue) => `Добавить номер ${inputValue}`}
                    onChange={ 
                        (sell) => {
                                this.handleChangeInputPhoneNumbers(sell)
                        }
                    }
                />
                </SelectBlock>


                <Label>Работа в подразделениях: </Label>
                <SelectBlock>
                <Select 
                    isMulti
                    options={groupedOptionsBranches} 
                    formatGroupLabel={formatGroupLabel}
                    placeholder="Выберите подразделения..."
                    onChange={ 
                        (sel) => this.handleChangeInputBranches(sel)
                    }
                />
                </SelectBlock>

                <Label>Работа в лабораториях: </Label>
                <SelectBlock>
                <Select 
                    isMulti
                    options={optionsLaboratories} 
                    placeholder="Выберите лаборатории..."
                    onChange={ 
                        (sell) => this.handleChangeInputLaboratories(sell)
                    }
                />
                </SelectBlock>
                


                <p></p>
                <Button onClick={this.handleAddAWorker}>Добавить</Button>
                <CancelButton href={'/staff'}>Отмена</CancelButton>
            </Wrapper>
        )
    }
}

export default StaffAdd