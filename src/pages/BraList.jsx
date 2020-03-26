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
const Title = styled.h1.attrs({
    className: 'h1',
})``
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
class UpdateABra extends Component {
    updateABra = event => {
        event.preventDefault()

        window.location.href = `/faculty_bu/${this.props.id}`
    }
    render() {
        
                // eslint-disable-next-line
        return <Update_Button onClick={this.updateABra}>Изменить</Update_Button>
    }
}
class DeleteABra extends Component {
    deleteABra = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Вы хотите избавиться от этого подразделения?`,
            )
        )   {
            api.deleteABranch(this.props.id)
            window.location.reload()
        }
    }
    render() {
                // eslint-disable-next-line
        return <Delete_Button onClick={this.deleteABra}>Удалить</Delete_Button>
    }
    
}




class BraList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            branches: [],
            faculty : '',
            columns: [],
            isLoading: false,
        }

        console.log(this.props.match.params.id + " ВОТ ТУТ ID фака...")
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getBranchesByFac(this.props.match.params.id).then(branches => {

            this.setState({
                branches: branches.data.data,
                isLoading: false,
            })
        })
        await api.getFacultyByID(this.props.match.params.id).then(faculty => {

            this.setState({
                faculty: faculty.data.data.fac_name,
                isLoading: false,
            })
        })
    }

    render() {

        const { branches, faculty, isLoading } = this.state
        console.log(`TCL: BraList -> render -> branches`, branches)

        const columns = [
            {
                Header: 'Тип',
                accessor: 'bra_type',
                filterable: true,
            },
            {
                Header: 'Подразделение',
                accessor: 'bra_name',
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
                            <UpdateABra id={props.original._id} />
                            <DeleteABra id={props.original._id} />
                        </span>
                    )
                },
            },
        ]


        
        let showTable = true

        if (!branches.length) {
            showTable = false
            return (
                // eslint-disable-next-line
                <Wrapper>
                    <Title> {faculty} </Title>
                    <p></p>
                    Нет подразделений в этом Факультете\Институте
                    <p></p>
                    <AddButtonLink href={`/faculty_b/${this.props.match.params.id}/add`}>Добавить подразделение</AddButtonLink>
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                    <Title> {faculty} </Title>
                    <p></p>
                {
                    // eslint-disable-next-line
                    <AddButtonLink href={`/faculty_b/${this.props.match.params.id}/add`}>Добавить подразделение</AddButtonLink>
                }
                {
                    showTable && (
                        <ReactTable 

                            data={branches}
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

export default BraList