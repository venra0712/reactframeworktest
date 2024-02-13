import React, { Component } from "react";
import { variables } from "./Variable";

export class Department extends Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            modalTitle: "",
            DepartmentName: "",
            DepartmentId: 0
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Department')
            .then(res => res.json())
            .then(data => {
                this.setState({ departments: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDepartmentName = (e) => {
        this.setState({ DepartmentName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Department",
            DepartmentId: 0,
            DepartmentName: ""
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Edit Department",
            DepartmentId: dep.departmentId,
            DepartmentName: dep.departmentName
        });
    }

    createClick(){
        fetch(variables.API_URL + 'department', {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=> res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL + 'department', {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                departmentId:this.state.DepartmentId,
                departmentName:this.state.DepartmentName
            })
        })
        .then(res=> res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL +'department/'+id, {
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=> res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }
    render() {
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        } = this.state;
        
                 
        console.log(departments)
        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Department
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                DepartmentID
                            </th>
                            <th>
                                DepartmentName
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep =>
                            <tr key={dep.departmentId}>
                                <td>{dep.departmentId}</td>
                                <td>{dep.departmentName}</td>
                                <td>
                                    <button className="btn btn-light me-1" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                    <button className="btn btn-light me-1"
                                    onClick={()=> this.deleteClick(dep.departmentId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name</span>
                                    <input type="text" className="form-control" value={DepartmentName}
                                        onChange={this.changeDepartmentName} />
                                </div>

                                {DepartmentId === 0 ?
                                    <button type="button" 
                                    className="btn btn-primary float-start"
                                    onClick={()=>this.createClick()}
                                    >Create
                                    </button> : null}

                                {DepartmentId !== 0 ?
                                    <button type="button" 
                                    className="btn btn-primary 
                                    float-start"
                                    onClick={()=>this.updateClick()}
                                    >Update
                                    </button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}