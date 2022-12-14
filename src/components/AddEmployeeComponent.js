// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useNavigate, useParams, redirect } from 'react-router-dom'

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const saveEmployee = (e) => {
        e.preventDefault()

        const employee = {firstName, lastName, emailId}

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((res) => {
                    return redirect('./employee')
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            EmployeeService.createEmployee(employee)
                .then((res) => {
                    console.log(res)
                    redirect('/employee')
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    useEffect(() => {

        EmployeeService.getEmployeeById(id)
            .then((res) => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmailId(res.data.emailId)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const title = () => {
        if (!id)
            return <h2 className='text-center'>Add Employee</h2>
        
        return <h2 className='text-center'>Update Employee</h2>
    }

  return (
    <div>
        <br />
        <br />
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name: </label>
                                <input
                                    type='text'
                                    placeholder='Enter first name'
                                    name='firstName'
                                    className='form-control'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name: </label>
                                <input
                                    type='text'
                                    placeholder='Enter last name'
                                    name='lastName'
                                    className='form-control'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email Id: </label>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='emailId'
                                    className='form-control'
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                >
                                </input>
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveEmployee(e)}>Submit</button>
                            <Link to='/employees' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent