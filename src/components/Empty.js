
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
        for(let i = 0; i < 5; i++){
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
        for(let i = 0; i < 5; i++){
            items.push(obj)
        }
    }

    return items;
}

export const jobData = {
    description: '',
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
    jobName: 'Test',
    labor: labors,
    materials: materials,
    otherCharges: charges,
    tax: 0,
    total: 0,
    totalLabor: 0,
    totalMaterials: 0,
    totalOther: 0,
    username: ''
}

// export jobData

// export default Empty;