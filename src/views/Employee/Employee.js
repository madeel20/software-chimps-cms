import React from 'react'
import EmployeeList from './EmployeeList'
import { EmployeeProvider} from '../../context/employee/state'

function Employee() {
    return (
        <EmployeeProvider>
                <EmployeeList />
        </EmployeeProvider>
    )
}

export default Employee
