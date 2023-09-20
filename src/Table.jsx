import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";




function Table(){
    const [data,setData]=useState()
    const columns = [
        {title:"Name",field:"name"},
        {title:"Username",field:"username"},
        {title:"Email",field:"email"},
        {title:"Phone",field:"phone"},
        {title:"Website",field:"website"}
    ]

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(resp=>resp.json())
        .then(resp=>setData(resp))
    },[])

    return <div>
            <MaterialTable 
            title="User-Data"
            data={data} 
            columns={columns} 
            options={{
                actionsColumnIndex:-1
            }}
            editable={{
                onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                    const updatedRows=[...data,newRow]
                    setTimeout(()=>{
                        setData(updatedRows)
                        resolve()
                    },2000)
                }),
                onRowDelete:selectedRow=>new Promise((resolve,reject)=>{
                    const index=selectedRow.tableData.id;
                    const updatedRows=[...data]
                    updatedRows.splice(index,1)
                    setTimeout(()=>{
                        setData(updatedRows)
                        resolve()
                    },2000)
                }),
                onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
                    const index=oldRow.tableData.id;
                    const updatedRows=[...data]
                    updatedRows[index]=updatedRow
                    setTimeout(()=>{
                        setData(updatedRows)
                        resolve()
                    },2000)
                })
            }} />
    </div>
}

export default Table;