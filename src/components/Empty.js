
// import React from 'react';
// import { useStateValue } from './StateProvider.js'

// const [{invoiceNumber}] = useStateValue();
const labors = getItems('labor');
const materials = getItems('materials');
const charges = getItems('other')


function getItems(type){
    let items = []
    if(type == 'labor'){
        let obj = {
            amount: 0,
            hours: 0,
            name: '',
            rate: 0
        }
        for(let i = 0; i < 9; i++){
            items.push(obj)
        }
    }
    else if(type == 'materials'){
        let obj = {
            amount: 0,
            material: '',
            price: 0,
            qty: 0
        }
        for(let i = 0; i < 20; i++){
            items.push(obj)
        }
    }
    else if(type == 'other'){
        let obj = {
            description: '',
            price: 0
        }
        for(let i = 0; i < 6; i++){
            items.push(obj)
        }
    }

    return items;
}

export const jobData = {
    //invoiceNumber: invoiceNumber + 1 ,
    description: '',
    isNew: true,
    headerInfo: {
        address: '',
        cityState: '',
        name: '',
        orderDate: '',
        orderNumber: '',
        orderTakenBy: '',
        phone: '',
        startingDate: '',
        type: 'extra'
    },
    jobName: '',
    labor: labors,
    materials: materials,
    otherCharges: charges,
    tax: 0,
    total: 0,
    totalLabor: 0,
    totalMaterials: 0,
    totalOther: 0,
    username: '',
    signatureImage: null
}

// export jobData

// export default Empty;