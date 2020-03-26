import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { StaffList, StaffAdd, StaffUpdate, StaffInfo } from '../pages'
import { LabList, LabAdd, LabUpdate } from '../pages'
import { FacList, FacAdd, FacUpdate } from '../pages'
import { BraList, BraAdd, BraUpdate } from '../pages'
import { PhoneBook, PhoneBook2, Pdocument2, Pdocument3 } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={StaffList} />
                <Route path="/staff" exact component={StaffList} />
                <Route path="/staff/add" exact component={StaffAdd} />
                <Route
                    path="/staff/update/:id"
                    exact
                    component={StaffUpdate}
                />
                <Route path="/staff/:id" exact component={StaffInfo} />

                <Route path="/laboratories" exact component={LabList} />
                <Route path="/laboratories/add" exact component={LabAdd} /> 
                <Route path="/laboratories/:id" exact component={LabUpdate} />

                <Route path="/faculties" exact component={FacList} />
                <Route path="/faculty/add" exact component={FacAdd} />
                <Route path="/faculty/:id" exact component={FacUpdate} />

                <Route path="/faculty_b/:id" exact component={BraList} />
                <Route path="/faculty_b/:id/add" exact component={BraAdd} />
                <Route path="/faculty_bu/:id" exact component={BraUpdate} />


                <Route path="/phonebook" exact component={PhoneBook} />
                <Route path="/phonebook2" exact component={PhoneBook2} />
                <Route path="/document2" exact component={Pdocument2} />
                <Route path="/document3" exact component={Pdocument3} />
            </Switch>
        </Router>
    )
}

export default App