import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import api from '../api'

import styled from 'styled-components'


//Styling of the html blocks
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
const ShowButtonLink = styled.a.attrs({
    className: `btn btn-warning`,
})``

const Update_Button = styled.div`
    color: #39c800;
    cursor: pointer;
`
const Delete_Button = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class ShowItsBranches extends Component {
    showItsBranches = event => {
        event.preventDefault()

        window.location.href = `/faculty_b/${this.props.id}`
    }
    render() {
        
                // eslint-disable-next-line
        return <ShowButtonLink onClick={this.showItsBranches}>Подразделения</ShowButtonLink>
    }
}
class UpdateAFac extends Component {
    updateAFac = event => {
        event.preventDefault()

        window.location.href = `/faculty/${this.props.id}`
    }
    render() {
        
                // eslint-disable-next-line
        return <Update_Button onClick={this.updateAFac}>Изменить</Update_Button>
    }
}
class DeleteAFac extends Component {
    deleteAFac = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Вы хотите избавиться от этого Факультета\\Института и всех его подразделений?`,
            )
        )   {
            api.deleteAFaculty(this.props.id)
            window.location.reload()
        }
    }
    render() {
                // eslint-disable-next-line
        return <Delete_Button onClick={this.deleteAFac}>Удалить</Delete_Button>
    }
    
}




class FacList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            faculties: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllFaculties().then(faculties => {
            this.setState({
                faculties: faculties.data.data,
                isLoading: false,
            })
        })
    }

    render() {

        const { faculties, branches, isLoading } = this.state
        console.log(`TCL: FacList -> render -> faculties`, faculties, branches)

        const columns = [
            {
                Header: 'Факультет',
                accessor: 'fac_name',
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
                            <ShowItsBranches id={props.original._id} />
                            <UpdateAFac      id={props.original._id} />
                            <DeleteAFac      id={props.original._id} />
                        </span>
                    )
                },
            },
        ]



        let showTable = true
        if (!faculties.length) {
            showTable = false
            return (
                // eslint-disable-next-line
                <Wrapper>
                    Нет Институтов и Факультетов в базе
                    <p></p>
                    <AddButtonLink href={'/faculty/add'}>Основать</AddButtonLink>
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                {
                    // eslint-disable-next-line
                    <AddButtonLink href={'/faculty/add'}>Основать</AddButtonLink>
                }
                {
                    showTable && (
                        <ReactTable 

                            data={faculties}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={20}
                            showPageSizeOptions={true}
                            minRows={0}

                        />
                    )
                }
            </Wrapper>
        )
    }
}

export default FacList