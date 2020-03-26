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

const Show_Button = styled.div`
    color: #006400;
    cursor: pointer;
`
const Update_Button = styled.div`
    color: #39c800;
    cursor: pointer;
`
const Delete_Button = styled.div`
    color: #ff0000;
    cursor: pointer;
`

//Elements classes
class ShowAWorker extends Component {
    showAWorker = event => {
        event.preventDefault()

        window.location.href = `/staff/${this.props.id}`
    }
    
    render() {
        // eslint-disable-next-line
        return <Show_Button onClick={this.showAWorker}>Подробно</Show_Button>
    }
}
class UpdateAWorker extends Component {
    updateAWorker = event => {
        event.preventDefault()

        window.location.href = `/staff/update/${this.props.id}`
    }
    render() {
        // eslint-disable-next-line
        return <Update_Button onClick={this.updateAWorker}>Изменить</Update_Button>
    }
}
class DeleteAWorker extends Component {
    deleteAWorker = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Вы хотите избавиться от этого сотрудника?`,
            )
        )   {
            api.deleteAWorker(this.props.id)
            window.location.reload()
        }
    }
    render() {
        // eslint-disable-next-line
        return <Delete_Button onClick={this.deleteAWorker}>Удалить</Delete_Button>
    }
}

class StaffList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            staff: [],
            columns: [],
            isLoading: false,
            showInfo: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllStaffTable().then(staff => {
            this.setState({
                staff: staff.data.data,
                isLoading: false,
            })
        })
    }


    
    
    render() {
        const { staff, isLoading } = this.state
        console.log('TCL: StaffList -> render -> staff', staff)

        const columns = [
            {
                Header: 'Фамилия',
                accessor: 'lastName',
                filterable: true,
            },
            {
                Header: 'Имя',
                accessor: 'firstName',
                filterable: true,
            },
            // {
            //     Header: 'Отчество',
            //     accessor: 'middleName',
            //     filterable: true,
            // },
            {
                Header: 'Должность',
                accessor: 'position',
                filterable: true,
            },
            {
                Header: 'Дата рождения',
                accessor: 'birth_date',
                filterable: true,
                width: 100,
                Cell: function(props) {
                    let date = props.original.birth_date.substr(0, 10)
                    return (date)
                }
            },
            {
                Header: 'Стаж',
                accessor: 'ovarral_standing',
                filterable: true,
                width: 50,
            },
            // {
            //     Header: 'Ак. степень',
            //     accessor: 'academic_degree',
            //     filterable: true,
            // },
            // {
            //     Header: 'Ак. звание',
            //     accessor: 'academic_rank',
            //     filterable: true,
            // },
            {
                Header: 'Специальность',
                accessor: 'speciality',
                filterable: true,
            },
            {
                Header: 'Квалификация',
                accessor: 'qualification',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                width: 90,
                Cell: function(props) {
                    return (
                        <span>
                            <ShowAWorker    id={props.original._id} />
                            <UpdateAWorker  id={props.original._id} />
                            <DeleteAWorker  id={props.original._id} />
                        </span>
                        
                    )
                },
            },
        ]


        let showTable = true
        if (!staff.length) {
            showTable = false
            return (
                <Wrapper>
                    Нет сотрудников в базе
                    <p></p>
                    <AddButtonLink href={'/staff/add'}>Добавить сотрудника</AddButtonLink>
                </Wrapper>
            )
        }

        return (
            
            <Wrapper>
                {
                    <AddButtonLink href={'/staff/add'}>Добавить сотрудника</AddButtonLink>
                }
                {showTable && (
                    <ReactTable

                        data={staff}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}

                    />
                )}
            </Wrapper>
        )
    }
}

export default StaffList