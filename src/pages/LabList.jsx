import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import api from '../api'

import styled from 'styled-components'


//Styling of the html blocks
// const Wrapper = styled.div`
//     padding: 5px 5px 5px 5px;

// `
const Wrapper = styled.div.attrs({
    className: 'container-xl'
})`
    padding: 5px 15px 0px 15px;

`
const AddButtonLink = styled.a.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const Update_Button = styled.div`
    color: #39c800;
    cursor: pointer;
`
const Delete_Button = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateALab extends Component {
    updateALab = event => {
        event.preventDefault()

        window.location.href = `/laboratories/${this.props.id}`
    }
    render() {
                // eslint-disable-next-line
        return <Update_Button onClick={this.updateALab}>Изменить</Update_Button>
    }
}
class DeleteALab extends Component {
    deleteALab = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Вы хотите избавиться от этой лаборатории?`,
            )
        )   {
            api.deleteALaboratory(this.props.id)
            window.location.reload()
        }
    }
    render() {
                // eslint-disable-next-line
        return <Delete_Button onClick={this.deleteALab}>Удалить</Delete_Button>
    }
    
}

class LabList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            laboratories: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllLaboratories().then(laboratories => {
            this.setState({
                laboratories: laboratories.data.data,
                isLoading: false,
            })
        })
    }

    render() {

        const { laboratories, isLoading } = this.state
        console.log(`TCL: LabList -> render -> laboratories`, laboratories)

        const columns = [
            {
                Header: 'Лаборатория',
                accessor: 'lab_name',
                filterable: true,
            },
            {
                Header: 'Руководитель',
                accessor: 'boss',
                filterable: true,
            },
            {
                Header: 'Контакт',
                accessor: 'contact',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                width: 150,
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateALab id={props.original._id} />
                            <DeleteALab id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!laboratories.length) {
            showTable = false
            return (
                // eslint-disable-next-line
                <Wrapper>
                    Нет лабораторий в базе
                    <p></p>
                    <AddButtonLink href={'/laboratories/add'}>Создать лабораторию</AddButtonLink>
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                {
                    // eslint-disable-next-line
                    <AddButtonLink href={'/laboratories/add'}>Создать лабораторию</AddButtonLink>
                }
                {
                    showTable && (
                        <ReactTable 

                            data={laboratories}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={20}
                            showPageSizeOptions={true}
                            minRows={0}
                            // renderRowSubComponent={renderRowSubComponent}

                        />
                    )
                }
            </Wrapper>
        )
    }
}

export default LabList