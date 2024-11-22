import TableComponent from '@/components/Table/Table';
import { useFetchOrderData } from '@/services/order/fetchSubCategoryData'
import React, { useMemo } from 'react'

export const IncomingOrders1 = () => {
    const  {loading,orders,error} = useFetchOrderData();
    const columns = useMemo(
        ()=>[
            { header: 'ID', accessor: 'id' },
        ],[]
    );
    const rows =  useMemo(
        ()=>async()=>{
return Promise.resolve(orders);
        },[orders]
    );
    if(loading){
        return(
            <div>loading</div>
        )
    }
    if(error){
        return(
            <div>
                console.error();       
            </div>
        )
    }
  return (
    <div>
        <TableComponent fetchData={rows} columns={columns} itemsPerPage={20} />
    </div>
  )
}
