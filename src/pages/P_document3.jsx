import React from "react";
import api from '../api'
import ReactTable from "react-table";
// import "react-table/react-table.css";
import styled from 'styled-components'


const Wrapper = styled.div.attrs({
    className: 'container-xl'
})`
    padding: 5px 15px 0px 15px;
    font-family: Times New Roman;
    line-height: 0.8em;
`
let index = 0

const columns = [
  {
    Header: '№ п/п',
    width: 49,
    Cell: function(props) {
      index++
      return (index)
   } 
  },

  {
    Header: 'Обеспеченность преподавательским составом',
    columns: [
      {
        // Header: 'Ведущие преподаватели по дисциплинам (ФИО)',
        Header: props => 
        (
          <span>
            Ведущие <br></br> преподаватели по <br></br> дисциплинам <br></br> (ФИО)
          </span>
        ), 
        accessor: '',
        Cell: function(props) {
          let nameString = props.original.lastName + 
                     " " + props.original.firstName +
                     " " + props.original.middleName
          return (
              <span>
                 {nameString}
              </span>
          )
        },
      },
      {
        Header: props => 
        (
          <span>
            ВУЗ,<br></br> специальность<br></br> по диплому
          </span>
        ), 
        accessor: 'speciality',
      },
      {
        Header: props => 
        (
          <span>
            Ученая степень<br></br> и ученое звание
          </span>
        ), 
        accessor: '',
        Cell: function(props) {
          let academicString = props.original.academic_rank + 
                        ", " + props.original.academic_degree
          return (
              <span>
                 {academicString}
              </span>
          )
        },
      },
      {
        Header: props => 
        (
          <span>
            Стаж научно-<br></br>педагогической<br></br> работы по <br></br>специальности
          </span>
        ), 
        accessor: 'ovarral_standing',
      },
      {
        Header: props => 
        (
          <span>
            Основное место <br></br>работы, должность
          </span>
        ), 
        accessor: 'position',
        width: 280,
      },
    ],
  },
]


class PhoneBook2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        branches: [],
        columns: [],
        isLoading: false,
        staffLength: '',
    }
}

componentDidMount = async () => {
    this.setState({ isLoading: true })
    await api.getAllStaffWithAcademic().then(staff => {
        this.setState({
            staff: staff.data.data,
            isLoading: false,
            staffLength: staff.data.data.length,
        })
        for (var i = 0; i < staff.length; i++) {
        }
        console.log(staff.data.data)
    })
}

  render() {

    const { staff, staffLength } = this.state

    if (index >= staffLength) {
      index = 0
    }

    return (
      <Wrapper>

      <h5 align = "center">
        <strong>
          Сведения о лицах с учеными степенями и учеными званиями
        </strong>
      </h5>

      <p align = "center">
        Иркутский государственный технический университет
      </p>
      <p align = "center">
        <font size="2">(наименование вуза)</font>
      </p>
      <p align = "center">
        <font size="3">
          Код специальности – Название специальности 
        </font>
      </p>
      <br></br>
      <p align = "center">
        <font size="3">
          (наименование гуманитарных, социально-экономических, общих математических и 
          естественных дисциплин в целом по вузу или
          код, наименование образовательной программы, общепрофессиональные и 
          специальные дисциплины)
        </font>
      </p>

        <ReactTable
            data={staff}
            columns={columns}

            // className="-highlight"
            defaultPageSize={20}
            minRows={0}
            showPagination = {false}
            showPaginationTop = {false}
            showPageSizeOptions = {false}
            showPaginationBottom = {false}

            sortable = {false}
            multiSort = {false}
            resizable = {false}
            filterable = {false}
        />

        <p>
          Всего:
        </p>
        <p>
          общая численность преподавателей, 
          привлекаемых к реализации соответствующих циклов 
            дисциплин <u>   {staffLength} </u> чел.
        </p>
        <p>
          Лиц с учеными степенями и учеными званиями <u> {staffLength}</u> чел.
        </p>
        <p>
          Наличие документов об участии в учебном процессе в вузу всех лиц, 
          поименованных в списке, имеется.
        </p>
        <p>
          Поименованные лица не имеют запрета на педагогическую 
          деятельность приговором суда или по медицинским показаниям.
        </p>
        <p align = "justify">
        Проректор  по учебной работе                
        </p>
        <p align = "justify">
        _________________/ФИО проректора/                
        </p>

      </Wrapper>
    );
  }
}

// render(<PhoneBook2 />, document.getElementById("root"));
export default PhoneBook2
