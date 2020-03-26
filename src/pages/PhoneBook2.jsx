import React from "react";
import api from '../api'
import ReactTable from "react-table";
import "react-table/react-table.css";
import BootstrapTable from 'react-bootstrap-table-next';
import styled from 'styled-components'


const Wrapper = styled.div.attrs({
    className: 'container-xl'
})`
    padding: 5px 15px 0px 15px;

`

const columns = [
    {
    Header: "Название",
    accessor: "bra_name"
    },
    {
    Header: "Руководитель",
    accessor: "boss"
    },
]

function phoneFormatter(cell, row) {
  
    let phone_string = ''
    for (let i = 0; i < row.phone_numbers.length; i++) {
        phone_string += row.phone_numbers[i]
        phone_string += ' '
    }

    return (
      <span>{ phone_string }</span>
    )

  }

const columns2 = [
    {
        dataField: 'firstName',
        text: 'Имя'
    },
    {
        dataField: 'lastName',
        text: 'Фамилия'
    },
    {
        dataField: 'phone_numbers',
        text: 'Номера',
        formatter: phoneFormatter
    },
]

class PhoneBook2 extends React.Component {

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
            isLoading: false,
        })
    })
    await api.getAllStaffTable().then(staff => {
        this.setState({
            staff: staff.data.data,
            isLoading: false,
        })
    })
}

  render() {

    const { branches, staff } = this.state;

    return (
      <Wrapper>
        <ReactTable
            data={branches}
            columns={columns}
            className="-highlight"
            SubComponent = { row =>  {

                // console.log("row " + row)
                // let isLoading2 = true
                // let staffed = []
                // api.getAllStaffByBra(row.original._id).then(staffe => {
                //     console.log(staffe)
                //     staffed = staffe
                //     isLoading2 = false
                // })
                let staffArray = []
                for (let i = 0; i < staff.length; i++) {
                    if ( staff[i].branches.includes(row.original._id) ) {
                        staffArray.push(staff[i])
                    }
                }
                let showTable2 = true
                if (!staffArray.length) {
                    showTable2 = false
                    return (
                        <Wrapper>
                            Нет сотрудников
                        </Wrapper>
                    )
                }

                return (
                    <div style={{ padding: "20px" }}>
                        {/* { 
                            ( showTable2 && 
                                <ReactTable
                                    // filterable
                                    data={staffArray}
                                    // loading={isLoading2}
                                    columns={columns2}
                                    minRows={0}                    
                                    showPagination={false}
                                /> 
                            )
                        }      */}
                    {
                        ( showTable2 && 
                            <BootstrapTable 

                                keyField='_id'
                                data={ staffArray }
                                columns={ columns2 }
                                hover
                                minRows={0}

                           /> 
                        )
                    }      
                    </div>
                )
            }}
            // loading={isLoading}
            defaultPageSize={20}
            showPageSizeOptions={true}
            minRows={0}
        />
      </Wrapper>
    );
  }
}

// render(<PhoneBook2 />, document.getElementById("root"));
export default PhoneBook2
