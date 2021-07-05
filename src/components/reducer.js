export const initialState = {
    superUser: false,
    loadedUserEmail: null, 
    superUserName: null,
    user:'', 
    // invoiceNumber: 123456,
    //isNew: false,
    job:{
        // invoiceNumber: 123456,
        isFinalized: false,
        docName: '',
        isNew: false,
        username: '',
        jobName: '',
        headerInfo:{
            phone: '',
            orderDate: '',
            orderTakenBy: '',
            orderNumber: '',
            type:'',
            jobLocation: '',
            address: '',
            cityState: '',
            jobPhone: '',
            startingDate: '',
            toLineVal: [null,null,null],
            isToLineSet: [false,false,false]
        },
        description: '',
        materials:[
            {
                qty: 1,
                material: '',
                price: 0,
                amount: 0
            }
        ],
        otherCharges: [
            {
                description: '',
                cost: 0
            }
        ],
        labor: [
            {
                name: '',
                hours: 0,
                rate: 0,
                amount: 0
            }
        ],
        totalLabor: 0,
        totalMaterials: 0,
        totalOther: 0,
        totalTax: 0,
        taxRate: 0,
        total: 0,
        signatureImage: null,
        workOrderedBy: "_________",
        isWorkOrderedBy: false,
        cityState: ''
        
        
    }

}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_TAX':
            state.job.taxRate = action.item.taxRate
            state.job.cityState = action.item.cityState
            //alert(action.item.taxRate)
            return{
                ...state,
                taxRate: action.item.taxRate,
                cityState: action.item.cityState
            }
        case 'SAMPLE':
            state.user = action.item.user
            state.job.username = action.item.username[0]
            state.superUser = true
            state.superUserName = action.item.email.split('@')

            return{
                ...state,
                job: state.job,
                user: action.item.user,
                superUser: true,
                superUserName: action.item.email.split('@')

                
            }
        case 'WORK_ORDERED_BY':
            state.job.workOrderedBy = action.item.val
            state.job.isWorkOrderedBy = true
            return{
                ...state,
                workOrderedBy: action.item.val,
                isWorkOrderedBy: true
            }
        case 'POST_SAVE':
            state.job = action.item.val
            return{
                ...state,
                job: action.item.val
            }
        case 'TO_LINE_SET':
            state.job.headerInfo.toLineVal = action.item.val
            state.job.headerInfo.isToLineSet = action.item.val2
            return{
                ...state,
                toLineVal: action.item.val,
                isToLineSet: action.item.val2
            }
        case 'PROCEED_TO_INVOICE':
            state.job.headerInfo = action.item.headerInfo
            
            //
            state.docName = action.item.doc
            state.jobName = action.item.headerInfo.jobName
            state.isNew = true
            state.job.isNew = true;
            state.invoiceNumber = action.item.invoiceNumber
            state.materials = action.item.jobData.materials
            state.otherCharges = action.item.jobData.otherCharges
            state.labor = action.item.jobData.labor
            state.username = action.item.jobData.username

            return{
                ...state,
                job: action.item.jobData

                //
                // job: action.item.jobData,
                // jobName: action.item.jobName,
                // docName: action.item.doc,
                // username: action.item.username,
                // invoiceNumber: action.item.invoiceNumber

            }
        case 'LOADED_USER_EMAIL':
            state.loadedUserEmail = action.item.username
            return{
                ...state
            }
        case 'SUPER_USER':
            state.superUser = true
            state.superUserName = action.item.email.split('@')
            return{
                ...state,
                superUser: true,
                superUserName: action.item.email.split('@')
            }
        case 'LOGIN':
            console.log(action.item.user)
            // state.user = action.item.user
            state.user = action.item.user
            state.job.username = action.item.username[0]
            return{
                ...state,
                job: state.job,
                user: action.item.user
                
            }
        case 'LOAD_JOB':
            console.log("LOAD...")
            console.log(state)
            state.job = action.item.jobData
            state.jobName = action.item.jobName
            state.docName = action.item.docName
            state.username = action.item.username
            state.invoiceNumber = action.item.invoiceNumber
            state.signatureImage = action.item.signatureImage
            state.superUser = action.item.isSuperUser
            state.superUserName = action.item.superUserName
            return{
                ...state,
                job: action.item.jobData,
                jobName: action.item.jobName,
                docName: action.item.docName,
                username: action.item.username,
                invoiceNumber: action.item.invoiceNumber,
                signatureImage: action.item.signatureImage,
                superUser: action.item.isSuperUser,
                superUserName: action.item.superUserName
            }
        case 'NEW_JOB':
            console.log('New Job')
            state.docName = action.item.docName
            state.jobName = action.item.jobName
            state.isNew = true
            state.job.isNew = true;
            state.invoiceNumber = action.item.invoiceNumber
            
            return{
                job: action.item.jobData,
                jobName: action.item.jobName,
                docName: action.item.doc,
                username: action.item.username,
                invoiceNumber: action.item.invoiceNumber
                //isNew: action.item.isNew
            }
        case 'NEW_SIGNATURE':
            state.signatureImage = action.item.signatureImage
            console.log("REDUCERRR...",state.signatureImage)
            return{
                ...state
            }
        case 'TRACK_INVOICE_NUM':

            state.invoiceNumber = action.item.invoiceNumber
            console.log(action.item.invoiceNumber)
            return{
                ...state,
                invoiceNumber: action.item.invoiceNumber
            }
        case 'INVOICE_INCREMENTED':
            console.log("INCREMENTED!")
            state.job.isNew = false
            return{
                ...state
            }
        case 'OVERWRITE':
            
            state.job = action.item.job
            console.log(state.job)
            return{
                // ...state,
                job: action.item.job
            }
        case 'SAVE_MATERIALS':
            state.job.materials = action.item.data
            return{
                job: state.job
            }
        
        case 'ADD_CHAPTER_TITLE':
            state.chapters[action.item.chapterIndex].title = action.item.title
            console.log(state)
            return{
                ...state,
                //chapters:[action.item.entryIndex].title:
                
            }

        case 'MAKE_SECTION':
            //console.log(state)
            console.log(state.chapters[action.item.entryIndex].bodies)
            //if(action.item.entryIndex==0)
            state.chapters[action.item.chapterIndex].bodies = [...state.chapters[action.item.chapterIndex].bodies, action.item]
            //state.chapters[action.item.entryIndex].bodies[action.item.entryIndex] = action.item
            // for(let i = 0; i < state.chapters.length; i++){
            //     console.log('yo')
            // }
            return{
                 ...state,
               // newSection: action.item,
                // chapters: [
                //     {
                //         title: state.chapters[action.item.entryIndex].title,
                //         bodies: [...state.chapters[action.item.entryIndex].bodies, action.item]
                    
                //     }
                // ]
                chapters: [...state.chapters]
            }
        case 'EDIT_SECTION':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex] = action.item
            return{
                ...state,
                chapters: [...state.chapters]

            }
        case 'DELETE_SECTION':
            let filteredSections = state.chapters[action.item.chapterIndex].bodies.filter(section => {
                return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex]
            })
            state.chapters[action.item.chapterIndex].bodies = filteredSections
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'DELETE_CHAPTER':
            let filteredChapters = state.chapters.filter(chapter => {
                return chapter !== state.chapters[action.item.chapterIndex]
            })
            state.chapters = filteredChapters
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.item.user
            }
        case 'LOAD_BOOK':
            return{
                ...state,
                chapters: action.item.chapters,
                bookTitle: action.item.bookTitle
            }
        case 'SIGN_OUT':
            return{
                ...state,
                user: ''
            }
        default:
            return state;
    }
}

export default reducer;