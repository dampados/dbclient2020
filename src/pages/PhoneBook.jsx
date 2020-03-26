import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

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

class PhoneBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            branches: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllBranches().then(branches => {
            this.setState({
                branches: branches.data.data,
                // isLoading: false,
            })
        })
    }

    render() {

        const { branches } = this.state
        console.log(`TCL: BranchesList -> render -> branches`, branches)

        const columns = [
            {
                dataField: '_id',
                text: 'ID'
            },
            {
                dataField: 'bra_name',
                text: 'Имя подразделения'
            },
            {
                dataField: 'bra_type',
                text: 'Тип подразделения'
            },
        ]

        const expandRow = {
            // expandByColumnOnly: true,
            renderer:  row => {

                // let staff = ''
                // staff = api.getAllStaffByBra(row._id)
                api.getAllStaffByBra(row._id).then(staff => {
                    console.log(staff.data.data[0]._id)
                    this.setState({
                        staff: staff.data.data,
                        // isLoading: false,
                    })
                
                })
                console.log(this.staff)
                return (this.staff)//[0]._id)
            }
        }
        

        let showTable = true
        if (!branches.length) {
            showTable = false
            return (
                // eslint-disable-next-line
                <Wrapper>
                    Нет подразделений в базе
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                {
                    showTable && (
                        <BootstrapTable 

                            keyField='_id'
                            data={ branches }
                            columns={ columns }
                            expandRow={ expandRow } 
                            hover

                            // data={laboratories}
                            // columns={columns}
                            // loading={isLoading}
                            // defaultPageSize={20}
                            // showPageSizeOptions={true}
                            // minRows={0}

                        />
                    )
                }
            </Wrapper>
        )
    }
}

export default PhoneBook