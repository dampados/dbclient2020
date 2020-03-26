import React, { Component } from 'react'
import Select from 'react-select'
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
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class StaffUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

            phone_numbers: '',

            branches: [],
            laboratories: [],

            bras: '',
            labs: '',

            facs: '',
        }
    }

    componentDidMount = async () => {

        const bras = await api.getAllBranches()
        const labs = await api.getAllLaboratories()
        const facs = await api.getAllFaculties()

        const { id } = this.state
        const worker = await api.getStaffByID(id)

        this.setState({
            bras:       bras.data.data,
            facs:       facs.data.data,
            labs:       labs.data.data,

            firstName:      worker.data.data.firstName, 
            middleName:     worker.data.data.middleName, 
            lastName:       worker.data.data.lastName, 
            position:       worker.data.data.position, 
            birth_date:     worker.data.data.birth_date.substr(0, 10), 
            speciality:     worker.data.data.speciality,
            qualification:  worker.data.data.qualification,
           ovarral_standing:worker.data.data.ovarral_standing, 
            academic_degree:worker.data.data.academic_degree, 
            academic_rank:  worker.data.data.academic_rank,
            phone_numbers:  worker.data.data.phone_numbers,
            branches:       worker.data.data.branches,
            laboratories:   worker.data.data.laboratories,            
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
            phone_numbers,

            branches,
            laboratories,

            bras,
            labs,
            facs,
        } = this.state


        var defaultBraOptions = []
        var defaultLabOptions = []
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

        for (let i = 0; i < facs.length; i++) {
            let buffer_id = facs[i]._id
            let groupedBranches = []
            for (let j = 0; j < bras.length; j++) {
                    if (bras[j].faculty_id === buffer_id) {
                        groupedBranches.push({
                            label: bras[j].bra_name,
                            value: bras[j]._id,
                            isFixed: true,
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
                isFixed: true,
            })
        }

        

        for (let i = 0; i < optionsLaboratories.length; i++) {
                if ( laboratories.includes( optionsLaboratories[i].value) ) {
                    let element = optionsLaboratories[i]
                    defaultLabOptions.push(element)
            }   
        }
        for (let i = 0; i < groupedOptionsBranches.length; i++) {
            for (let j = 0; j < groupedOptionsBranches[i].options.length; j++) {
                if ( branches.includes( groupedOptionsBranches[i].options[j].value) ) {
                    let element = groupedOptionsBranches[i].options[j]
                    defaultBraOptions.push(element)
                }
            }   
        }

        let showSelect = true
        if (!groupedOptionsBranches.length) {
            showSelect = false
        }
        let showSelect2 = true
        if (!optionsLaboratories.length) {
            showSelect2 = false
        }
        
        return (
            <Wrapper>
                <Title>{ lastName } { firstName } { middleName }</Title>

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

                <Label>Номера телефонов(через запятую): </Label>
                <InputText
                    type="text"
                    value={phone_numbers}
                    onChange={this.handleChangeInputPhoneNumbers}
                />

                <Label>Работа в подразделениях: </Label>
                <SelectBlock>
                {
                    showSelect && (
                        <Select 
                            defaultValue={defaultBraOptions}
                            isMulti
                            options={groupedOptionsBranches} 
                            formatGroupLabel={formatGroupLabel}
                            placeholder="Выберите подразделения..."
                            className="basic-multi-select"
                            isDisabled
                            // isClearable={this.state.value.some(v => !v.isFixed)}
                            // onChange={ 
                            //     // (sel) => this.handleChangeInputBranches(sel)
                            // }
                        />
                    )
                }
                </SelectBlock>

                <Label>Работа в лабораториях: </Label>
                <SelectBlock>
                {
                    showSelect2 && (
                        <Select 
                            defaultValue={defaultLabOptions}                    
                            isMulti
                            options={optionsLaboratories} 
                            placeholder="Выберите лаборатории..."
                            isDisabled
                            // onChange={ 
                            //     // (sell) => this.handleChangeInputLaboratories(sell)
                            // }    
                        />
                    )
                }    
                </SelectBlock>
                


                <p></p>
                {/* <Button onClick={this.handleUpdateAWorker}>Обновить</Button> */}
                <CancelButton href={'/staff'}>Назад</CancelButton>
            </Wrapper>
        )
    }
}

export default StaffUpdate